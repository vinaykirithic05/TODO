import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path='/task' element={<PrivateRoute><Tasks /></PrivateRoute>} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        {/* Global Toast Container */}
        <ToastContainer 
          position='top-right'
          autoClose={3000}
          theme='dark'
        />
    </div>
  )
}

export default App