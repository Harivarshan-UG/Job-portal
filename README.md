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
- [Authentication System Overview](#authentication-system-overview)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 User Authentication & Security
- **User Registration**: 
  - Secure account creation with email validation
  - Password confirmation (minimum 8 characters)
  - Automatic password hashing with Django's PBKDF2
- **JWT Token-Based Login**: 
  - Secure authentication with JSON Web Tokens (JWT)
  - Access tokens (valid for 1 day) and refresh tokens (valid for 7 days)
  - Tokens stored securely in browser localStorage
  - No CSRF vulnerabilities (tokens sent in Authorization headers)
- **User Logout**: 
  - Client-side token removal
  - Automatic redirect to landing page
- **Protected Routes**: 
  - Authentication required for job listings and applications
  - Automatic redirect to login for unauthenticated users
  - Loading states during authentication checks
- **Centralized Auth State**: 
  - React Context API for global authentication state
  - Automatic token validation on app load
  - Bearer token authentication for all API requests

### 💼 Job Management
- **Browse Jobs**: View all available job listings
- **Job Details**: Comprehensive information including:
  - Job title and full description
  - Company name and location
  - Salary range
  - Posted date
  - Benefits and perks
  - Required skills and tags
- **Apply for Jobs**: 
  - One-click application submission
  - Duplicate application prevention
  - Real-time application status updates

### 📊 Application Tracking
- **View Applications**: See all submitted job applications
- **Application Status**: Track application progress with statuses:
  - 🟡 Pending - Application under review
  - 🔵 Shortlisted - Selected for next round
  - 🟢 Accepted - Job offer received
  - 🔴 Rejected - Application declined
- **Application History**: View application dates and job details

### 🎨 User Interface
- **Landing Page**: Modern, animated homepage with features showcase
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **User-friendly Navigation**: 
  - Navbar with username display and avatar
  - Quick access to jobs, applications, and logout
- **Premium Aesthetics**: 
  - Gradient backgrounds and glassmorphism effects
  - Smooth animations and transitions
  - Interactive hover effects

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 6.0.1
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL
- **CORS**: django-cors-headers
- **Authentication**: 
  - JWT (JSON Web Tokens) - djangorestframework-simplejwt 5.5.1
  - PyJWT 2.11.0 for token generation and validation
  - PBKDF2 password hashing (260,000 iterations)
  - Token-based API authentication
  - Session authentication (for Django admin panel only)

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.13.0
- **State Management**: React Context API (Authentication)
- **Styling**: Tailwind CSS 4.1.18
- **HTTP Client**: Fetch API with Bearer token authentication
- **Authentication**: 
  - JWT token storage in localStorage
  - Protected Routes with automatic redirects
  - Automatic token validation
  - Bearer token in Authorization headers

## 📁 Project Structure

```
Job portal/
├── Backend/
│   ├── Backend/
│   │   ├── __init__.py
│   │   ├── settings.py          # Django settings (CORS, sessions)
│   │   ├── urls.py               # URL routing (auth endpoints)
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   ├── models.py             # Database models (Job, Application)
│   │   ├── views.py              # API views (auth, jobs, applications)
│   │   ├── serializers.py        # DRF serializers (enhanced registration)
│   │   ├── admin.py              # Django admin configuration
│   │   └── migrations/           # Database migrations
│   ├── manage.py
│   └── db.sqlite3
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app with AuthProvider & routing
│   │   ├── AuthContext.jsx       # Authentication context & state
│   │   ├── ProtectedRoute.jsx    # Route protection component
│   │   ├── LandingPage.jsx       # Homepage
│   │   ├── RegisterPage.jsx      # User registration (with password confirm)
│   │   ├── LoginPage.jsx         # User login (session-based)
│   │   ├── JoblistPage.jsx       # Job listings (protected)
│   │   ├── ApplyPage.jsx         # Job application form (protected)
│   │   ├── ApplicationsPage.jsx  # User's applications (protected)
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


### Backend Dependencies

```bash
cd Backend
pip install django djangorestframework django-cors-headers psycopg2-binary djangorestframework-simplejwt python-decouple
```

**Packages installed:**
- `django` - Web framework
- `djangorestframework` - REST API framework
- `django-cors-headers` - CORS support
- `psycopg2-binary` - PostgreSQL adapter
- `djangorestframework-simplejwt` - JWT authentication
- `python-decouple` - Environment variable management

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

### 🔒 Security Configuration (IMPORTANT!)

**⚠️ Before deploying to production, you MUST configure environment variables for sensitive credentials!**

See **[SECURITY.md](SECURITY.md)** for detailed instructions on:
- Setting up environment variables (`.env` file)
- Securing database passwords and secret keys
- Production deployment checklist
- What to do if credentials are exposed

**Quick Setup:**
```bash
cd Backend
cp .env.example .env
# Edit .env with your actual credentials
```

### Backend Configuration

The application now uses environment variables for sensitive data. Edit `Backend/.env`:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database Settings
DB_NAME=jobportal_db
DB_USER=postgres
DB_PASSWORD=your-database-password
DB_HOST=localhost
DB_PORT=5432

# CORS Settings
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

**⚠️ NEVER commit the `.env` file to Git!** It's already in `.gitignore`.

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8000`. If you need to change this, update the API URLs in the component files.

## 🚀 Running the Application

### Start the Backend Server

**Option 1: Using the batch file (Recommended for Windows):**
```bash
cd Backend
.\run_server.bat
```

**Option 2: Using venv Python directly:**
```bash
# From the "Job portal" directory
.\venv\Scripts\python.exe .\Backend\manage.py runserver
```

**Option 3: Activate venv first:**
```bash
# Windows
.\venv\Scripts\activate
cd Backend
python manage.py runserver

# macOS/Linux
source venv/bin/activate
cd Backend
python manage.py runserver
```

The Django server will start at `http://localhost:8000`

> **⚠️ Important**: Always use the virtual environment Python to ensure JWT packages are available!

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

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register/` | Register a new user with email & password confirmation | No |
| POST | `/api/login/` | Login user and receive JWT tokens | No |
| POST | `/api/logout/` | Logout user (client-side token removal) | No |
| GET | `/api/user/` | Get current authenticated user info | Yes |

**Registration Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "password2": "securepass123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Login Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepass123"
}
```

**Login Response (Success):**
```json
{
  "message": "Login successful",
  "user_id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",  // Access token (1 day validity)
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."  // Refresh token (7 days validity)
}
```

### Jobs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs/` | Get all jobs | No |
| GET | `/api/jobs/{id}/` | Get specific job details | No |
| POST | `/api/jobs/` | Create a new job (admin) | Yes |

### Applications

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/applications/{user_id}/` | Get user's applications | Yes |
| POST | `/api/applications/` | Submit a job application | Yes |
| GET | `/api/applications/{id}/` | Get specific application | Yes |

**Apply Request Body:**
```json
{
  "job": 1,
  "applicant": 2
}
```

**Authentication Header (for protected endpoints):**
```http
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Example Authenticated Request:**
```javascript
fetch('http://127.0.0.1:8000/apply/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`  // JWT token from localStorage
    },
    body: JSON.stringify({
        job: 1,
        applicant: 2
    })
})
```

**Note:** All authenticated requests must include the JWT access token in the `Authorization` header with the `Bearer` prefix.

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
![Landing Page](screenshots/Landing-Page.png)

### Login Page
![Landing Page](screenshots/Login-Screen.png)

### Register Page
![Landing Page](screenshots/Register-Screen.png)

### Job Listings
![Job Listings](screenshots/Jobslist.png)

### Job Detail Listings
![Job Detail Listings](screenshots/Job-Detail.png)

### Application Tracking
![Applications](screenshots/Applied_Jobs.png)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Authentication & Security

**JWT Token-Based Authentication:**
- The app uses JWT (JSON Web Tokens) for stateless authentication
- Tokens are stored in browser localStorage
- All authenticated API calls must include `Authorization: Bearer <token>` header

**Frontend Authentication:**
```javascript
// Using AuthContext in components
import { useAuth } from './AuthContext';

