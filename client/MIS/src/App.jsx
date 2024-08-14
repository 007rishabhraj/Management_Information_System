// import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Signup from './components/SignupPage/Signup'
import Profile from './components/Profile/Profile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/'element={<Profile/>}/>
        <Route path='login'element={<LoginPage/>}/>
        <Route path='signup'element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App
