# Personal Finance Management Application with Fraud Detection

## Overview
This project is a personal finance management application that helps users track their expenses and detect fraudulent transactions using machine learning.

## Features
- User authentication and profile management
- Expense tracking and categorization
- Data visualization for financial insights
- Machine learning-based fraud detection alerts

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/andrewchou949/Personal-Finance-Management-Application.git
   cd personal-finance-management

2. Set up a virtual environment and install dependencies:
    ```bash
    python -m venv env
    source env/bin/activate
    pip install -r backend/requirements.txt

3. Set up frontend
    ```bash
    cd frontend
    npm install

4. Configure environment variables for the backend:

5. Apply Database migration:
    ```bash
    cd backend
    python manage.py makemigrations
    python manage.py migrate

6. Start the development servers:
    ```bash
    Backend:
        python manage.py runserver
    Frontend:
        cd frontend
        npm start

7. Access the application at http://localhost:3000 for the frontend and http://localhost:8000 for the backend API.

8. 