function MyComponent() {
    const { user, login, logout } = useAuth();
    
    // Check authentication
    if (user) {
        console.log('Logged in as:', user.username);
    }
    
    // Access token
    const token = localStorage.getItem('access_token');
}
```

**Protected Routes:**
```javascript
// Wrap protected pages with ProtectedRoute
<Route 
    path="/joblist" 
    element={
        <ProtectedRoute>
            <JoblistPage />
        </ProtectedRoute>
    } 
/>
```

**Making Authenticated API Calls:**
```javascript
// Always include Bearer token for authenticated endpoints
const token = localStorage.getItem('access_token');

fetch('http://localhost:8000/api/endpoint/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // JWT token required!
    },
    body: JSON.stringify(data)
})
```

**Token Management:**
- Access tokens expire after 1 day
- Refresh tokens expire after 7 days
- Tokens are automatically validated on app load
- Invalid/expired tokens trigger automatic logout

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

## 🔧 Troubleshooting

### Authentication Issues

**Problem: "Authentication required" error when applying for jobs**

**Solution:**
1. Check if JWT tokens are stored in localStorage:
   - Open DevTools (F12) → Application → Local Storage
   - Look for `access_token` and `refresh_token`
   
2. Verify token is being sent in requests:
   - Open DevTools → Network tab
   - Check request headers for `Authorization: Bearer <token>`
   
3. Check if token has expired:
   - Tokens expire after 1 day (access) or 7 days (refresh)
   - Try logging out and logging back in

4. Ensure you're using the venv Python:
   ```bash
   # Use the batch file
   cd Backend
   .\run_server.bat
   ```

**Problem: "ModuleNotFoundError: No module named 'rest_framework_simplejwt'"**

**Solution:**
```bash
# Install in the virtual environment
.\venv\Scripts\pip install djangorestframework-simplejwt

