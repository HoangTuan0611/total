import React from 'react'
import Navbar from './commponents/Navbar/Navbar'
import Sidebar from './commponents/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'

import List from './commponents/pages/List/List'
import Orders from './commponents/pages/Orders/Order'
import Add from './commponents/pages/Add/Add'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/order" element={<Orders/>}/>
        </Routes>
      </div>

    </div>
  )
}

export default App
