import React from 'react'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { RefreshPrompt } from '@app/common'

import Root from './routes/Root'
import ErrorPage from './routes/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />
  }
])

const App = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={router} />
      <RefreshPrompt />
    </>
  )
}

export default App
