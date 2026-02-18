import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeList from './components/EmployeeList'
import CreateEmployee from './components/CreateEmployee'
import Header from './components/Header'
import UpdateEmployee from './components/UpdateEmployee'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<EmployeeList />}></Route>
          <Route path='/employees' element={<EmployeeList />}></Route>
          <Route path='/add-employee' element={<CreateEmployee />}></Route>
          <Route path='/update-employee/:id' element={<UpdateEmployee />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
