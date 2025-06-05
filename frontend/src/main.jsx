import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import LeadList from './pages/LeadList.jsx'
import LeadDetails from './pages/LeadDetails.jsx'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import LeadForm from './pages/LeadForm.jsx'
import SalesAgentList from './pages/SalesAgentList.jsx'
import AgentForm from './pages/AgentForm.jsx'
import SalesAgent from './pages/SalesAgent.jsx'
import Status from './pages/Status.jsx'
import Reports from './pages/Reports.jsx'
import Setting from './pages/Setting.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App />
  },
  {
    path:"/leads",
    element:<LeadList />
  },
  {
    path:"/lead/:id",
    element:<LeadDetails />,
  },
  {
    path:"/lead/form",
    element:<LeadForm />
  },
  {
    path:"/sales-agent",
    element:<SalesAgentList />
  },
  {
    path:"/sales-agent/form",
    element:<AgentForm />
  },
  {
    path:"/sales-agent/:id",
    element:<SalesAgent />
  },
  {
    path:"/status",
    element:<Status />
  },
  {
    path:"/reports",
    element:<Reports />
  },
  {
    path:"/settings",
    element:<Setting />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
