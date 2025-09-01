import { createFileRoute } from '@tanstack/react-router'
import Chat from '../components/Chat'
import WithAuth from '../components/hoc/WithAuth'

export const Route = createFileRoute('/chats')({
  component: WithAuth(Chat),
})