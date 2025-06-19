WIP DRAFT 

TODO 
- write tests requiring mocking axios for yelp responses 
- move logic out of handler and into service layer 
- validate page number input starting from 1 
- add tests around pagination
- group test suites 
---

Setup Instructions
Install dependencies - npm install

Create a .env file in the root directory with this content:
YELP_API_KEY=your_yelp_api_key

Start the server - node index.js
Backend server runs at http://localhost:3001

API Spec
GET /api/v1/boba
location (required): los-gatos, new-york, or la
sort_by (optional): distance or rating
page (optional): number starting from 1

Example request: /api/v1/boba?location=los-gatos&sort_by=rating&page=1

Testing
To run the test suite:
cd /server
one time install - npm install --save-dev jest supertest
npx jest