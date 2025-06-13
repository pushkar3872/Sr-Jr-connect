# Senior-Junior Connect Web App

Welcome to the **Senior-Junior Connect** project, a web-based platform built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, designed to connect senior and junior students from colleges for networking, skill sharing, and communication.

## Features
- **User Authentication**: Secure registration and login system with JWT-based authentication
- **Profile Management**: 
  - Personal information management
  - Academic details
  - Skills showcase
  - Social platform links (GitHub, LinkedIn, LeetCode, etc.)
- **Real-Time Chat**: Live messaging system using Socket.io
- **Connections**: Find and connect with other students
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Customization**: Multiple theme options for personalized user experience
- **Cloud Storage**: Profile picture storage using Cloudinary

## Technologies Used

### Frontend
- React.js with Vite
- State Management: Zustand
- UI Components:
  - TailwindCSS
  - DaisyUI
  - Lucide React Icons
- Notifications: React Hot Toast
- Routing: React Router DOM v7
- Real-time Communication: Socket.io Client

### Backend
- Node.js with Express.js
- Authentication: JWT & bcryptjs
- Database: MongoDB with Mongoose
- Real-time Server: Socket.io
- File Upload: Cloudinary
- Environment Variables: dotenv
- CORS enabled for secure communication
  
## Live Demo
🌐 Deployed Web : [Sr-Jr Connect](https://sr-jr-connect.onrender.com)

## Snapshots
![Screenshot (1385)](https://github.com/user-attachments/assets/86605a13-898c-4ff1-8a65-aa834958be01)
![image](https://github.com/user-attachments/assets/71a9a6a1-2fb4-4057-baa3-ef1bca6d9c42)
![image](https://github.com/user-attachments/assets/97f07116-41b4-4508-a929-4cc01369197f)
![image](https://github.com/user-attachments/assets/428ff3a1-d544-4cdc-b32f-3fedb6396383)
![image](https://github.com/user-attachments/assets/62da236d-29df-4f10-bed9-76a74b94d65b)
![Screenshot (1387)](https://github.com/user-attachments/assets/49aba32c-ceac-4fec-9454-e0cae90b5dd8)



## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account
- Cloudinary Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Its-Shinde4241/Sr-Jr-connect.git
cd Sr-Jr-connect
```

2. Set up environment variables:

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

Create a `.env` file in the frontend directory:
```env
VITE_IP_ADDRESS=your_local_ip_address
```

3. Install dependencies and start the application:

For Development:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start the backend server (from backend directory)
npm run dev

# Start the frontend development server (from frontend directory)
npm run dev
```

For Production:
```bash
# Install all dependencies and build frontend
npm run build

# Start the production server
npm start
```

## Scripts

- `npm run build`: Installs dependencies for both frontend and backend, and builds the frontend for production
- `npm start`: Starts the production server



## Repository

- Issues: [https://github.com/Its-Shinde4241/Sr-Jr-connect/issues](https://github.com/Its-Shinde4241/Sr-Jr-connect/issues)
- Homepage: [https://github.com/Its-Shinde4241/Sr-Jr-connect#readme](https://github.com/Its-Shinde4241/Sr-Jr-connect#readme)

## License
This project is licensed under the ISC License.

## Contributors
- [Shubham Shinde](https://github.com/Its-Shinde4241)
- [Pushkar Takale](https://github.com/pushkar3872)
- [Varad Sane](https://github.com/Varad73)
- [Krisha Ukey](https://github.com/Krisha1803)

## 🙏 Thanks for Visiting 🙏
