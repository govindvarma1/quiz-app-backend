## Quiz Application Backend

This backend application, built using Node.js and Express.js, powers a robust quiz platform. It offers comprehensive features for managing user authentication, quizzes, and result retrieval.

## Table of Contents

  * [Features](#features)
  * [Technologies Used](#technologies-used)
  * [Getting Started](#getting-started)
      * Prerequisites
      * Installation
  * [API Endpoints](#api-endpoints)
      * Authentication Routes
      * Quiz Routes
  * [Folder Structure](https://www.google.com/url?sa=E&source=gmail&q=#folder-structure)
  * [Middleware](#middleware)
  * [Error Handling](#error-handling)
  * [Testing](https://www.google.com/url?sa=E&source=gmail&q=#testing)
  * [Security](https://www.google.com/url?sa=E&source=gmail&q=#security)
  * [Deployment](https://www.google.com/url?sa=E&source=gmail&q=#deployment)
  * [Contributing](#contributing)
  * [License](#license)

## Features

  * User registration and login
  * Create, retrieve, and take quizzes
  * Fetch user results and specific attempt results

## Technologies Used

  - Node.js: JavaScript runtime environment for server-side execution
  - Express.js: Web framework for building robust APIs efficiently
  - MongoDB: Flexible NoSQL database for storing quiz data (with Mongoose for ORM)
  - JWT (JSON Web Tokens): Secure mechanism for user authentication
  - Bcrypt: Secure password hashing for user protection

## Getting Started

### Prerequisites

Before diving in, ensure you have the following installed on your system:

  - Node.js and npm (or yarn) package manager
  - MongoDB database

### Installation

1.  Clone the repository:

```bash
git clone https://github.com/goindvarma1/quiz-app-backend.git
```

2.  Navigate to the project directory:

```bash
cd quiz-app-backend
```

3.  Install dependencies:

```bash
npm install
```

4.  Create a `.env` file in the root directory and add environment variables:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_secret_key
```

  - **PORT**: Specify the port number on which the server listens for requests (default: 3000)
  - **MONGO\_URL**: Connection string for your MongoDB database
  - **JWT\_SECRET**: A strong secret key used for generating and verifying JWT tokens

5.  Start the server:

```bash
node index.js
```

## API Endpoints

### Authentication Routes

  - **POST** `/auth/login`: Authenticate a user with username and password.

      - Request Body: `{ "username": "string", "password": "string" }`
      - Response Body: `{ "token": "string" }` (JWT token for authorized access)

  - **POST** `/auth/register`: Register a new user with username and password.

      - Request Body: `{ "username": "string", "password": "string" }`
      - Response Body: `{ "message": "User registered successfully" }`

### Quiz Routes

  - **POST** `/quiz/createQuiz` (requires authentication): Create a new quiz.

      - Request Body: `{ "title": "string", "questions": [{ "text": "string", "options": ["string", "string", ...], "correctAnswer": "integer" }] }`
      - Response Body: `{ "quizId": "string" }` (ID of the newly created quiz)

  - **GET** `/quiz/getQuizzes`: Retrieve all available quizzes.

      - Response Body: `[{ "quizId": "string", "title": "string", "createdAt": "string" }, ...]` (List of quiz objects)

  - **GET** `/quiz/getQuiz/:id`: Retrieve a specific quiz by its ID.

      - Response Body: `{ "quizId": "string", "title": "string", "questions": [{ ... }], "createdAt": "string" }` (Detailed information of the requested quiz)

  - **POST** `/quiz/takeQuiz/:quizId` (requires authentication): Submit a quiz attempt.

      - Request Body: `{ "answers": [{ "questionId": "string", "answer": "string" }] }` (User's answers for each question)
      - Response Body: \`{ "score": "number", "correctAnswers": "number", "totalQuestions": "number" }`

## Folder Structure
```
quiz-app-backend/
│
├── controllers/               # Controllers for handling requests and responses
│   ├── authController.js      # Controller for authentication-related logic
│   └── quizController.js      # Controller for quiz-related logic
│
├── middlewares/               # Middleware functions for request processing
│   ├── authMiddleware.js      # Middleware for token verification
│   └── validateQuiz.js        # Middleware for quiz validation
│
├── models/                    # Mongoose models for MongoDB collections
│   ├── User.js                # User model
│   └── Quiz.js                # Quiz model
│   └── Result.js              # Result model
│
├── routes/                    # Express route definitions
│   ├── authRoutes.js          # Routes for authentication
│   └── quizRoutes.js          # Routes for quiz management
│   └── routes.js              # Main routes file (optional)
│
├── utils/                     # Utility functions and helpers
│   └── formatResults.js       # Utility for formatting quiz results
│
├── config/                    # Configuration files
│   └── db.js                  # Database connection setup
│
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── index.js                   # Main entry point for the application
└── LICENSE                    # License file
```

## Middleware

  - **verifyToken**: Middleware to verify JWT tokens for protected routes.
  - **validateQuiz**: Middleware to validate quiz data before creating a new quiz.

## Error Handling

The application includes centralized error handling to manage and return meaningful error messages for different scenarios, such as invalid inputs or unauthorized access.

## Contributing

Contributions are welcome\! Please fork the repository and submit a pull request for any changes or enhancements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

**Additional Information:**

* **Deployment:** The application is currently hosted at `https://quiz-app-backend-ckxm.onrender.com/`.
* **Demo User:** Anyone can use the following credentials to test the application:

    - **Username:** demouser@gmail.com
    - **Password:** 12345678

