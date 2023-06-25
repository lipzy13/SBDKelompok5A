import './globals.css'
import Provider from '@/context/AuthContext'
import ToasterContext from '@/context/ToasterContext'

export const metadata = {
  title: 'Niketcom',
  description: 'Pilihan utama cara nonton',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='relative'>
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
        </body>
    </html>
  )
}
