# **Turtle Movies Review**

This is a place where you can leave reviews on movies

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### **Installing**

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```bash
git clone https://github.com/NedyUdombat/turtle-app.git && cd turtle-app && yarn
```

When installation is complete run:

```bash
yarn watch
```

Your default browser will automatically open the webpage

## **Project Architecture**

In this project, the folders and files were grouped by functions, and on hte lowest level wee grouped by features.

In this repository, a grouping files and folders by **functions** is basically seperation of concerns, which means there are folders that

* handle application wide state
* hold components that combine to provide a webpage
* hold pages
* handle configurations and environment variables
* handles utility functions
* holds stylesheets etc

On the low level, for instance: in the `Sidebar` component, all files that are related to that component is placed inside the folder including the tests if any.

All abstracted functions are placed in the `utils` folder.

Below is the visual structure of the repository

### **Folder Structure**

```bash
.github/
  PULL_REQUEST_TEMPLATE.md
db/
  movies.json
node_modules/
  **
public/
  bundle.js
  index.html
src/
  assets/
    scss/
      custom.scss
      index.scss
      variables.scss
  components/
    Sidebar/
      index.jsx
      index.scss
    Table/
      index.jsx
      index.scss
  config/
    index.js
  pages/
    Errors/
      404.jsx
      index.scss
    Index/
      index.jsx
      index.scss
  store/
    modules/
      movie.js
    rootReducer.js
    store.js
  utils/
    helpers.js
  Index.jsx
  ROuter.jsx
  setupTests.js
```

The root directory consists of configuration files and other files that determin code style and libraries and environment variables etc

### **Improvements to be made**

* **Sort**: Add a function to sort all columns on the table in ascending and descending order and a y-axis double caret icon in a button beside each column name to trigger this function.
* **Tests**: Due to time, tests were not written but it was setup.
* Add a function that allows users to press enter to send comments
* **Responsiveness**: Improve responsive on all screen sizes
* **Deployment**: Deploy to a hosting service for easy review and testing.

### **Built With**

* [React](https://reactjs.org/) - The web framework used
* [Redux](https://redux.js.org/) - State Manager
* [Moment](https://momentjs.com/) - A javascript library for formatting and manipulating date & time
* [Numeral](http://numeraljs.com/) - A javascript library for formatting and manipulating numbers
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Jest](https://jestjs.io/) - JavaScript Testing Framework
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

### **Author**

**Nedy Udombat** - *Other works* - [Nedy Udombat](https://github.com/nedyudombat)

### **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
