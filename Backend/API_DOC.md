# 📄 API Documentation – Complaint Management System

This document describes all available API endpoints for the Smart Complaint Management System.

---

## 🔐 Authentication & Authorization

| Role    | Permissions                                             |
|---------|----------------------------------------------------------|
| Student | Create & view their own complaints                      |
| Faculty | Create & view their own complaints                      |
| Admin   | View all complaints, update status, and resolve issues  |

---

## 📥 Auth Routes

### 🔸 Register a User

- **Endpoint**: `POST /register`  
- **Description**: Registers a new user (student, faculty, or admin "Use College Email ID only").

#### 📦 Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

#### ✅ Success Response
```json
{
  "message": "User registered successfully",
  "Data": "User Information"
}
```

---

### 🔸 Login a User

- **Endpoint**: `POST /login`  
- **Description**: Logs in a user and returns a JWT token.

#### 📦 Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### ✅ Success Response
```json
{
  "message": "Login successful",
   "Data": "User Information"
}
```

---

### 🔸 Logout a User

- **Endpoint**: `POST /logout`  
- **Description**: Logs out the user by clearing the JWT cookie.

---

## 📝 Complaint Routes

### 🔸 Create a Complaint

- **Endpoint**: `POST /complaints`  
- **Access**: `student`, `faculty`

#### 📦 Request Body
```json
{
  "title": "Wi-Fi not working",
  "description": "The lab has no internet access.",
  "category": "Admistration"
}
```

#### ✅ Success Response
```json
{
  "message": "Complaint submitted successfully",
  "complaint": {
    "_id": "123",
    "title": "Wi-Fi not working"
  }
}
```

---

### 🔸 Get All Complaints

- **Endpoint**: `GET /complaints`  
- **Access**:
  - `student`: sees own complaints  
  - `faculty`: sees own complaints  
  - `admin`: sees all complaints

#### ✅ Success Response
```json
[
  {
    "_id": "123",
    "title": "Wi-Fi not working",
    "status": "Pending"
  }
]
```

---

<!-- ### 🔸 Get Complaint by ID

- **Endpoint**: `GET /api/complaints/:id`  
- **Access**: Creator (student/faculty) or Admin

--- -->

### 🔸 Update Complaint Status

- **Endpoint**: `PUT /complaints/:id/status`  
- **Access**: `admin`

#### 📦 Request Body
```json
{
  "status": "Resolved",
  "resolutionNote": "Issue fixed by IT department"
}
```

#### ✅ Success Response
```json
{
  "message": "Complaint status updated",
  "complaint": {
     "_id": "123",
     "title": "Internet is not Working",
     "status": "Resolved",
  }
}
```

---

<!-- ### 🔸 Delete Complaint

- **Endpoint**: `DELETE /api/complaints/:id`  
- **Access**: Only the user who created the complaint

--- -->

## ❌ Error Response Format

All errors return the following format:
```json
{
  "error": "Error message here"
}
```

---

## 📌 Status Codes Used

| Code | Description             |
|------|-------------------------|
| 200  | OK                      |
| 201  | Created                 |
| 400  | Bad Request             |
| 401  | Unauthorized            |
| 403  | Forbidden (no access)   |
| 404  | Not Found               |
| 500  | Server Error            |

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Postman (for testing)

---

## 🧠 Author & License

Developed by **[Fraz Ahmad Haidry]**  
License: **All Right Reserved**