import { useEffect, useState } from "react"
import socket from "../../socket"

const useRecentChatSocket = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        socket.connect()

        socket.on('recentChatUpdate',(data) => {
            console.log(data)
            setData(data)
        })

        return () => {
            socket.off("receive_message");
            socket.disconnect();
        };

    },[])

    return data
}

export default useRecentChatSocket