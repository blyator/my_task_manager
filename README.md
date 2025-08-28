# My Task Manager

## Overview

This is a full-stack web application for managing tasks. It consists of a Django backend and a React frontend.

## Features

- Create, read, update and delete tasks
- Pagination

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm
- pipenv

## Backend Setup (Django)

1. **Navigate to the backend folder:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   pipenv install
   # Or use pip:
   pip install -r requirements.txt
   ```
3. **Apply migrations:**
   ```sh
   python manage.py migrate
   ```
4. **Seed the database (optional):**
   ```sh
   python manage.py seed
   ```
5. **Run the development server:**
   ```sh
   python manage.py runserver
   ```
6. **API Endpoints:**
   - Main API: `http://localhost:8000/api/tasks/`

## Frontend Setup

1. **Navigate to the frontend folder:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. **Access the app:**
   - Open `http://localhost:5173` in your browser.

## Usage

1. **Start the backend server**.
2. **Open the frontend URL**.
3. **Create, edit and delete tasks**.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## Live Demo

- [My Task Manager](https://my-task-manager-peach.vercel.app/)

## License

See `LICENSE` for details.

## Support

For support, questions or feedback, open an issue or contact the developer:

@ dmnbilly@gmail.com

---
