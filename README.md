## DevDesk API Documentation

### Routes

#### Endpoint
https://api-devdesk.herokuapp.com/api

#### ER Diagram
https://dbdiagram.io/d/5d26ae9aced98361d6dc8c8c

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
| `findAll()` | Returns a promise that resolves to an array of all the resources contained in the database. |
| `findById()` | Takes an id as the argument and returns a promise that resolves to the resource with that id if found. |
| `insert()` | Accepts a `resource` object to add it to the database and return the new `resource`.
| `update()` | Accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly. |
| `remove()` | Accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns a confirmation message. |
