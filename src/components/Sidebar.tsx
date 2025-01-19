import { Link, useLocation } from 'react-router-dom'
import {
  ChartBarIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  PuzzlePieceIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Campaigns', href: '/', icon: ArrowTrendingUpIcon },
  { name: 'Flows', href: '/', icon: PuzzlePieceIcon },
  { name: 'Integrations', href: '/', icon: PuzzlePieceIcon },
  { name: 'Customers', href: '/', icon: UsersIcon },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/', icon: Cog6ToothIcon },
  { name: 'Team', href: '/', icon: UserGroupIcon },
]

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex gap-1 items-center h-16 flex-shrink-0 px-4  border-b">
          <ChevronLeftIcon className="w-4 h-4 text-gray-400" />
            
            <span className="text-xl font-semibold">Salesway</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto ">
  
          
          <div className="px-3 pt-4">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50"
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.name}
                </a>
              );
            })}
          </div>

      
          <div className="px-6 pt-4 pb-2">
            <p className="text-xs font-medium text-gray-400">MENU</p>
          </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive(item.href)
                        ? 'bg-white text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 flex-shrink-0 h-6 w-6
                        ${isActive(item.href)
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Tom Wang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}