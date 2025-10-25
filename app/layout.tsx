import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'


export const metadata = {
title: 'Sandeep Thatikonda | Portfolio',
description: 'Apple-level cinematic portfolio in red & black with animations.',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="body-bg min-h-screen flex flex-col">
<SmoothScrollProvider>
<Navbar />
<main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
<Footer />
</SmoothScrollProvider>
</body>
</html>
)
}