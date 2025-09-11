import { useEffect, useState } from "react";
import { ChatInput } from "./styles/ChatStyles";
import useDebounce from "./hooks/useDebounce";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm, 500)
    
    useEffect(() => {
        if(debouncedValue) {
            searchUser()
        }
    },[debouncedValue])

    const searchUser = () => {
        console.log('searchTerm', searchTerm)
    }

    return (
        <ChatInput placeholder="Search" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
    )
}

export default SearchBar;