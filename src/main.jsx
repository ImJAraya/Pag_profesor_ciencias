import ReactDOM from 'react-dom/client'
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Layout from './layout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
)
