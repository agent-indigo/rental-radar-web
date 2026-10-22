'use client'
import {
  FunctionComponent,
  ReactElement,
  useState
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useSelector} from 'react-redux'
import logo from '@/assets/images/logo-white.png'
import profileDefault from '@/assets/images/profile.png'
import UnreadInquiriesCountDisplay from '@/components/UnreadInquiriesCountDisplay'
import SignInButton from '@/components/SignInButton'
import authenticationClient from '@/utilities/authenticationClient'
import ContextProps from '@/types/ContextProps'
import User from '@/types/User'
const Navigation: FunctionComponent = (): ReactElement => {
  const user: User | undefined = useSelector((state: ContextProps): User | undefined => state.user.details)
  const [
    mobileMenuIsOpen,
    setMobileMenuIsOpen
  ] = useState<boolean>(false)
  const [
    profileMenuIsOpen,
    setProfileMenuIsOpen
  ] = useState<boolean>(false)
  const pathname: string = usePathname()
  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            {/* mobile menu button */}
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={(): void => setMobileMenuIsOpen((previousValue: boolean): boolean => !previousValue)}
            >
              <span className='absolute -inset-0.5'/>
              <span className='sr-only'>
                Open Main Menu
              </span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* logo */}
            <Link
              href='/'
              className='flex flex-shrink-0 items-center'
            >
              <Image
                className='h-10 w-auto'
                src={logo}
                alt='Rental Radar'
              />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                Rental Radar
              </span>
            </Link>
            {/* desktop menu (hidden on smaller-than-md screens) */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <Link
                  href='/'
                  className={`${pathname === '/' ? 'bg-black' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href='/listings?page=1'
                  className={`${pathname === '/listings' ? 'bg-black' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Listings
                </Link>
                {user && (
                  <Link
                    href='/listings/new'
                    className={`${pathname === '/listings/add' ? 'bg-black' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Submit Listing
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* user menu */}
          {user ? (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              {/* logged in */}
              <Link
                href='/inquiries'
                className='relative group'
              >
                <button
                  type='button'
                  className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5'/>
                  <span className='sr-only'>
                    Inquiries
                  </span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>
                <UnreadInquiriesCountDisplay unreadInquiriesCount={user?.unreadInquiriesCount}/>
              </Link>
              {/* profile dropdown button */}
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={():void => setProfileMenuIsOpen((previousValue: boolean): boolean => !previousValue)}
                  >
                    <span className='absolute -inset-1.5'/>
                    <span className='sr-only'>
                      Open User Menu
                    </span>
                    <Image
                      className='h-8 w-8 rounded-full'
                      src={user.image ?? profileDefault}
                      alt=''
                      width={40}
                      height={40}
                    />
                  </button>
                </div>
                {/* profile dropdown */}
                {profileMenuIsOpen && (
                  <div
                    id='user-menu'
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}
                  >
                    <Link
                      href='/listings/my'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-0'
                      onClick={(): void => setProfileMenuIsOpen(false)}
                    >
                      My Listings
                    </Link>
                    <Link
                      href='/listings/bookmarked'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-2'
                      onClick={(): void => setProfileMenuIsOpen(false)}
                    >
                      Bookmarked Listings
                    </Link>
                    <Link
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-2'
                      onClick={async (): Promise<void> => {
                        setProfileMenuIsOpen(false)
                        await authenticationClient.signOut()
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='hidden md:block md:ml-6'>
              {/* logged out */}
              <div className='flex items-center'>
                <SignInButton/>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* mobile menu, show/hide based on menu state */}
      {mobileMenuIsOpen && (
        <div id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <Link
              href='/'
              className={`${pathname === '/' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Home
            </Link>
            <Link
              href='/listings?page=1'
              className={`${pathname === '/listings' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Listings
            </Link>
            {user ? (
              <Link
                href='/listings/add'
                className={`${pathname === '/listings/new' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Submit Listing
              </Link>
            ) : (
              <SignInButton/>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navigation