"use client"

import { api } from "@/lib/api";
import { generateRandomString } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextProps{
    cartCode: string | null
    cartItemsCount: number
    clearCartCode: () => void
    setCartItemsCount: React.Dispatch<React.SetStateAction<number>>
    refreshCartStats: () => Promise<void>
}

const CartContext = createContext<CartContextProps | null>(null)

export function CartProvider({children}: {children: React.ReactNode}) {

    const [cartCode, setCartCode] = useState<string | null>(null)
    const [cartItemsCount, setCartItemsCount] = useState(0)

    const refreshCartStats = async () => {
        if (!cartCode) return;
        
        try {
            const response = await api.get(`get_cart_stat/?cart_code=${cartCode}`)
            if (response && response.data && typeof response.data.num_of_items === 'number') {
                setCartItemsCount(Math.max(0, response.data.num_of_items))
            } else {
                setCartItemsCount(0)
            }
        } catch (err: unknown) {
            // Handle 404 errors silently (expected after payment)
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as any;
                if (axiosError.response?.status === 404) {
                    // Silently handle 404 - this is expected after successful payment
                    setCartItemsCount(0)
                    return;
                }
            }
            // Only log non-404 errors
            console.error('Error refreshing cart stats:', err)
            setCartItemsCount(0)
        }
    }

    useEffect(() => {
        if (cartCode) {
            refreshCartStats()
        }
    }, [cartCode])

    useEffect(() => {
        let code = localStorage.getItem('cartCode')
        if(!code){
            code = generateRandomString()
            localStorage.setItem('cartCode', code)
        }
        setCartCode(code)
    }, [])

    function clearCartCode() {
        localStorage.removeItem('cartCode')
        setCartCode(null)
        setCartItemsCount(0)
    }

    return (
        <CartContext.Provider 
        value={{cartCode, cartItemsCount, clearCartCode, setCartItemsCount, refreshCartStats}}
        >
            {children}

        </CartContext.Provider>
    )

}

export function useCart(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}