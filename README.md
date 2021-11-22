To run app:

Clone repo.
Create database with following series of commands (must have postgres):
psql postgres
brew services start postgresql
create database shopping;
create user shopping;
grant all privileges on database shopping to shopping;

Use two terminal windows:
1. CD into cmd and run `go run main.go`
2. CD into Web and run `npm install`, then `npm start`



