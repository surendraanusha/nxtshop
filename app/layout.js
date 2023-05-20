import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
// import Header from '../components/Header'
import Header from '../components/Header/page'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>  
      {children}
    </body>
    </html>
  )
}
