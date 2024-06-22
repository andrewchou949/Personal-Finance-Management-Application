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
    pip install -r requirements.txt

3. Framework to be used:
    Django is primarily being used as a fullstack framework
    Postgresql is the main database for the project

4. Set up frontend
    ```bash
    cd frontend
    npm install

5. Configure environment variables for the backend:
	• The environment variables will be loaded with the dotenv package

6. Apply Database migration:
    ```bash
    cd backend
    python manage.py makemigrations
    python manage.py migrate

7. Start the development servers:
    ```bash
    Backend:
        python manage.py runserver
    Frontend:
        cd frontend
        npm start

8. Open your browser and navigate to:
    • Backend: http://127.0.0.1:8000/
	• Frontend: http://localhost:3000/