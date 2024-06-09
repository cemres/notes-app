# Notely App (React, Express, PostgreSQL)

Notely, app built with React, Express, and PostgreSQL.

## Prerequisites

- Docker
- Docker Compose
- Git

## Getting Started

1.  Clone this repository:

    ```bash
    git clone <repository-url>
    ```

2.  Running the frontend:
    ```bash
    cd web
    yarn install
    yarn dev
    ```
3.  Running the backend:

    ```bash
    cd api
    docker-compose up (for postgre)
    yarn install
    yarn dev
    ```

## Directory Structure

- `api/`: Contains the Node.js Express API code.
- `web/`: Contains the React Vite frontend code.

## API Endpoints

### 1) Authentication Endpoints

#### Login

- **URL:** `/api/auth/login`
- **Method:** POST
- **Description:** Logs user in by verifying the email and password. If everything is okay, user gets some JWT tokens for authentication.

#### Refresh Token

- **URL:** `/api/auth/refresh-token`
- **Method:** GET
- **Description:** Refreshes user access token using a refresh token stored in an HTTP-only cookie. This keeps user logged in and authenticated.

#### Delete Refresh Token

- **URL:** `/api/auth/refresh-token`
- **Method:** DELETE
- **Description:** Clears out users refresh token from the cookie. Used for logout.

### 2) User Endpoints

#### Get All Users

- **URL:** `/api/users/`
- **Method:** GET
- **Description:** Fetches all users from the database. Requires authentication.

#### Get Current User

- **URL:** `/api/users/current-user`
- **Method:** GET
- **Description:** Fetches details of the currently logged-in user.

#### Create User

- **URL:** `/api/users/`
- **Method:** POST
- **Description:** Registers a new user with a username, email, and password.

### 3) Notes Endpoints

#### Create Note

- **URL:** `/api/notes/`
- **Method:** POST
- **Description:** Creates a new note with a title and content for the logged-in user.

#### Get All Notes

- **URL:** `/api/notes/`
- **Method:** GET
- **Description:** Retrieves all notes belonging to the logged-in user.

#### Get Note by ID

- **URL:** `/api/notes/:id`
- **Method:** GET
- **Description:** Retrieves a specific note by its ID, belonging to the logged-in user.

#### Update Note

- **URL:** `/api/notes/:id`
- **Method:** PUT
- **Description:** Updates a specific note by its ID, belonging to the logged-in user.

#### Delete Note

- **URL:** `/api/notes/:id`
- **Method:** DELETE
- **Description:** Deletes a specific note by its ID, belonging to the logged-in user.
