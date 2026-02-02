# 🚀 Job Portal

A full-stack job portal application built with Django REST Framework and React, enabling users to browse jobs, apply for positions, and track their applications.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Authentication
- **User Registration**: New users can create an account
- **User Login**: Secure authentication with session management
- **User Logout**: Clean session termination
- **Protected Routes**: Authenticated access to job listings and applications

### Job Management
- **Browse Jobs**: View all available job listings
- **Job Details**: Detailed information including:
  - Job title and description
  - Company name and location
  - Salary range
  - Posted date
- **Apply for Jobs**: Submit applications for open positions

### Application Tracking
- **View Applications**: See all submitted job applications
- **Application Status**: Track application progress with statuses:
  - Pending
  - Shortlisted
  - Accepted
  - Rejected

### User Interface
- **Landing Page**: Welcoming homepage with navigation
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **User-friendly Navigation**: Navbar with username display and logout option

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 6.0.1
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **CORS**: django-cors-headers
- **Authentication**: Django Session Authentication

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.13.0
- **Styling**: Tailwind CSS 4.1.18
- **HTTP Client**: Fetch API

## 📁 Project Structure

```
Job portal/
├── Backend/
│   ├── Backend/
│   │   ├── __init__.py
│   │   ├── settings.py          # Django settings
│   │   ├── urls.py               # URL routing
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   ├── models.py             # Database models (Job, Application)
│   │   ├── views.py              # API views
│   │   ├── serializers.py        # DRF serializers
│   │   ├── admin.py              # Django admin configuration
│   │   └── migrations/           # Database migrations
│   ├── manage.py
│   └── db.sqlite3
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── LandingPage.jsx       # Homepage
│   │   ├── RegisterPage.jsx      # User registration
│   │   ├── LoginPage.jsx         # User login
│   │   ├── JoblistPage.jsx       # Job listings
│   │   ├── ApplyPage.jsx         # Job application form
│   │   ├── ApplicationsPage.jsx  # User's applications
│   │   ├── App.css               # Global styles
│   │   └── main.jsx              # React entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── venv/                         # Python virtual environment
└── README.md                     # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python**: 3.10 or higher
- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **PostgreSQL**: 14.0 or higher
- **Git**: For version control

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Job portal"
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install Python Dependencies

```bash
cd Backend
pip install django djangorestframework django-cors-headers psycopg2-binary
```

#### Create PostgreSQL Database

```sql
-- Open PostgreSQL command line or pgAdmin
CREATE DATABASE jobportal_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE jobportal_db TO postgres;
```

#### Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

Edit `Backend/Backend/settings.py`:

```python
# Database Configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'jobportal_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',  # Change this
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# CSRF Settings
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8000`. If you need to change this, update the API URLs in the component files.

## 🚀 Running the Application

### Start the Backend Server

```bash
cd Backend
python manage.py runserver
```

The Django server will start at `http://localhost:8000`

### Start the Frontend Development Server

Open a new terminal:

```bash
cd Frontend
npm run dev
```

The React app will start at `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend Admin**: http://localhost:8000/admin
- **API**: http://localhost:8000/api/

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | Register a new user |
| POST | `/api/login/` | Login user |
| POST | `/api/logout/` | Logout user |
| GET | `/api/user/` | Get current user info |

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs/` | Get all jobs |
| GET | `/api/jobs/{id}/` | Get specific job details |
| POST | `/api/jobs/` | Create a new job (admin) |

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications/` | Get user's applications |
| POST | `/api/applications/` | Submit a job application |
| GET | `/api/applications/{id}/` | Get specific application |

## 🗄️ Database Schema

### User Model (Django Built-in)
- `id`: Primary Key
- `username`: String (unique)
- `email`: Email
- `password`: Hashed password
- `first_name`: String
- `last_name`: String

### Job Model
- `id`: Primary Key
- `title`: String (max 200 chars)
- `About`: Text (nullable)
- `description`: Text
- `salary_range`: String (max 20 chars)
- `company`: String (max 100 chars)
- `location`: String (max 100 chars)
- `posted_at`: DateTime (auto)
- `created_by`: ForeignKey → User

### Application Model
- `id`: Primary Key
- `applicant`: ForeignKey → User
- `job`: ForeignKey → Job
- `status`: Choice field (pending, shortlisted, rejected, accepted)
- `applied_at`: DateTime (auto)

## 📸 Screenshots

<!-- Add screenshots of your application here -->

### Landing Page
![Landing Page](screenshots/landing.png)

### Job Listings
![Job Listings](screenshots/jobs.png)

### Application Tracking
![Applications](screenshots/applications.png)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Adding New Features

1. **Backend**: Add models in `models.py`, create serializers in `serializers.py`, and add views in `views.py`
2. **Frontend**: Create new components in `src/` and add routes in `App.jsx`

### Common Commands

```bash
# Backend
python manage.py makemigrations  # Create migrations
python manage.py migrate         # Apply migrations
python manage.py createsuperuser # Create admin user
python manage.py runserver       # Start dev server

# Frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `settings.py`
- Check if the database exists

### CORS Errors
- Verify CORS settings in `settings.py`
- Ensure frontend URL is in `CORS_ALLOWED_ORIGINS`

### Port Already in Use
- Backend: Change port with `python manage.py runserver 8001`
- Frontend: Vite will automatically suggest an alternative port

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- Tailwind CSS
- Vite build tool

---

**Note**: Remember to update the database password and Django secret key before deploying to production. Never commit sensitive credentials to version control.
