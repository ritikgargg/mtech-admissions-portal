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

CREATE TABLE applicants (
    email_id TEXT PRIMARY KEY
);

CREATE TRIGGER trigger_insert_into_applicants
  AFTER INSERT
  ON applicants
  FOR EACH ROW
  EXECUTE PROCEDURE insert_into_login_verification();

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

-- insert into applicants(email_id) values('18tarun2001@gmail.com');


-- Maybe delete entries from signup_verification table using a corn-job