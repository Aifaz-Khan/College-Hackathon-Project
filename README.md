# College Hackathon Project (MERN)

This project is a MERN stack application with **separate frontend and backend** folders.

Please follow the steps below to set it up on your system.

---

## 📁 Project Structure

```bash
College-Hackathon-Project/
  backend/
  frontend/
  README.md
1.	Open terminal and go to the project folder:
cd College-Hackathon-Project
2.	Go inside the backend folder:
cd backend
3.	Install all dependencies:
npm i
	4.	Create a .env file inside backend/ with your values:
MONGO_URI=your_mongodb_atlas_connection_string// paste the string which i will provide in the group
JWT_SECRET=your_secret_here
PORT=8000
5.	Run the backend server:
npm run dev
Backend will run on:
http://localhost:8000

2. Frontend Setup
	1.	Open a new terminal window/tab.
	2.	Go to the project folder:
cd College-Hackathon-Project
cd frontend
4.	Install all dependencies:
npm i
	5.	(Optional) Create a .env in frontend/ if using API URL:
VITE_API_URL=http://localhost:8000/api
6.	Run the frontend app:
npm run dev
Frontend will run on (Vite default):
http://localhost:5173
