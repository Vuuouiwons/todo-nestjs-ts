# NestJS Flow
```
                       endpoint.modules
                              |
                              V
endpoint.controller -> endpoint.service -> endpoint.repository
```

# ToDo List NestJS
# Tech stack
Describe the tech stack used to make this todo app.
1. NestJS
2. Typescript

## etc Tech stack
Supporting microservices
1. postgresql
2. redis

# Data flow
```text
app -> routes -> middlewares -> controllers -> services -> repository -> database -> models
```

# Endpoints
## Simple list of all endpoints

| Method | Endpoint                           | Auth | Payload                  | Response Example                   | Description                  |
| ------ | ---------------------------------- | ---- | ------------------------ | ---------------------------------- | ---------------------------- |
| POST   | `/register`                        | -    | `{ username, password }` | OK                                 | Register a new user          |
| POST   | `/login`                           | -    | `{ username, password }` | JWT                                | Login and receive JWT        |
| GET    | `/todolists`                       | JWT  | –                        | status, message, data: todolist    | Fetch all to-do lists        |
| POST   | `/todolists`                       | JWT  | `{ title }`              | status, message, data: NULL        | Create a new to-do list      |
| GET    | `/todolists/:listId`               | JWT  | –                        | status, message, data: NULL        | Get a single list with todos |
| PUT    | `/todolists/:listId`               | JWT  | `{ title, status }`      | status, message, data: NULL        | Update the title of a list   |
| DELETE | `/todolists/:listId`               | JWT  | –                        | status, message, data: todo        | Delete a to-do list          |
| POST   | `/todolists/:listId/todos`         | JWT  | `{ message }`            | status, message, data: NULL        | Add a new todo to a list     |
| PUT    | `/todolists/:listId/todos/:todoId` | JWT  | `{ message, status }`    | status, message, data: todo.status | Update a specific todo       |
| DELETE | `/todolists/:listId/todos/:todoId` | JWT  | –                        | status, message, data: NULL        | Delete a specific todo       |


## Status format
the status format is drived from http status with added information.
```
node-controller-httpCode
x-xx-xxx
```

## Detailed description of the endpoint and its functions
endpoint description contains a header, payload, and reponse table for that endpoint.
#### table example
| key  | value description |
| ---- | ----------------- |
| data | i am data         |

### POST  : `/register`
add new account to database.
#### Payload
| key      | value description                                                       |
| -------- | ----------------------------------------------------------------------- |
| username | username of user, unique, only contains lowercase a-z                   |
| password | password of the user, password is stored in database with sha512 hasing |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 201       | nodeId-RE-201 | success, user created                            |
| 422       | nodeId-RE-422 | request body invalid                             |
| 400       | nodeId-RE-400 | username not available                           |
| 500       | nodeId-RE-500 | internal server error, new unknown error occured |

### POST  : `/login`
login to the account, and retrives a json web token (JWT).

#### Payload
| key      | value description |
| -------- | ----------------- |
| username | self explainatory |
| password | self explainatory |

#### Response payload
| key     | value description            |
| ------- | ---------------------------- |
| status  | self explainatory            |
| message | self explainatory            |
| data    | JSON with keys: jwt (string) |

#### Status
| HTTP Code | Code          | Description            |
| --------- | ------------- | ---------------------- |
| 201       | nodeId-LO-201 | success, token created |
| 422       | nodeId-LO-422 | request body invalid   |
| 401       | nodeId-LO-401 | user unauthenticated   |

### GET   : `/todolists`
get all todolists for the user. **Note: User credential is taken from jwt**.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Params
| key    | value desciption       |
| ------ | ---------------------- |
| limit  | amount of todolists    |
| offset | todolists index offset |

#### Response payload
| key     | value description                                 |
| ------- | ------------------------------------------------- |
| status  | self explainatory                                 |
| message | self explainatory                                 |
| data    | JSON with keys: todolists [title, status] (array) |

| HTTP Code | Code          | Description           |
| --------- | ------------- | --------------------- |
| 200       | nodeId-TL-200 | success               |
| 500       | nodeId-LO-500 | unknown error occured |

### POST  : `/todolists/:todolistId`
add a todo to todolist to todolistId.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key     | value description                    |
| ------- | ------------------------------------ |
| message | message that the todo should contain |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 201       | nodeId-TL-201 | success, todolist created                        |
| 422       | nodeId-TL-422 | request body invalid                             |
| 500       | nodeId-TL-500 | internal server error, new unknown error occured |

### PUT   : `/todolists/:todolistId`
update the todolist property in this case title.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key                | value description                    |
| ------------------ | ------------------------------------ |
| message (optional) | message that the todo should contain |
| status (optional)  | status complete and incomplete       |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 201       | nodeId-TL-201 | success, todolist updated                        |
| 422       | nodeId-TL-422 | request body invalid                             |
| 400       | nodeId-TL-400 | todolist doesn't exist                           |
| 500       | nodeId-TL-500 | internal server error, new unknown error occured |

### DELETE: `/todolists/:todolistId`
delete the todolist from the user.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 204       | nodeId-TL-204 | deleted                                          |
| 400       | nodeId-TL-400 | delete failed                                    |
| 500       | nodeId-TL-500 | internal server error, new unknown error occured |

### GET   : `/todolists/:todolistId`
get all the todo from todolistId.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Params
| key    | value desciption       |
| ------ | ---------------------- |
| limit  | amount of todolists    |
| offset | todolists index offset |

#### Response payload
| key     | value description                             |
| ------- | --------------------------------------------- |
| status  | self explainatory                             |
| message | self explainatory                             |
| data    | JSON with keys: todo[status, message] (array) |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 200       | nodeId-TO-200 | success                                          |
| 400       | nodeId-TO-400 | todolist doesn't exist                           |
| 500       | nodeId-TO-500 | internal server error, new unknown error occured |

### POST  : `/todolists/:todolistId/todo`
add todo to todolist

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key     | value description                    |
| ------- | ------------------------------------ |
| message | message that the todo should contain |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 201       | nodeId-TO-201 | success, todo added                              |
| 422       | nodeId-TO-422 | request body invalid                             |
| 400       | nodeId-TO-400 | todolist doesn't exist                           |
| 500       | nodeId-TO-500 | internal server error, new unknown error occured |

### PUT   : `/todolists/:todolistId/todo/:todoId`
update the todo status (completed, incomplete), and todo message.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key                | value description                    |
| ------------------ | ------------------------------------ |
| message (optional) | message that the todo should contain |
| status (optional)  | status complete and incomplete       |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 201       | nodeId-TO-201 | success, todo updated                            |
| 422       | nodeId-TO-422 | request body invalid                             |
| 400       | nodeId-TO-400 | todolist or todo doesn't exist                   |
| 500       | nodeId-TO-500 | internal server error, new unknown error occured |

### DELETE: `/todolists/:todolistId/todo/:todoId`
delete the todo from todolist

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

#### Status
| HTTP Code | Code          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| 204       | nodeId-TO-204 | success, todo deleted                            |
| 400       | nodeId-TO-400 | todolist or todo doesn't exist                   |
| 500       | nodeId-TO-500 | internal server error, new unknown error occured |