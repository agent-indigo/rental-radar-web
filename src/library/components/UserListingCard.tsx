import {
  FunctionComponent,
  ReactElement
} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DeleteListingButton from './DeleteListingButton'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const ProfileListingCard: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const {
    id,
    title,
    street,
    city,
    state,
    imageUrls
  }: Listing = listing
  return (
    <div className='mb-10'>
      <Link href={`/listings/${id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={imageUrls![0]}
          alt=''
          width={500}
          height={100}
          priority={true}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>
          {title}
        </p>
        <p className='text-gray-600'>
          Address: {street}, {city}, {state}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`/listings/${id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <Link
          href={`/listings/${id}/images/add`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Add images
        </Link>
        <Link
          href={`/listings/${id}/images/delete`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Delete images
        </Link>
        <DeleteListingButton id={id!}/>
      </div>
    </div>
  )
}
export default ProfileListingCard