# Then restart the server using venv Python
cd Backend
.\run_server.bat
```

**Problem: Login successful but user data not persisting**

**Solution:**
1. Check if tokens are being stored:
   ```javascript
   // In browser console
   console.log(localStorage.getItem('access_token'));
   ```

2. Clear localStorage and try again:
   ```javascript
   localStorage.clear();
   ```

### CORS Issues

**Problem: CORS errors in browser console**

**Solution:**
- Ensure frontend URL is in `CORS_ALLOWED_ORIGINS` in `settings.py`
- Check that both servers are running on correct ports

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

## 🔐 Authentication System Overview

### Architecture

The application uses a **JWT (JSON Web Token) based authentication system** combining Django REST Framework Simple JWT on the backend with React Context API on the frontend.

#### Backend (Django)
- **Token Generation**: djangorestframework-simplejwt generates access and refresh tokens
- **Token Storage**: Tokens are stateless and stored client-side
- **Password Security**: PBKDF2 algorithm with SHA256 hash (260,000 iterations)
- **Protected Endpoints**: `@permission_classes([IsAuthenticated])` decorator for API views
- **CORS Configuration**: Allows requests from specific origins
- **No CSRF Issues**: Tokens sent in headers, not cookies

#### Frontend (React)
- **AuthContext**: Centralized authentication state using React Context API
- **Token Storage**: JWT tokens stored in browser localStorage
- **ProtectedRoute**: Component that guards routes requiring authentication
- **Automatic Token Validation**: Validates token on app load and route changes
- **Bearer Authentication**: Tokens sent in `Authorization: Bearer <token>` header

### Authentication Flow

#### 1. Registration
```
User → RegisterPage → POST /register/ → Django validates → 
Password hashed → User created → Redirect to login
```

#### 2. Login
```
User → LoginPage → POST /login/ → Django authenticates → 
JWT tokens generated (access + refresh) → Tokens stored in localStorage → 
AuthContext updated → Redirect to /joblist
```

#### 3. Protected Route Access
```
User navigates → ProtectedRoute checks AuthContext → 
If no token → Redirect to /login
If token exists → GET /user/ with Bearer token → 
If token valid → Allow access
If token invalid → Clear tokens → Redirect to /login
```

#### 4. Logout
```
User clicks logout → Tokens removed from localStorage → 
AuthContext cleared → Redirect to home
```

### Security Features

✅ **Password Security**
- Minimum 8 characters required
- Password confirmation on registration
- PBKDF2 hashing with 260,000 iterations
- Salted hashes prevent rainbow table attacks

✅ **Token Security**
- Access tokens valid for 1 day
- Refresh tokens valid for 7 days
- Tokens are cryptographically signed
- Stateless authentication (no server-side storage)
- Token rotation on refresh

✅ **API Security**
- Protected endpoints require valid JWT token
- 401 Unauthorized responses for invalid/expired tokens
- CORS restricted to specific origins
- Bearer token authentication

✅ **Frontend Security**
- Protected routes with automatic redirects
- Tokens stored in localStorage (accessible only to same origin)
- Automatic token validation on app load
- Automatic logout on token expiry

### Key Components

**AuthContext.jsx**
- Provides: `user`, `loading`, `login()`, `logout()`, `register()`, `checkAuth()`
- Automatically checks token validity on mount
- Manages global authentication state
- Stores/retrieves tokens from localStorage

**ProtectedRoute.jsx**
- Wraps protected pages
- Shows loading spinner during auth check
- Redirects to `/login` if not authenticated

**Backend Authentication**
```python
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    # Only users with valid JWT token can access
    user = request.user
