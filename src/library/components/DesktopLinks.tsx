'use client'
import NavMenuProps from '@/types/NavMenuProps'
import Link from 'next/link'
import {
  usePathname
} from 'next/navigation'
import {
  FunctionComponent,
  ReactElement
} from 'react'
const DesktopLinks: FunctionComponent<NavMenuProps> = ({userIsSignedIn}): ReactElement => {
  const pathname: string = usePathname()
  return (
    <>
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
      {userIsSignedIn && (
        <Link
          href='/listings/new'
          className={`${pathname === '/listings/add' ? 'bg-black' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Submit Listing
        </Link>
      )}
    </>
  )
}
export default DesktopLinks