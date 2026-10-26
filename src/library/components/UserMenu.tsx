'use client'
import defaultUserImage from '@/assets/images/profile.png'
import ComponentImageUrl from '@/types/ComponentImageUrl'
import authenticationClient from '@/utilities/authenticationClient'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useState
} from 'react'
const UserMenu: FunctionComponent<ComponentImageUrl> = ({imageUrl}): ReactElement => {
  const router: AppRouterInstance = useRouter()
  const [
    userMenuIsOpen,
    setUserMenuIsOpen
  ] = useState<boolean>(false)
  return (
    <>
      <div>
        <button
          type='button'
          className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          id='user-menu-button'
          aria-expanded='false'
          aria-haspopup='true'
          onClick={(event: MouseEvent):void => {
            event.preventDefault()
            setUserMenuIsOpen((previousValue: boolean): boolean => !previousValue)
          }}
        >
          <span className='absolute -inset-1.5'/>
          <span className='sr-only'>
            User Menu
          </span>
          <Image
            className='h-8 w-8 rounded-full'
            src={imageUrl === '' ? defaultUserImage : imageUrl}
            alt=''
            width={40}
            height={40}
          />
        </button>
      </div>
      {/* profile dropdown */}
      {userMenuIsOpen && (
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
            onClick={(event: MouseEvent): void => {
              event.preventDefault()
              setUserMenuIsOpen(false)
            }}
          >
            My Listings
          </Link>
          <Link
            href='/listings/bookmarked'
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'
            tabIndex={-1}
            id='user-menu-item-2'
            onClick={(event :MouseEvent): void => {
              event.preventDefault()
              setUserMenuIsOpen(false)
            }}
          >
            Bookmarked Listings
          </Link>
          <Link
            href='#'
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'
            tabIndex={-1}
            id='user-menu-item-2'
            onClick={async (event: MouseEvent): Promise<void> => {
              event.preventDefault()
              setUserMenuIsOpen(false)
              await authenticationClient.signOut()
              router.push('/')
            }}
          >
            Sign Out
          </Link>
        </div>
      )}
    </>
  )
}
export default UserMenu