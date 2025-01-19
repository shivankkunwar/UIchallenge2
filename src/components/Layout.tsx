import { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 h-screen overflow-auto">
        <main className="h-full px-2">
          {children}
        </main>
      </div>
    </div>
  )
}

