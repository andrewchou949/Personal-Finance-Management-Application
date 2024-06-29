# Personal Finance Management Application with Fraud Detection

## Overview
This project is a personal finance management application that helps users track their expenses and detect fraudulent transactions using machine learning.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features
- User authentication and profile management
- Expense tracking and categorization
- Data visualization for financial insights
- Machine learning-based fraud detection alerts

## Installation

### Prerequisites
- Python
- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/andrewchou949/Personal-Finance-Management-Application.git
    cd personal-finance-management
    ```
2. Set up a virtual environment and install dependencies:
    ```bash
    python -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

3. Framework to be used:
   - Django is primarily being used as a fullstack framework
   - PostgreSQL is the main database for the project

4. Set up the frontend:
    ```bash
    cd frontend
    npm install
    ```

5. Configure environment variables for the backend:
    - The environment variables will be loaded with the dotenv package

6. Apply database migrations:
    ```bash
    cd backend
    python manage.py makemigrations
    python manage.py migrate
    ```

## Usage
1. Start the development servers:
    - Backend:
        ```bash
        python manage.py runserver
        ```
    - Frontend:
        ```bash
        cd frontend
        npm start
        ```

2. Open your browser and navigate to:
    - Backend: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
    - Frontend: [http://localhost:3000/](http://localhost:3000/)
    Make sure the two localhost port are unoccupied!
    - Show what process is using the port:
        ```bash
        lsof -i :8000
        lsof -i :3000
        ```
    - Kill the process to free the port:
        ```bash
        kill process PID
        ```
        **Make sure to change PID to your process ID**

## Project Structure
```plaintext
Personal-Finance-Management-Application
├── backend                      # Django backend + endpoint
│   ├── manage.py                # Django management script for backend endpoint hosting
│   ├── ...                      # Other backend files
├── frontend                     # React frontend UI
│   ├── package.json             # Node.js package configuration
│   ├── ...                      # Other frontend files
├── .gitignore                   # Git ignore file
├── README.md                    # Project readme
├── requirements.txt             # Python dependencies
```

### Components
- **backend/**: Contains the Django backend application.
- **frontend/**: Contains the React frontend application.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.