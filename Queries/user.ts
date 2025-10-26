import db from "../DB/db.config";
import bcrypt from "bcrypt";

type RebateUser = {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  created_at?: string;
};

const getAllUsers = async (): Promise<RebateUser[]> => {
  try {
    const allUsers = await db.any<RebateUser>("SELECT * FROM rebate_user");
    return allUsers;
  } catch (err) {
    throw new Error("Error getting users" + err);
  }
};

const getOneUser = async (id: number): Promise<RebateUser | null> => {
  try {
    const oneUser = await db.one<RebateUser>(
      "SELECT * FROM rebate_user WHERE id=$1",
      id
    );
    return oneUser;
  } catch (err) {
    throw new Error("Internal error getting one user" + err);
  }
};

const deleteUser = async (id: number) => {
  try {
    const deletedUser = await db.oneOrNone(
      "DELETE FROM rebate_user WHERE id = $1 RETURNING id, name, email, created_at",
      [id]
    );
    return deletedUser; 
  } catch (err) {
    throw new Error("Internal error deleting user: " + (err instanceof Error ? err.message : String(err)));
  }
};

const updateRebateUserPassword = async (
  id: number,
  newPassword: string
): Promise<boolean> => {
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.none("UPDATE rebate_user SET password = $1 WHERE id = $2", [
      hashed,
      id,
    ]);
    return true;
  } catch (error) {
    throw new Error(
      "Error updating password: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const createRebateUser = async (
  payload: RebateUser
): Promise<Omit<RebateUser, "password">> => {
  try {
    const exists = await db.oneOrNone<{ id: number }>(
      "SELECT id FROM rebate_user WHERE email = $1",
      [payload.email]
    );
    if (exists) throw new Error("Email is already registered");
    const hashedPassword = await bcrypt.hash(payload.password!, 10);
    const created = await db.one<Omit<RebateUser, "password">>(
      `INSERT INTO rebate_user (name, email, password, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, name, email, created_at`,
      [payload.name ?? null, payload.email, hashedPassword]
    );
    return created;
  } catch (error) {
    throw new Error(
      "Error creating user: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const authenticateRebateUser = async (
  email: string,
  password: string
): Promise<Omit<RebateUser, "password"> | null> => {
  try {
    const user = await db.oneOrNone<RebateUser>(
      "SELECT * FROM rebate_user WHERE email = $1",
      [email]
    );
    if (!user || !user.password) throw new Error("Invalid email or password");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid email or password");
    const { password: _pw, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(
      "Error authenticating user: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};
export {
  getAllUsers,
  getOneUser,
  createRebateUser,
  authenticateRebateUser,
  updateRebateUserPassword,
  deleteUser,
};
