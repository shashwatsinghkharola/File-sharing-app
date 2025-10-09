import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import FileView from './pages/FileView'
import Auth from './pages/Auth'
import './App.css'

export default function App(){
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="container">
          <Link to="/" className="logo">inShare</Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/auth">Login / Register</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/files/:uuid" element={<FileView/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

