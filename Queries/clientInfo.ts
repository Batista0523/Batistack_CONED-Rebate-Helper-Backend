import db from "../DB/db.config";

type Client = {
  id?: number;
  full_name: string;
  email?: string | null;
  phone_number?: string | null;
  address?: string | null;
  disadvantage?: boolean;
  electricity_acct?: string | null;
  coned_eligibility_key?: string | null;
  project_amount_total?: number | null;
  offered_rebate_amount?: number | null;
  approved_rebate_amount?: number | null;
  total_client_pay_after_rebate?: number | null;
  building_year_built?: number | null;
  building_sqft?: number | null;
  conditioned_sqft?: number | null;
  condenser_models?: string[];
  created_at?: string;
};

const getAllClient = async (): Promise<Client[]> => {
  try {
    const allClient = await db.any<Client>("SELECT * FROM client");
    return allClient;
  } catch (error) {
    throw new Error(
      "Error fetching all client: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const getOneClient = async (id: number): Promise<Client | null> => {
  try {
    const oneClient = await db.oneOrNone<Client>(
      "SELECT * FROM client WHERE id = $1",
      [id]
    );
    return oneClient;
  } catch (error) {
    throw new Error(
      "Error fetching one client: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const createClient = async (payload: Client): Promise<Client> => {
  try {
    const newclient = await db.one<Client>(
      `INSERT INTO client (
        full_name, email, phone_number, address, disadvantage, electricity_acct,
        coned_eligibility_key,
        project_amount_total, offered_rebate_amount, approved_rebate_amount, total_client_pay_after_rebate,
        building_year_built, building_sqft, conditioned_sqft, condenser_models
      ) VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,
        $8,$9,$10,$11,
        $12,$13,$14,$15::text[]
      )
      RETURNING *`,
      [
        payload.full_name,
        payload.email ?? null,
        payload.phone_number ?? null,
        payload.address ?? null,
        payload.disadvantage ?? false,
        payload.electricity_acct ?? null,
        payload.coned_eligibility_key ?? null,
        payload.project_amount_total ?? null,
        payload.offered_rebate_amount ?? null,
        payload.approved_rebate_amount ?? null,
        payload.total_client_pay_after_rebate ?? null,
        payload.building_year_built ?? null,
        payload.building_sqft ?? null,
        payload.conditioned_sqft ?? null,
        payload.condenser_models ?? [],
      ]
    );
    return newclient;
  } catch (error) {
    throw new Error(
      "Error creating client: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const updateClient = async (
  id: number,
  payload: Client
): Promise<Client | null> => {
  try {
    const updatedclient = await db.oneOrNone<Client>(
      `UPDATE client SET
        full_name = $1,
        email = $2,
        phone_number = $3,
        address = $4,
        disadvantage = $5,
        electricity_acct = $6,
        coned_eligibility_key = $7,
        project_amount_total = $8,
        offered_rebate_amount = $9,
        approved_rebate_amount = $10,
        total_client_pay_after_rebate = $11,
        building_year_built = $12,
        building_sqft = $13,
        conditioned_sqft = $14,
        condenser_models = $15::text[]
      WHERE id = $16
      RETURNING *`,
      [
        payload.full_name,
        payload.email ?? null,
        payload.phone_number ?? null,
        payload.address ?? null,
        payload.disadvantage ?? false,
        payload.electricity_acct ?? null,
        payload.coned_eligibility_key ?? null,
        payload.project_amount_total ?? null,
        payload.offered_rebate_amount ?? null,
        payload.approved_rebate_amount ?? null,
        payload.total_client_pay_after_rebate ?? null,
        payload.building_year_built ?? null,
        payload.building_sqft ?? null,
        payload.conditioned_sqft ?? null,
        payload.condenser_models ?? [],
        id,
      ]
    );
    return updatedclient;
  } catch (error) {
    throw new Error(
      "Error updating client: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const deleteClient = async (id: number): Promise<Client | null> => {
  try {
    const deletedClient = await db.oneOrNone<Client>(
      "DELETE FROM client WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedClient;
  } catch (error) {
    throw new Error(
      "Error deleting client: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

export { getAllClient, getOneClient, createClient, updateClient, deleteClient };
