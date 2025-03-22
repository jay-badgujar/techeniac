# Math Quiz Game - MongoDB, Express, React, Node.js

This project is a full-stack math quiz game. The application includes user registration, login authentication, and a quiz game with a timer and score tracking.

## Features
- User Registration with profile picture upload
- Email authentication for login
- A math quiz with random questions and answers
- A 30-second timer per question
- Tracks and displays user scores after 10 questions
- Stores user data in MongoDB

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Clone the Repository
```sh
git clone https://github.com/your-repo/math-quiz-game.git
cd math-quiz-game
```

---

## Backend Setup
1. Navigate to the `server` folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `server` folder and add:
   ```sh
   From .env.example
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

---

## Frontend Setup
1. Navigate to the `client` folder:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `client` folder and add:
   ```sh
   From .env.example
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

---

## Usage
1. **Register a new user** with first name, last name, email, birthdate, phone number, password, and profile picture.
2. **Log in** using the registered email and password.
3. **Start the game**, where you will be presented with 10 random math questions.
4. **Select an answer** before the timer runs out.
5. **View your score** after completing all 10 questions.
6. **Play again or log out.**

---
