# ShoesFeetSlippers
This fullstack project is an ecommerce store that sells shoes from the ASOS API. Built with the **MERN stack** + **Typescript**, it features user login and authetication, cart management features, and checkout with **Stripe API**. 

### Getting Started

---

Due to the call limit of ASOS API, this app is currently not deployed and uses mock data to demonstrate the core functionalities of the application in a local environment. 

Clone this respository. From the parent directory, run `npm install ` and `npm run dev` to start the backend server. Change into the client folder and run `npm install ` and then `npm start` to start the client application. From the client folder, you can also run `npm run test` to run the tests implemented in Jest. To view and run the e2e tests, you will need to have `cypress` installed and run `npx cypress open` from the client folder. 

Do note you will need to have **mongoDB** installed and a local instance running on your machine at port `localhost: 27017`

# Introduction
This is my final project as part of General Assembly's 12 week software engineering bootcamp. While the idea of building an ecommerce store front is simple, my key objectives for this project was to 1) develop the entire frontend in **React Typescipt** (with minimal to no use of the `any` keyword) and 2) implement frontend unit testing with **Jest** and automated integration and end-to-end tests with **Cypress**. A third but less specific goal was to keep the code as concise and readable as possible with a logical structure to the overall design of the application. 

### Key Technologies
#### Frontend
* React Typescript - frontend framework with typesafety
* TailwindCSS (Daisy UI, Hyper UI) - CSS framework + component libraries
* Formik + Yup - form state management + input validation
* Axios - http client
* React Query - server state management and caching

#### Backend
* NodeJS + ExpressJS - backend framework
* MongoDB + Mongoose - non-relational database + ODM
  
#### Testing
* Jest - unit testing of components and functions
* Cypress - automated integration and end-to-end testing 
* Testing Library - querying UI components 
* FakerJS - creating mock data

