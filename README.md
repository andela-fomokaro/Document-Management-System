[![Build Status](https://travis-ci.org/andela-fomokaro/Document-Management-System.svg)](https://travis-ci.org/andela-fomokaro/Document-Management-System)
[![Coverage Status](https://coveralls.io/repos/github/andela-fomokaro/Document-Management-System/badge.svg?branch=feature%2F143770291%2Fset-up-client-environment)](https://coveralls.io/github/andela-fomokaro/Document-Management-System?branch=feature%2F143770291%2Fset-up-client-environment)
[![Code Climate](https://codeclimate.com/github/andela-fomokaro/Document-Management-System/badges/gpa.svg)](https://codeclimate.com/github/andela-fomokaro/Document-Management-System)

[API Documentation Link](https://docstar-docs.herokuapp.com/)

# Document Management System
The Document management system provides REST API enpoints for a document management system. It allows users create, retrieve, update and delete their documents. It also ensures that users are authorized for the basic actions to be carried out.

## Development
Document Management System Application is built with the following technologies;
- JavaScript (ES6)
- [NodeJs](https://nodejs.org)
- [Express](http://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/v3/)
- [React](https://facebook.github.io/react/docs/installation.html)
- [Redux](http://redux.js.org/)

## Installation
  - Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
  - Clone the repository `$ git clone https://github.com/andela-fomokaro/Document=Management-System.git`
  - Change into the directory `$ cd /dms`
  - Install all required dependencies with `$ npm install`
  - Start the app with `npm start`
  - Run Test `npm test`

## Contributing
- Fork this repository to your GitHub account
- Clone the forked repository
- Create your feature branch
- Commit your changes
- Push to the remote branch
- Open a Pull Request

## Limitations
The limitations of the API are:
- Documents are not unique (A user can create a document with the same title)
- User cannot login on two different platform

## LICENSE
 © [OmokaroFaith](https://github.com/andela-fomokaro)



