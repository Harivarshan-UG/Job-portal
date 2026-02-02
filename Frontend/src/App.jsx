import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import JoblistPage from './JoblistPage'
import ApplyPage from './ApplyPage'
import ApplicationsPage from './ApplicationsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/joblist" element={<JoblistPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
