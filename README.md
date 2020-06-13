# Fancy ToDo App Server
My Fancy ToDo App is an application to create and manage your todo list. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /users/register

> Register new account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your email>"
    "password": "<your password>"
}
```

_Response (201 - Created)_
```
{
    "id": 1,
    "email": "<email>",
    "password": "<hash password>",
    "updatedAt": "2020-06-13T07:03:28.798Z",
    "createdAt": "2020-06-13T07:03:28.798Z"
}
```

_Response (400 - Bad Request)_
```
{
    "err_code": 400,
    "str_code": "REGISTRATION_VALIDATION",
    "err_msg": [
        "Wrong email format",
        "Email can't be empty",
        "Email already exist",
        "Password can't be empty",
        "Password at least 8 characters and maximum 16 characters"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### POST /users/login

> Login 

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your email>"
    "password": "<your password>"
}
```

_Response (200 - OK)_
```
{
    "id": <user id>,
    "email": "<your email>",
    "access_token": "<access token>"
}
```

_Response (400 - Bad Request)_
```
{
    "err_code": 400,
    "str_code": "INCORRECT_PASSWORD",
    "err_msg": "Incorrect Password"
}
```

_Response (404 - Not Found)_
```
{
    "err_code": 404,
    "str_code": "EMAIL_NOT_FOUND",
    "err_msg": "Email not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### POST /users/google-sign-in

> Login using google account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your google email>"
}
```

_Response (200 - OK)_
```
{
    "id": 1,
    "email": "<your email>",
    "access_token": "<access token>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### GET /todos/list

> List todo

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Request User_
```
{
    "id": "<user id>"
}
```

_Response (200 - OK)_
```
{
    "data": [
        {
        "id": <todo id>,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due date>",
        "createdAt": "<todo created datetime>",
        "updatedAt": "<todo updated datetime>",
        "UserId": <user id>,
        "User": {
            "id": <user id>,
            "email": "<email>",
            "password": "<hash password>",
            "createdAt": "<user created datetime>",
            "updatedAt": "<user updated datetime>",
        }
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### POST /todos/add

> Add new todo

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "UserId": <user id>,
    "createdAt": "<todo created datetime>",
    "updatedAt": "<todo updated datetime>"
}
```

_Response (400 - Bad Request)_
```
{
    "err_code": 400,
    "str_code": "TODO_VALIDATION",
    "err_msg": [
        "Title can't be empty",
        "Description can't be empty",
        "Choose status",
        "Please select due date",
        "Due date must be today or after"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### POST /todos/notify

> Send todo data to email as reminder

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "id": <todo id>
}
```

_Response (200 - OK)_
```
{
    "msg": "Successfully notify todo to your email"
}
```

_Response (404 - Not Found)_
```
{
    "err_code": 404,
    "str_code": "TODO_NOT_FOUND",
    "err_msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### GET /todos/edit/:id

> Get todo data by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "data": {
        "id": <todo id>,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due date>",
        "createdAt": "<todo created datetime>",
        "updatedAt": "<todo updated datetime>",
        "UserId": <user id>
    }
}
```

_Response (404 - Not Found)_
```
{
    "err_code": 404,
    "str_code": "TODO_NOT_FOUND",
    "err_msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### PUT /todos/edit/:id

> Edit todo data by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
}
```

_Response (200 - OK)_
```
{
    "msg": "Successfully update todo"
}
```

_Response (400 - Bad Request)_
```
{
    "err_code": 400,
    "str_code": "TODO_VALIDATION",
    "err_msg": [
        "Title can't be empty",
        "Description can't be empty",
        "Choose status",
        "Please select due date",
        "Due date must be today or after"
    ]
}
```

_Response (404 - Not Found)_
```
{
    "err_code": 404,
    "str_code": "TODO_NOT_FOUND",
    "err_msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```


---
### DELETE /todos/delete/:id

> Delete todo from database by id

_Request Header_
```
{
    "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "msg": "Successfully delete todo"
}
```

_Response (404 - Not Found)_
```
{
    "err_code": 404,
    "str_code": "TODO_NOT_FOUND",
    "err_msg": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err_code": 500,
    "str_code": "INTERNAL_SERVER_ERROR",
    "err_msg": "Internal server error"
}
```