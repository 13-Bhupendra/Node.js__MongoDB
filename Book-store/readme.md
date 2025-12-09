
# 📚 Book Store API

A RESTful API for managing a book store, built using **Node.js**, **Express.js**, and **MongoDB**.  
This backend provides full CRUD operations, logging, environment configuration, and clean modular architecture.

---

## 🚀 API Showcase
- [Demo Video Link ](https://drive.google.com/file/d/1mpNPqWMwXxlazjvzB2VhEBR_8vknPyq3/view?usp=sharing)

---

## 🛠️ Tech Stack

![Node](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=white)

---

## 📌 Features

- Add new books  
- Get all books  
- Update book details  
- Delete existing books  
- Logging using custom middleware  
- Environment variable support  
- Modular folder structure  
- JSON-based API  
- MongoDB + Mongoose ODM  

---

## 📦 Prerequisites

- Node.js v18+  
- MongoDB + Mongoose ODM  (Local or Atlas)  
- npm or yarn  

---

## 🗂️ Project Structure

```Book-store/
├── config/ 
│   └── db.js
│              
├── controllers/
│   ├── bookController.js
│  
├── middleware/
│   └── logger.js
│        
├── models/
│   └── booModel.js
│     
├── routes/
│   └── bookRoutes.js
│         
├── app.js                 
├── server.log              
├── package.json           
└── README.md              
