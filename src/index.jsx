import React from 'react'
import ReactDOM from 'react-dom/client'
import Designers from './designers'
import Admin from './admin/admin'
import Login from './login'
import NotFound from './NotFound'
import Loading from './loading'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		 <Router>
    	<Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/" element={<Designers/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
	</>
)