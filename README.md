# 🎭 Carnival AI Bot - ChatGPT Clone  

Carnival AI Bot is a ChatGPT-like AI chatbot built using the MERN stack and integrated with the Gemini API for intelligent responses. This project offers a seamless and interactive chat experience with a user-friendly UI and real-time messaging.  

## 🚀 Features  
- 📝 **AI-Powered Chat** - Uses the Gemini API for intelligent conversations  
- 🎨 **Modern UI** - Styled with Tailwind CSS  
- 📡 **Real-Time Communication** - WebSocket-based instant messaging  
- 🔐 **User Authentication** - Secure login and signup  
- 📂 **Chat History** - Save and retrieve past conversations  
- 🌐 **MERN Stack** - Full-stack implementation with MongoDB, Express.js, React, and Node.js  

## 🛠️ Technologies Used  
- **Frontend**: React.js, Tailwind CSS, Vite  
- **Backend**: Node.js, Express.js, MongoDB  
- **State Management**: Redux Toolkit  
- **Authentication**: JWT (JSON Web Token)  
- **API Integration**: Gemini API  
- **Database**: MongoDB (Mongoose ODM)  

## 📦 Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/muralikrishna1729/carnival-ai-bot.git
cd carnival-ai-bot
```
## Install Dependencies
### 2️⃣ Install Dependencies
```
cd backend
npm install
```
Create a .env file in the backend directory and add the following:

ini
Copy
Edit

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend Server 
```
npm run dev
```
### Frontend Setup
```
cd ../client
npm install
npm run dev
```

### 3️⃣ Run the Application
Make sure both the frontend and backend are running in separate terminals.

-Backend runs on: http://localhost:5000
-Frontend runs on: http://localhost:5173

## 📌 Project Structure
```
carnival-ai-bot
│── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── index.js
│   ├── .env
│   └── package.json
│── client
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── routes
│   │   ├── lib
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.jsx
│   ├── public
│   ├── vite.config.js
│   ├── package.json
│   ├── .eslintrc.cjs
│   └── README.md

```
## 🚀 Future Improvements
-🔥 Multi-language support
-🎙️ Voice input & text-to-speech
-📱 Mobile-responsive UI
-🛠️ AI fine-tuning for better responses


