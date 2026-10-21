import Image from 'next/image'
import Link from 'next/link'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  FaBath,
  FaBed,
  FaMapMarker,
  FaMoneyBill,
  FaRulerCombined
} from 'react-icons/fa'
import getRateDisplay from '@/utilities/getRateDisplay'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const ListingCard: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const {
    id,
    title,
    type,
    city,
    state,
    beds,
    baths,
    sqft,
    nightlyRate,
    weeklyRate,
    monthlyRate,
    imageUrls
  }: Listing = listing
  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={imageUrls![0]}
        alt=''
        height={0}
        width={0}
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>
            {type}
          </div>
          <h3 className='text-xl font-bold'>
            {title}
          </h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ${getRateDisplay(listing)}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-2'/>
            {beds}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-2'/>
            {baths}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2'/>
            {sqft}
            <span className='md:hidden lg:inline'> sqft</span>
          </p>
        </div>
        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
            <p>
              <FaMoneyBill className='inline mr-2'/>
              {nightlyRate && `$${nightlyRate.toLocaleString()}/night${weeklyRate && ' '}`}
              {weeklyRate && `$${weeklyRate.toLocaleString()}/week${monthlyRate && ' '}`}
              {monthlyRate && `$${monthlyRate.toLocaleString()}/month`}
            </p>
        </div>
        <div className='border border-gray-100 mb-5'/>
        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-orange-700 mt-1'/>
            <span className='text-orange-700'>
              {city}, {state}
            </span>
          </div>
          <Link
            href={`/listings/${id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ListingCard