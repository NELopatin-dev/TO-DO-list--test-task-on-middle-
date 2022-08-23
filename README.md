Client - folder with files of frontend.
How to start?
- npm i - install packeges
- taouch .env - create .env file for config of frontend
- npm run build - create production build


Server - folder with backend files
How to start?
- npm init -y - init npm in ./server directory
- npm i - install packeges
- taouch .env - create .env file for config of backend
- node index.js - start backend

DataBase - folder with text file of command to create MySQL database/

Client .env:
# Link to backend
REACT_APP_URLAPI = http://localhost:3001 

Server .env:
# Host of MySQL database
MYSQL_CONN_HOST = localhost
# User of MySQL database 
MYSQL_CONN_USER = root
# Password of MySQL database 
MYSQL_CONN_PASS = 000307550206
# Database's name of MySQL database 
MYSQL_CONN_DB = todo_success
# Secret key for JWT token
SECRET_KEY = todo_secret_key
