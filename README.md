# Readme

## Setup

Run `npm i` in both the `server` and `client` directories **separately** to install the dependencies.

## Client

`cd` to the client directory and run `npm start` command in one terminal to start the client-side/frontend.

## Server

`cd` to the server directory and run `npm run dev` command in another terminal to start the server/backend.

## Database

1. Create a database in your postgres shell (psql) using the command `create database mtech;`.
2. Connect to the `mtech` database by running `\c mtech;`.
3. Run all the commands in the `database.sql` (in server directory) file in psql.

## Extra settings

1. Configure GCP by creating a service account and a bucket named _applicant-iit-ropar_ for file storage and projectId _phd-pg-admission-iit-ropar_.
2. Set up an app-password for your email.
3. In the `.env` file in the server directory, update your details.
