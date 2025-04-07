# Group8
## structure inside backend/src
| Folder | Purpose |
|--------|---------|
| **`config/`** | stores **database connection** and environment variable setup |
| **`models/`** | sefines **MongoDB schemas** using Mongoose |
| **`middleware/`** | houses **authentication & authorization logic** (e.g., JWT middleware) |
| **`controllers/`** | handles **business logic** for API requests (e.g., registering users, creating studies) |
| **`routes/`** | defines **API endpoints** that map to controllers |
| **`utils/`** | stores **helper functions** (e.g., password hashing, JWT handling) |
| **`uploads/`** | temporary file storage for uploaded artifacts (if using local storage) |
| **Root files (`server.js`, `app.js`)** | server setup & API configuration |

## Running the project
This project uses concurrently for ease of testing and running
the backend and frontend at the same time.

### Running instructions
* Go into the backend-folder (e.g. "cd .\backend\") from the root of the project.
* The use "npm run start". The "start"-script runs the server and client
  simultaneously.

## Project authors
* Group 8, consisting of:
    * Mariam
    * Jon Petter
    * Sander
