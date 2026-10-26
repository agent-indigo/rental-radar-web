'use client'
import SignInButton from '@/components/SignInButton'
import NavMenuProps from '@/types/NavMenuProps'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useState
} from 'react'
const MobileMenu: FunctionComponent<NavMenuProps> = ({userIsSignedIn}): ReactElement => {
  const pathname: string = usePathname()
  const [
    mobileMenuIsOpen,
    setMobileMenuIsOpen
  ] = useState<boolean>(false)
  return (
    <>
      <button
        type='button'
        id='mobile-dropdown-button'
        className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
        aria-controls='mobile-menu'
        aria-expanded='false'
        onClick={(event: MouseEvent): void => {
          event.preventDefault()
          setMobileMenuIsOpen((previousValue: boolean): boolean => !previousValue)}
        }
      >
        <span className='absolute -inset-0.5'/>
        <span className='sr-only'>
          Main Menu
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
      {mobileMenuIsOpen && (
        <div
          id='mobile-menu'
          className='absolute right-0 top-full z-50 mt-2 w-48'
        >
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
            {userIsSignedIn ? (
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
    </>
  )
}
export default MobileMenu