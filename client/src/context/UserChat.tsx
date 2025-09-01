import { createContext, useContext, useState } from "react";

const UserChatContext = createContext<any>(undefined);


export const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [userSelected, setUserSelected] = useState<string | null>(null);
    return (
        <UserChatContext.Provider value={{ userSelected, setUserSelected }}>
            {children}
        </UserChatContext.Provider>
    )
}

export const useUserChat = () => {
    const context = useContext(UserChatContext);
    if (!context) {
        throw new Error("useUserChat must be used within a UserContext");
    }
    return context;
}