# Boba Locator Application 

## Setup Instructions

Clone repo at https://github.com/BranRitz/boba-shop-locator

### Server:
**Install dependencies**
cd server
npm install

**Configure Yelp API key**
Create a .env file in the server/ directory with this content:
YELP_API_KEY=your_yelp_api_key

**Start the server**
node server.js

Backend server runs at http://localhost:3001

### Client:
**Install dependencies**
cd client
npm install 

**Start React app**
npm start 

Frontend server runs at http://localhost:3001

## API Spec

### GET /api/v1/boba

#### Query Params:

- **`location`** (required; default: `los-gatos`): 
Must be one of the following:
`los-gatos`, `new-york`, or `la`

- **`sort_by`** (optional):  
  Must be one of the following:  
  `distance` or `rating`

- **`page`** (optional):  
  Number starting from `1`

### Example request: 
GET /api/v1/boba?location=los-gatos&sort_by=rating&page=1

## Running Tests

### Backend

To run the test suite:

cd /server
npm install --save-dev jest supertest # One time install 
npx jest


## Implementation Notes:
This project was built with a focus on clean structure, modularity, and clarity of logic. I prioritized functionality first to make sure the application met all core requirements first (API integration, search, sort, pagination), then iterated on UI. Backend logic is abstracted into a service layer, and the frontend is structured for easy component extraction (todo). 

### Current Gaps
- Backend tests exist for route validation but mocking Yelp API responses with Axios is still a TODO.
- Frontend tests were not implemented due to time constraints.
- Page number validation is not yet enforced on the backend or frontend.
- UI styling was intentionally left minimal to focus on logic first.

### Next Steps (TODO)
- Polish UI layout
- Mock Yelp API responses for backend unit tests.
- Add frontend test coverage for fetch, render, and pagination logic.
- Extract and modularize frontend components.
- Add validation to ensure page >= 1 for all requests.

Note: To save time during development, I committed directly to main. In a production or collaborative setting, I would use branches and open pull requests for all features. Just want to be clear that I would never directly commit to main in most settings. 


