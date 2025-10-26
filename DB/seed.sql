\c batistack_dev

INSERT INTO rebate_user (name, email, password)
VALUES (
  'admin',
  'admin@batistack.com',
  '$2b$10$eW5zP8rQH1FQqW.f3DjyUuxMNtih2pm8kL/Bhgydr.ZchI1YW5/0y'
);


INSERT INTO client (
  full_name, email, phone_number, address, disadvantage,
  electricity_acct, coned_eligibility_key,
  project_amount_total, offered_rebate_amount, approved_rebate_amount, total_client_pay_after_rebate,
  building_year_built, building_sqft, conditioned_sqft,
  condenser_models
) VALUES (
  'John Doe', 'john@doe.com', '555-1111', '123 Main St, NY', TRUE,
  'ACCT-10001', 'ELIG-ABC123',
  18000.00, 10000.00, 8000.00, 10000.00,
  1955, 1800, 1400,
  ARRAY['mxz-2c36hmz','mxz-2356njiz-ui']::text[]
);

INSERT INTO project (client_id, title, address)
SELECT id, 'Heat Pump Install - Main', '123 Main St, NY'
FROM client WHERE email = 'john@doe.com';

INSERT INTO project_photo (project_id, url, label)
SELECT id, '/uploads/demo-nameplate1.jpg', 'nameplate_photos'
FROM project WHERE title = 'Heat Pump Install - Main';

INSERT INTO project_photo (project_id, url, label)
SELECT id, '/uploads/demo-install1.jpg', 'install_photos'
FROM project WHERE title = 'Heat Pump Install - Main';


INSERT INTO client (
  full_name, email, phone_number, address, disadvantage,
  electricity_acct, coned_eligibility_key,
  project_amount_total, offered_rebate_amount, approved_rebate_amount, total_client_pay_after_rebate,
  building_year_built, building_sqft, conditioned_sqft,
  condenser_models
) VALUES (
  'María Pérez', 'maria@perez.com', '555-2222', '456 Park Ave, NY', FALSE,
  'ACCT-20002', 'ELIG-XYZ789',
  22500.00, 6500.00, 6500.00, 16000.00,
  1972, 2200, 1700,
  ARRAY['MUZ-GL12NA']::text[]
);

INSERT INTO project (client_id, title, address)
SELECT id, 'Clean Heat Application - Apt 2B', '456 Park Ave, NY'
FROM client WHERE email = 'maria@perez.com';

INSERT INTO project_photo (project_id, url, label)
SELECT id, '/uploads/demo-nameplate2.jpg', 'nameplate_photos'
FROM project WHERE title = 'Clean Heat Application - Apt 2B';

INSERT INTO project_photo (project_id, url, label)
SELECT id, '/uploads/demo-install2.jpg', 'install_photos'
FROM project WHERE title = 'Clean Heat Application - Apt 2B';


INSERT INTO client (
  full_name, email, phone_number, address, disadvantage,
  electricity_acct, coned_eligibility_key,
  project_amount_total, offered_rebate_amount, approved_rebate_amount, total_client_pay_after_rebate,
  building_year_built, building_sqft, conditioned_sqft,
  condenser_models
) VALUES (
  'Luis Santos', 'luis@santos.com', '555-3333', '789 Broadway, NY', TRUE,
  'ACCT-30003', 'ELIG-LMN456',
  20000.00, 9000.00, 7250.00, 12750.00,
  1985, 2000, 1600,
  ARRAY['Daikin RX18AXVJU','Mitsubishi MUZ-GL12NA','Fujitsu AOU18RLXFZ']::text[]
);