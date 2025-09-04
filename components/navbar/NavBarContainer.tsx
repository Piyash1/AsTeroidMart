import React from 'react'
import NavBar from './Navbar'
import { auth } from '@/auth'


const NavBarContainer = async () => {
  const session = await auth()

  const loggedInUser = session?.user
    ? {
        name: session.user.name ?? '',
        email: session.user.email ?? '',
        image: session.user.image ?? ''
      }
    : undefined

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 w-full shadow-sm">
        <NavBar loggedInUser={loggedInUser} />
    </nav>
  )
}

export default NavBarContainer