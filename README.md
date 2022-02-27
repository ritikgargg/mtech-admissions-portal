# Urgent: Change your applicants table before sign-in/signup

# Readme

## Setup
Run `npm i` in both the `server` and `client` directories **separately** to install the dependencies.

## Client
`cd` to the client directory and run `npm start` command in one terminal to start the client-side/frontend.

## Server
`cd` to the server directory and run `npm run dev` command in another terminal to start the server/backend.

## Database
1. Create a database in your postgres shell (psql) using the command `create database mtech;`.
2. Connect to the `mtech` database by running `\c mtech;`
3. Run all the commands in the `database.sql` file in psql.
4. Create any relation you want in the psql. Also, add the command in the `database.sql` file.
5. Add your password in the `db.js` file.
6. When you drop the `applicants` table or any other table and then add it to the database again, do not forget to add the corresponding triggers.

## Extra settings
For the server, create an app password for your **email**.  
In the `auth.js` file in the server directory, put your email and app password in **auth**.  

## To get email hash token from session storage, import getToken from Sessions.js and use `getToken()`.

Happy Coding :)