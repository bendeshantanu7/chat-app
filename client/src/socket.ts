import { io } from "socket.io-client"

const socket = io("http://localhost:3000", {
  autoConnect: false, // prevents multiple auto connections
})

export default socket;