import { Main_footer, Main_Header } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UsersLayout = () => {
  return (
    <>
      <Main_Header />
      <main className="main">
        <Outlet />
      </main>
      <Main_footer />
    </>
  )
}

export default UsersLayout
