import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate, useRouteError } from 'react-router-dom'

const ErrorPage = (): JSX.Element => {
  const navigate = useNavigate()
  const error = useRouteError() as {
    status?: 403 | 404 | 500
    statusText?: string
    message?: string
  }
  console.error(error)

  return (
    <Result
      status={error.status || 'warning'}
      title={error.status}
      subTitle={error.statusText || error.message}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  )
}

export default ErrorPage
