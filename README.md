[![Build Status](https://travis-ci.org/edogbosunny/FoofDemo.svg?branch=develop)](https://travis-ci.org/edogbosunny/FoofDemo) [![Coverage Status](https://coveralls.io/repos/github/edogbosunny/FoofDemo/badge.svg?branch=develop)](https://coveralls.io/github/edogbosunny/FoofDemo?branch=develop&service=github) [![Test Coverage](https://api.codeclimate.com/v1/badges/e9c996a6ee0db9e74f11/test_coverage)](https://codeclimate.com/github/edogbosunny/FoofDemo/test_coverage)  [![Maintainability](https://api.codeclimate.com/v1/badges/e9c996a6ee0db9e74f11/maintainability)](https://codeclimate.com/github/edogbosunny/FoofDemo/maintainability)
## Feature

- user can create a new order
- user can update a new order
- users can delete a new order
- users can get a retrieve a specific order by its ID
- users can retrieve a new order

## Project Management

## How to Test using Postman

- To retrieve all order, enter this url endpoint http://localhost:3003/getallorders and select GET method
- To retrieve single order, enter this url endpoint https://localhost:3003/getorder/:id and select GET method.
- To Update an order, enter this url endpoint https://localhost:3003/getorder/:id
  select the PUT method and pass in to the body {meal:"rice", quantity:3}
- To Delete an order, enter this url endpoint https://localhost:3003/delorder/:id and select the DELETE method
- To create an order, enterthis url endpoint https://localhost:3003/order and parse into the body
  the required params stated in the error message on post man
- note that you must have sined in to use this route.
- to sign in create user
  http://localhost:3003/signup
  pass in the username, email password password2 and user_role:admin..
- once you sihn up, please copy the ### Token sent

```
eg
username: sunny
password:123456
password2: 123456
email:test2@test2.com
user_role:admin
```

-to sign in put the token in header and pass the username and password to the body

```
header eg
x-access-token : jdjdskdbskdbsksbdk
```

