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
    <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
        <NavBar loggedInUser={loggedInUser} />
    </nav>
  )
}

export default NavBarContainer