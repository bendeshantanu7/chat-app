import { createFileRoute } from '@tanstack/react-router'
import Login from '../components/Login'

export const Route = createFileRoute('/')({
  component: Login,
})

function Index() {
  return (
    <Login />
  )
}