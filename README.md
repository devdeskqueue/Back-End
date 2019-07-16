## DevDesk API Documentation

### Routes

#### Endpoint
https://api-devdesk.herokuapp.com/api

#### ER Diagram
https://dbdiagram.io/d/5d26ae9aced98361d6dc8c8c

#### Register
| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| POST    | `/register` | Registers a new user with the system. Requires 'first_name', 'last_name', 'email', and 'password'.     |

#### Login
| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| POST    | `/login` | Returns a JWT if successful. Requires 'email' and 'password' be sent in.    |

#### Users
| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| GET    | `/users` | Returns an array of  objects representing all users in the database.     |
| GET    | `/users/:id` | Returns an object for the particular user id specified.     |

#### Tickets

| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| GET    | `/tickets` | Returns all tickets       |
| GET    | `/tickets/:id` | Returns the project with the provided `id` and include a list of the related comments. |
| POST    | `/tickets` | Add the project to the database and return the `id` of the new project. |
| PUT    | `/tickets/:id` | Modify an existing project.                   |
| DELETE | `/tickets/:id`         | Delete a project.                            |

#### Comments

| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| GET    | `/tickets/:ticket_id/comments`         | Returns all comments for a specific project      |
| GET    | `/tickets/:ticket_id/comments/:id`         | Returns the comment with the provided `id`.       |
| POST    | `/tickets/:ticket_id/comments`         | Add a comment to the database.      |
| PUT    | `/tickets/:ticket_id/comments/:id`         | Modify an existing comment.                   |
| DELETE | `/tickets/:ticket_id/comments/:id`         | Delete an comments.                            |                           |

#### Categories

| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| GET    | `/categories` | Returns all categories       |
| GET    | `/categories/:id` | Returns the project with the provided `id` and include a list of the related comments. |
| POST    | `/categories` | Add the project to the database and return the `id` of the new project. |
| PUT    | `/categories/:id` | Modify an existing project.                   |
| DELETE | `/categories/:id`         | Delete a project.     

---
### Data Models

| Method | Description |
|--------|-------------|
| `findAll(tabale)` | Returns a promise that resolves to an array of all the resources contained in the database. |
| `findById(table, id)` | Returns a promise that resolves to the resource with that id if found. |
| `insert(table, data)` | Accepts a `resource` object to add it to the database and return the new `resource`.
| `update(table, id, data)` | Update record and return the updated record |
| `remove(table, id)` | Deletes the resource from the database, returns a confirmation message. |
