🧠 Skill-Swap Platform — Microservices Based Application

A scalable Skill-Swap Platform where users can offer skills they know and request skills they want to learn. The system intelligently finds mutual matches and enables users to connect and collaborate.

Built using a Microservices Architecture to simulate real-world distributed systems.

🚀 Features
👤 User Features

User Signup / Login (JWT Authentication)

Add Offered Skills

Add Wanted Skills

Get Skill Matches

View matched users

Secure API communication

🤝 Matching Logic

Finds users where:

Your offered skill = someone else's wanted skill

Their offered skill = your wanted skill

Mutual benefit = perfect skill exchange

🏗 Architecture Features

Fully Microservices-based

Independent services with separate databases

REST APIs

Token-based authentication

Scalable and loosely coupled design

🧩 Microservices Architecture
                ┌──────────────────┐
                │   API Gateway    │
                └────────┬─────────┘
                         │
     ┌───────────────────┼───────────────────┐
     │                   │                   │
┌──────────────┐  ┌──────────────┐   ┌──────────────┐
│ Auth Service │  │ Skill Service│   │ Match Service│
└──────────────┘  └──────────────┘   └──────────────┘
        │                  │                   │
   MongoDB DB         MongoDB DB          MongoDB DB

🧠 Services Overview
1️⃣ Auth Service

Handles authentication and authorization.

Responsibilities

User Registration

User Login

Password Hashing

JWT Token Generation

Token Validation

Tech

Node.js

Express.js

MongoDB

JWT

bcrypt

2️⃣ Skill Service

Manages user skills.

Responsibilities

Add skills

Separate OFFERED and WANTED

Fetch skills of user

Skill Types

{
  "skillName": "JavaScript",
  "type": "OFFERED" | "WANTED",
  "authUserId": "userId"
}

3️⃣ Match Service

Core brain of the application.

Responsibilities

Fetch skills from Skill Service

Match users based on:

Offered ↔ Wanted

Wanted ↔ Offered

Return matched users

⚙️ Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Database	MongoDB
Auth	JWT, bcrypt
Architecture	Microservices
Communication	REST APIs
Dev Tools	Postman, Docker (optional)
🔐 Authentication Flow

User logs in

Auth Service returns JWT token

Token is sent in headers:

Authorization: Bearer <token>


Services verify token before processing request

🔄 API Flow Example (Matching)
User → API Gateway → Match Service
Match Service → Skill Service (get skills)
Match Service → returns matched users

📂 Project Structure (Example)
skill-swap-platform/
│
├── auth-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── skill-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── user-service/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── server.js
│── swap-service/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── server.js
└── api-gateway/
    └── server.js

🛠 Installation & Setup
1️⃣ Clone Repo
git clone https://github.com/your-username/skill-swap-.git
cd skill-swap-platform

2️⃣ Install Dependencies (Each Service)
cd auth-service
npm install

cd ../skill-service
npm install

cd ../match-service
npm install

3️⃣ Environment Variables

Each service needs a .env file.

Auth Service

PORT=4001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


Skill Service

PORT=4003
MONGO_URI=your_mongodb_uri


user Service

PORT=4002
MONGO_URI=your_mongodb_uri

4️⃣ Start Services

Run each service separately:

npm start

📬 Important API Endpoints
Auth Service
Method	Endpoint	Description
POST	/signup	Register user
POST	/login	Login user
Skill Service
Method	Endpoint	Description
POST	/skill	Add skill
GET	/skill/my	Get my skills
Match Service
Method	Endpoint	Description
GET	/match	Get skill matches
🧠 Matching Logic (Core Idea)
If:
  User A Offered Skill == User B Wanted Skill
AND
  User B Offered Skill == User A Wanted Skill
Then:
  It's a MATCH ✅

🔮 Future Improvements

Real-time chat between matched users

Skill rating system

Skill verification badges

Notifications system

Docker & Kubernetes deployment

API Gateway rate limiting
