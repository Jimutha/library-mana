# 📚 Library Book Manager

A full-stack **Library Management System** with **Admin** and **User** logins.  
Built using **React + TailwindCSS (frontend)**, **Node.js + Express (backend)**, and **MongoDB (database)**.

---

## 🚀 Features

### 👨‍💼 Admin
- **Dashboard** with analytics  
  - Pie chart → borrowed books by genres  
  - Bar chart → borrowed books by languages  
  - List of most borrowed books  
- **Inventory Management**  
  - Browse by **Sinhala / English / Other Languages**  
  - Filter by **genre** (adventure, sci-fi, novel, mystery, fantasy, comedy, education, kids, other)  
  - See **availability of books**  
  - View **members & remaining borrow time**  
  - Highlight **users nearest to due date**  
- **Add New Book**  
  - Form with title, author, category, copies  
- **Books List**  
  - Display books as cards (title, copies, actions)  
  - Edit / Delete / View details  

### 👤 User
- **Browse Books**  
  - Step 1: Choose language (Sinhala / English / Other)  
  - Step 2: Choose genre (9 categories)  
  - Step 3: View available books → select one  
- **Book Borrow Flow**  
  - View book details & description  
  - Borrow with time selection (**7 / 14 / 21 days**)  
  - System shows **return date + confirmation message**  
  - Navigation: *Back to Home* or *Borrow another book*  

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Tools:** Git + GitHub, Postman (API testing), VS Code  

---

## 🔗 API Endpoints (CRUD)

### Authentication
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → User/Admin login  

### Books
- `GET /api/books` → Get all books  
- `POST /api/books` → Add new book (Admin)  
- `PUT /api/books/:id` → Update book (Admin)  
- `DELETE /api/books/:id` → Delete book (Admin)  

### Borrow
- `POST /api/borrow` → Borrow a book (User)  
- `GET /api/borrow/user/:userId` → User’s borrowed books  
- `PUT /api/borrow/:id/return` → Return a book  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/library-mana.git
cd library-mana
