import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function BaseLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default BaseLayout
