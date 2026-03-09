# FMG — Full-Stack Company Platform

A production-ready company website backend built with **Node.js** and **MongoDB**. Handles everything a modern company platform needs: dynamic content management, team profiles, blog, services, project showcase, and contact — all served through a clean REST API.

---

## What it does

FMG is a backend platform that powers a full company presence. Content is stored and managed in MongoDB, served through modular route handlers, and designed to plug into any frontend.

**Routes & modules:**
- `home.js` — Landing page data
- `about.js` — Company info and mission
- `services.js` — Services catalogue
- `project.js` — Project portfolio
- `companyTeam.js` — Team member profiles
- `blog.js` — Blog post management
- `contact.js` — Contact form handling

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Database | MongoDB |
| Framework | Express.js |
| Architecture | REST API |

---

## Getting started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# Clone the repo
git clone https://github.com/SabaZara/FMG.git
cd FMG

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### Run

```bash
# Start the server
node server.js
```

The API will be running at `http://localhost:3000`.

---

## Project structure

```
FMG/
├── server.js          # Entry point, Express setup
├── app.js             # App configuration
├── model/             # MongoDB data models (Mongoose schemas)
├── home.js            # Home route
├── about.js           # About route
├── services.js        # Services route
├── project.js         # Projects route
├── companyTeam.js     # Team route
├── blog.js            # Blog route
├── contact.js         # Contact route
├── package.json
└── .gitignore
```

---

## Why MongoDB

MongoDB's document model is a natural fit for a company platform — each team member, blog post, or project is a self-contained document. No rigid schema means content structures can evolve without painful migrations. This project uses MongoDB to store and retrieve all dynamic content, with Mongoose models defining the shape of each collection.

---

## Author

**Saba Zarandia**  
IE University · Computer Science & AI  
[GitHub](https://github.com/SabaZara) · [Email](mailto:szarandia.ieu2025@student.ie.edu)
