import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Wallet from './pages/Wallet'
import ViewTask from './pages/ViewTask'
import ViewAllTask from './pages/ViewAllTask'
import UpdateTask from './pages/UpdateTask'
import DeleteTask from './pages/DeleteTask'
import CreateTask from './pages/CreateTask'
import './App.css'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Wallet /> },
    { path: "/create-task", element: <CreateTask /> },
    { path: "/delete-task", element: <DeleteTask /> },
    { path: "/update-task", element: <UpdateTask /> },
    { path: "/view-all-task", element: <ViewAllTask /> },
    { path: "/view-task", element: <ViewTask /> }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
