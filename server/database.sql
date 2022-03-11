CREATE DATABASE mtech;

CREATE TABLE signup_verification (
    email_id TEXT PRIMARY KEY,
    hashed_otp TEXT,
    expiration_time TIMESTAMP
);

CREATE TABLE login_verification (
    email_id TEXT PRIMARY KEY,
    hashed_otp TEXT,
    expiration_time TIMESTAMP
);

-- CREATE TABLE applicants (
--     email_id TEXT PRIMARY KEY,
--     email_hash TEXT
-- );

CREATE TABLE applicants (
    -- Primary Keys
    email_id TEXT PRIMARY KEY,
    applicant_id SERIAL,

    -- Personal Details
    full_name TEXT,
    fathers_name TEXT,
    profile_image_url TEXT,
    date_of_birth TEXT,
    aadhar_card_number TEXT,
    category TEXT,
    category_certificate_url TEXT,
    is_pwd TEXT,
    marital_status TEXT,
    nationality TEXT,
    gender TEXT,

    -- Communication Details
    communication_address TEXT,
    communication_city TEXT,
    communication_state TEXT,
    communication_pincode TEXT,

    permanent_address TEXT,
    permanent_city TEXT,
    permanent_state TEXT,
    permanent_pincode TEXT,

    email TEXT,
    mobile_number TEXT,
    alternate_mobile_number TEXT,

    -- Educational Details
    degree_10th TEXT,
    board_10th TEXT,
    percentage_cgpa_format_10th TEXT,
    percentage_cgpa_value_10th TEXT,
    year_of_passing_10th TEXT,
    remarks_10th TEXT,
    marksheet_10th_url TEXT,

    degree_12th TEXT,
    board_12th TEXT,
    percentage_cgpa_format_12th TEXT,
    percentage_cgpa_value_12th TEXT,
    year_of_passing_12th TEXT,
    remarks_12th TEXT,
    marksheet_12th_url TEXT

    -- degree_1 TEXT,
    -- board_1 TEXT,
    -- percentage_cgpa_format_1 TEXT,
    -- percentage_cgpa_value_1 TEXT,
    -- year_of_passing_1 TEXT,
    -- remarks_10th TEXT
    -- marksheet_degree1_url
);

CREATE OR REPLACE FUNCTION insert_into_login_verification()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    INSERT INTO login_verification(email_id) VALUES(new.email_id);
	RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_insert_into_applicants
  AFTER INSERT
  ON applicants
  FOR EACH ROW
  EXECUTE PROCEDURE insert_into_login_verification();



-- insert into applicants(email_id) values('18tarun2001@gmail.com');


-- Maybe delete entries from signup_verification table using a corn-job