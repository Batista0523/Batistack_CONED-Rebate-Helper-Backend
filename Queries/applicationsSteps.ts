import db from "../DB/db.config";

export type Application = {
  id?: number;
  full_name: string;
  email?: string;
  phone_number?: string;
  address?: string;
  disadvantage?: boolean;
  electricity_acct?: string;
  coned_eligibility_key?: string;
  project_amount_total?: number;
  offered_rebate_amount?: number;
  approved_rebate_amount?: number;
  total_client_pay_after_rebate?: number;
  building_year_built?: number;
  building_sqft?: number;
  conditioned_sqft?: number;
  condenser_models?: string[];
  acknowledgment_form?: boolean;
  system_total_capacity?: boolean;
  invoice_or_contract?: boolean;
  manual_j?: boolean;
  name_plate_photos?: boolean;
  system_installation_photos?: boolean;
  decommissioning_before_photos_wide_shots?: boolean;
  decommissioning_after_photos_wide_shots?: boolean;
  decommissioning_before_photos_close_up_shots?: boolean;
  decommissioning_after_photos_close_up_shots?: boolean;
  decommissioning_checklist?: boolean;
  notes?: string;
  created_at?: string;
};

const getAllApplications = async (): Promise<Application[]> => {
  try {
    const apps = await db.any<Application>(
      "SELECT * FROM applications ORDER BY id DESC"
    );
    return apps;
  } catch (error) {
    throw new Error(
      "Error fetching all applications: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const getOneApplication = async (id: number): Promise<Application | null> => {
  try {
    const app = await db.oneOrNone<Application>(
      "SELECT * FROM applications WHERE id = $1",
      [id]
    );
    return app;
  } catch (error) {
    throw new Error(
      "Error fetching application: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const createApplication = async (
  payload: Application
): Promise<Application> => {
  try {
    const newApp = await db.one<Application>(
      `
        INSERT INTO applications (
          full_name, email, phone_number, address, disadvantage,
          electricity_acct, coned_eligibility_key,
          project_amount_total, offered_rebate_amount, approved_rebate_amount,
          total_client_pay_after_rebate, building_year_built,
          building_sqft, conditioned_sqft, condenser_models,
          acknowledgment_form, system_total_capacity, invoice_or_contract,
          manual_j, name_plate_photos, system_installation_photos,
          decommissioning_before_photos_wide_shots,
          decommissioning_after_photos_wide_shots,
          decommissioning_before_photos_close_up_shots,
          decommissioning_after_photos_close_up_shots,
          decommissioning_checklist, notes
        ) VALUES (
          $1,$2,$3,$4,$5,
          $6,$7,
          $8,$9,$10,
          $11,$12,
          $13,$14,$15,
          $16,$17,$18,
          $19,$20,$21,
          $22,$23,$24,
          $25,$26,$27
        )
        RETURNING *
      `,
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
        payload.acknowledgment_form ?? false,
        payload.system_total_capacity ?? false,
        payload.invoice_or_contract ?? false,
        payload.manual_j ?? false,
        payload.name_plate_photos ?? false,
        payload.system_installation_photos ?? false,
        payload.decommissioning_before_photos_wide_shots ?? false,
        payload.decommissioning_after_photos_wide_shots ?? false,
        payload.decommissioning_before_photos_close_up_shots ?? false,
        payload.decommissioning_after_photos_close_up_shots ?? false,
        payload.decommissioning_checklist ?? false,
        payload.notes ?? null,
      ]
    );
    return newApp;
  } catch (error) {
    throw new Error(
      "Error creating application: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const updateApplication = async (
  id: number,
  payload: Application
): Promise<Application | null> => {
  try {
    const updated = await db.oneOrNone<Application>(
      `
      UPDATE applications SET
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
        condenser_models = $15,
        acknowledgment_form = $16,
        system_total_capacity = $17,
        invoice_or_contract = $18,
        manual_j = $19,
        name_plate_photos = $20,
        system_installation_photos = $21,
        decommissioning_before_photos_wide_shots = $22,
        decommissioning_after_photos_wide_shots = $23,
        decommissioning_before_photos_close_up_shots = $24,
        decommissioning_after_photos_close_up_shots = $25,
        decommissioning_checklist = $26,
        notes = $27
      WHERE id = $28
      RETURNING *
      `,
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
        payload.acknowledgment_form ?? false,
        payload.system_total_capacity ?? false,
        payload.invoice_or_contract ?? false,
        payload.manual_j ?? false,
        payload.name_plate_photos ?? false,
        payload.system_installation_photos ?? false,
        payload.decommissioning_before_photos_wide_shots ?? false,
        payload.decommissioning_after_photos_wide_shots ?? false,
        payload.decommissioning_before_photos_close_up_shots ?? false,
        payload.decommissioning_after_photos_close_up_shots ?? false,
        payload.decommissioning_checklist ?? false,
        payload.notes ?? null,
        id,
      ]
    );
    return updated;
  } catch (error) {
    throw new Error(
      "Error updating application: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

const deleteApplication = async (id: number): Promise<Application | null> => {
  try {
    const deleted = await db.oneOrNone<Application>(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id]
    );
    return deleted;
  } catch (error) {
    throw new Error(
      "Error deleting application: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

export {
  getAllApplications,
  getOneApplication,
  deleteApplication,
  createApplication,
  updateApplication,
};
