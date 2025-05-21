# 📄 API Documentation – Complaint Management System

This document provides all available API endpoints for the **Smart Complaint Management System**.

---

## 🔐 Authentication & Authorization

| Role     | Permissions                                              |
|----------|----------------------------------------------------------|
| Student  | Create & view own complaints                             |
| Faculty  | Create & view own complaints                             |
| Admin    | View all complaints, change status, resolve complaints   |

---

## 📥 Auth Routes

### 🔸 Register a User

- **POST** `/api/auth/register`
- **Description**: Registers a new student, faculty, or admin.

#### 📦 Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}

✅ Success Response
json
Copy code
{
  "message": "User registered successfully",
  "token": "jwt_token"
}


🔸 Login a User
POST /api/auth/login

Description: Logs in a user and sets JWT token.

📦 Request Body
json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}


Success Response
json
Copy code
{
  "message": "Login successful",
  "token": "jwt_token"
}
🔸 Logout a User
POST /api/auth/logout

Description: Logs out the user by clearing the JWT cookie.

📝 Complaint Routes
🔸 Create a Complaint
POST /api/complaints

Access: student, faculty

📦 Request Body
json
Copy code
{
  "title": "Wi-Fi not working",
  "description": "The lab has no internet access.",
  "category": "Infrastructure"
}
✅ Success Response
json
Copy code
{
  "message": "Complaint submitted successfully",
  "complaint": {
    "_id": "123",
    "title": "Wi-Fi not working"
  }
}
🔸 Get All Complaints
GET /api/complaints

Access:

student: returns only their complaints

faculty: returns only their complaints

admin: returns all complaints

✅ Success Response
json
Copy code
[
  {
    "_id": "123",
    "title": "Wi-Fi not working",
    "status": "Pending"
  }
]
🔸 Get Complaint by ID
GET /api/complaints/:id

Access: Creator (student/faculty) or Admin

🔸 Update Complaint Status
PATCH /api/complaints/:id/status

Access: admin

📦 Request Body
json
Copy code
{
  "status": "Resolved",
  "resolutionNote": "Issue fixed by IT department"
}
✅ Success Response
json
Copy code
{
  "message": "Complaint status updated"
}
🔸 Delete Complaint
DELETE /api/complaints/:id

Access: Only by the user who created the complaint

❌ Error Response Format
All errors return a JSON response like:

json
Copy code
{
  "error": "Error message here"
}
📌 Status Codes Used
Code	Description
200	OK
201	Created
400	Bad Request
401	Unauthorized
403	Forbidden (no access)
404	Not Found
500	Server Error

🛠 Tech Stack
Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Postman (for testing)

🧠 Author & License
Developed by [Your Name]
License: MIT

yaml
Copy code

---

Let me know if you'd like to customize it further or convert it into a downloadable file.






