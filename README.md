# Group8


## structure inside src
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

