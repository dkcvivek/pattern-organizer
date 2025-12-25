import React from 'react'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}
