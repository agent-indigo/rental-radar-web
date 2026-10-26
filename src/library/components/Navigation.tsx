import {
  FunctionComponent,
  ReactElement,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {headers} from 'next/headers'
import logo from '@/assets/images/logo-white.png'
import authentication from '@/connectors/authentication'
import UnreadInquiriesCountDisplay from '@/components/UnreadInquiriesCountDisplay'
import SignInButton from '@/components/SignInButton'
import MobileMenu from '@/components/MobileMenu'
import DesktopLinks from '@/components/DesktopLinks'
import UserMenu from '@/components/UserMenu'
const Navigation: FunctionComponent = async (): Promise<ReactElement> => {
  const session = await authentication.api.getSession({
    headers: await headers()
  })
  const userIsSignedIn: boolean = session !== null
  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <div className='relative'>
              <MobileMenu userIsSignedIn={userIsSignedIn}/>
            </div>
          </div>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <Link
              href='/'
              className='flex shrink-0 items-center'
            >
              <Image
                className='h-10 w-auto'
                src={logo}
                alt='Rental Radar'
                loading='eager'
              />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                Rental Radar
              </span>
            </Link>
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <DesktopLinks userIsSignedIn={userIsSignedIn}/>
              </div>
            </div>
          </div>
          {session ? (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
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
                <UnreadInquiriesCountDisplay id={session.user.id}/>
              </Link>
              <div className='relative ml-3'>
                <UserMenu imageUrl={session.user.image ?? ''}/>
              </div>
            </div>
          ) : (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                <SignInButton/>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navigation