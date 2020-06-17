# Fancy ToDo App Server
My Fancy ToDo App is an application to create and manage your todo list. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Register new account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<user email>"
    "password": "<user password>"
}
```

_Response (201 - Created)_
```
{
    "id": <user id>,
    "email": "<user email>",
    "password": "<hash password>",
    "createdAt": "<created datetime>",
    "updatedAt": "<updated datetime>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```


---
### POST /login

> Login 

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<user email>"
    "password": "<user password>"
}
```

_Response (200 - OK)_
```
{
    "id": <user id>,
    "email": "<user email>",
    "access_token": "<access token>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "<error message>"
}
```

_Response (404 - Not Found)_
```
{
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
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
    "id": <user id>,
    "email": "<user email>",
    "access_token": "<access token>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```


---
### GET /todos

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
    "message": "<error message>"
}
```


---
### POST /todos

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
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
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
    "message": "Successfully notify todo to your email"
}
```

_Response (404 - Not Found)_
```
{
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```


---
### GET /todos/:id

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
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```


---
### PUT /todos/:id

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
    "message": "Successfully update todo"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "<error message>"
}
```

_Response (404 - Not Found)_
```
{
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```


---
### DELETE /todos/:id

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
    "message": "Successfully delete todo"
}
```

_Response (404 - Not Found)_
```
{
    "message": "<error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<error message>"
}
```