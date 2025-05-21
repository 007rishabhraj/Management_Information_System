# 🛠️ Complaint Portal

A web-based complaint management system designed for faculty users in an educational institution to submit complaints, track their status, provide feedback, and access useful information like facilities and documents. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack and styled using Tailwind CSS.

## 🚀 Features

- 🔐 Faculty Login System  
- 📝 Submit Complaints with location, description, and auto-generated date & time  
- 📬 Track status of complaints (resolved/unresolved)  
- 💬 Feedback Request  
- 🏢 Facility Information  
- 📄 Document Information  
- 📊 Clean and responsive UI  

## 🧰 Tech Stack

Frontend: React.js, Tailwind CSS  
Backend: Node.js, Express.js  
Database: MongoDB  
Authentication: JWT  
State Management: Context API  

## 📦 Installation

Complaint Portal is a web-based complaint management system designed for faculty users in an educational institution. It allows faculty to submit complaints with specific location tags (such as home, department, hostel, campus, lecture hall), add a description, and automatically records the date and time of the complaint. Users can also track the status of their complaints (resolved/unresolved), request feedback, and access information about available facilities and documents. The system is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS for styling and JWT for authentication.

To install and run the application locally, follow these steps:

1. Clone the repository using:  
   git clone https://github.com/007rishabhraj/Management_Information_System.git 
   cd complaint-portal

2. Set up the backend:  
   cd backend  
   npm install

3. Create a .env file inside the /backend directory and add the following:  
   PORT=5000  
   MONGO_URI=your_mongodb_connection_string  
   JWT_SECRET=your_jwt_secret_key
   ASK WHEN NEEDED !

4. Start the backend server:  
   npm run dev

5. Open a new terminal and set up the frontend:  
   cd frontend  
   npm install  
   npm start

The application will now be running on http://localhost:3000 and the backend on http://localhost:8000. JWT handles faculty authentication, and the frontend uses React Context API to manage login state. The file structure includes a backend folder with controllers, models, routes, middleware, and server.js, and a frontend folder with components, pages, context, and App.jsx.

Future plans for the project include adding an admin panel to manage and resolve complaints, sending notifications via email or SMS, supporting multi-role login (e.g., students), enabling complaint filtering by category, and integrating an analytics dashboard. This project is open-source under the MIT License. Contributions are welcome via pull requests or issues on the GitHub repository.

For queries or contributions, contact: rishabhraj135007@gmail.com or visit https://github.com/007rishabhraj.


