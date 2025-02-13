Clone repository


For the program to work with all 

to run the Javascript:
cd to 08._Server-Server/01._node
run "npm init -y" in terminal
run "npm i express" in terminal
run "npm install -g localtunnel" in terminal
run "lt --port 8080 -s simon" in terminal
use postman or browser to test endpoints, endpoints should look like "https://simon.loca.lt"
try it out  https://simon.loca.lt/sniddy/:name/:number replace name and number with your choice.

to run the Python:
cd to 08._Server-Server/02._python
run "poetry init"
run "poetry install" if that doesnt work run "poetry add uvicorn fastapi"
run uvicorn main:app --reload
run "lt --port 8000 -s simon" in terminal
use postman or browser to test endpoints, endpoints should look like "https://simon.loca.lt"




