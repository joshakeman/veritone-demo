To run app:

1. Clone repo.
2. Create database with following series of commands (must have postgres):
- psql postgres
- create database shopping;
- create user shopping;
- grant all privileges on database shopping to shopping;

Use two terminal windows:
1. CD into cmd and run `go run main.go`
2. CD into Web and run `npm install`, then `npm start`



