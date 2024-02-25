import { useState } from 'react'
import { createContext } from 'react'
const userProgressContext = createContext({
    progress: '',//'cart',''checkout'
    showCart: () => { },
    hideCart: () => { },
    showCheckOut: () => { },
    hideCheckOut: () => { },
})

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('')
    function showCart() {
        setUserProgress('cart')
    }
    function hideCart() {
        setUserProgress('')

    }
    function showCheckOut() {
        setUserProgress('checkout')
    }
    function hideCheckOut() {
        setUserProgress('')

    }
    const userProgressContextValue = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut

    }
    return <userProgressContext.Provider value={userProgressContextValue}>{children}</userProgressContext.Provider>
}
export default userProgressContext;