```

### Token Structure

**Access Token (JWT):**
```json
{
  "token_type": "access",
  "exp": 1738567890,  // Expiration timestamp
  "iat": 1738481490,  // Issued at timestamp
  "jti": "unique-token-id",
  "user_id": 1
}
```

**Refresh Token (JWT):**
```json
{
  "token_type": "refresh",
  "exp": 1739086290,  // Expiration timestamp (7 days)
  "iat": 1738481490,
  "jti": "unique-token-id",
  "user_id": 1
}
```

### Usage in Components

**Using AuthContext:**
```javascript
import { useAuth } from './AuthContext';

function MyComponent() {
    const { user, logout } = useAuth();
    
    return (
        <div>
            {user ? (
                <>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Please login</p>
            )}
        </div>
    );
}
```

**Making Authenticated API Calls:**
```javascript
const token = localStorage.getItem('access_token');

fetch('http://127.0.0.1:8000/api/endpoint/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // JWT token here!
    },
    body: JSON.stringify(data)
})
```

### Why JWT Over Sessions?

| Feature | JWT Tokens | Sessions |
|---------|-----------|----------|
| **Storage** | Client-side (localStorage) | Server-side (database/memory) |
| **Scalability** | Stateless, easy to scale | Stateful, harder to scale |
| **CSRF** | No CSRF vulnerabilities | Requires CSRF protection |
| **Mobile Apps** | Easy to implement | Difficult with cookies |
| **API-First** | Perfect for REST APIs | Better for traditional web apps |
| **Debugging** | Easy to inspect tokens | Harder to debug sessions |
| **Performance** | No database lookups | Requires session storage |

### Token Lifecycle

1. **Login**: User receives access token (1 day) + refresh token (7 days)
2. **API Requests**: Access token sent with each request
3. **Token Expiry**: After 1 day, access token expires
4. **Refresh**: Use refresh token to get new access token (not implemented yet)
5. **Logout**: Tokens removed from localStorage

-----*-----
