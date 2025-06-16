# CRM

A full-stack Customer Relationship Management app where you can manage your whole sales team, and leads.
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link
[Live Demo](https://neog-m-project-b-frontend.vercel.app/)

## Quick Start
```
git clone https://github.com/ok-avi/neog-MProject-b.git
cd neog-MProject-b/frontend
npm install
npm run dev

cd neog-MProject-b/backend
npm install
npm run dev
```
Create a .env file in ```/backend``` folder. Store important items in variable
- PORT
- MONGODB

## Technologies
- React JS, React Router
- Node.js, Express
- MongoDB, Mongoose
- Bootstrap

## Demo Video
Watch a 5–7 minute walkthrough of the app's main features.[Video Link]()

## Features

### Leads
- Edit, sort, filter and add new lead details
- Visual representation of lead statuses

### Sales Agnets
- Edit, sort and add new agent details
- Visual representation of agent report

### Comments
- Add new comments 
- Register the time each comment is made

## API Reference

### Leads
GET ```/api/v1/leads``` &rarr; get all leads \
GET ```/api/v1/leads/:id``` &rarr; get lead by id \
POST ```/api/v1/leads``` &rarr;  create new lead \
PUT ```/api/v1/leads/:id``` &rarr; update existing lead by id \
DELETE ```/api/v1/leads/:id``` &rarr; delete lead by id

### Sales Agents
GET ```/api/v1/agents``` &rarr;  get all agents   
POST ```/api/v1/agents``` &rarr;    create new agents 

### Comments
GET ```/api/v1/leads/:id/comments``` &rarr;   get all comments
POST ```/api/v1/leads/:id/comments``` &rarr;  create new comments

### Reports
GET ```/api/v1/report/last-week``` &rarr; get last-week leads
GET ```/api/v1/report/pipeline``` &rarr; get pipeline leads

## Contact
For bugs or feature requests, please reach out to avi11574kumar@gmail.com
