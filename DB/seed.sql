\c batistack_dev;

TRUNCATE TABLE project_photo,
project,
applications,
rebate_user RESTART IDENTITY CASCADE;


INSERT INTO rebate_user (name, email, password)
VALUES (
    'admin',
    'admin@batistack.com',
    '$2b$10$eW5zP8rQH1FQqW.f3DjyUuxMNtih2pm8kL/Bhgydr.ZchI1YW5/0y'
);


INSERT INTO applications (
    full_name,
    email,
    phone_number,
    address,
    disadvantage,
    electricity_acct,
    coned_eligibility_key,
    project_amount_total,
    offered_rebate_amount,
    approved_rebate_amount,
    total_client_pay_after_rebate,
    building_year_built,
    building_sqft,
    conditioned_sqft,
    condenser_models,
    acknowledgment_form,
    system_total_capacity,
    invoice_or_contract,
    manual_j,
    name_plate_photos,
    system_installation_photos,
    decommissioning_before_photos_wide_shots,
    decommissioning_after_photos_wide_shots,
    decommissioning_before_photos_close_up_shots,
    decommissioning_after_photos_close_up_shots,
    decommissioning_checklist,
    notes
)
VALUES 
(
    'John Doe',
    'john@doe.com',
    '555-1111',
    '123 Main St, NY',
    TRUE,
    'ACCT-10001',
    'ELIG-ABC123',
    18000.00,
    10000.00,
    8000.00,
    10000.00,
    1955,
    1800,
    1400,
    ARRAY ['MXZ-2C36HMZ','MXZ-2356NJIZ-UI'],
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'Missing acknowledgment form'
),
(
    'María Pérez',
    'maria@perez.com',
    '555-2222',
    '456 Park Ave, NY',
    FALSE,
    'ACCT-20002',
    'ELIG-XYZ789',
    22500.00,
    6500.00,
    6500.00,
    16000.00,
    1972,
    2200,
    1700,
    ARRAY ['MUZ-GL12NA'],
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    'Verified and complete'
),
(
    'Luis Santos',
    'luis@santos.com',
    '555-3333',
    '789 Broadway, NY',
    TRUE,
    'ACCT-30003',
    'ELIG-LMN456',
    20000.00,
    9000.00,
    7250.00,
    12750.00,
    1985,
    2000,
    1600,
    ARRAY ['Daikin RX18AXVJU','Mitsubishi MUZ-GL12NA','Fujitsu AOU18RLXFZ'],
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    'Pending documents'
);


INSERT INTO project (application_id, title, address)
VALUES
  (1, 'Heat Pump Install - Main', '123 Main St, NY'),
  (2, 'Clean Heat Application - Apt 2B', '456 Park Ave, NY'),
  (3, 'Full System Upgrade', '789 Broadway, NY');


INSERT INTO project_photo (project_id, url, label)
VALUES
  (1, '/uploads/demo-nameplate1.jpg', 'nameplate_photos'),
  (1, '/uploads/demo-install1.jpg', 'install_photos'),
  (2, '/uploads/demo-nameplate2.jpg', 'nameplate_photos'),
  (2, '/uploads/demo-install2.jpg', 'install_photos'),
  (3, '/uploads/demo-nameplate3.jpg', 'nameplate_photos'),
  (3, '/uploads/demo-install3.jpg', 'install_photos');

SELECT 'Seed completed';
