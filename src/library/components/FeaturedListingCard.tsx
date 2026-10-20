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
const FeaturedListingCard: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
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
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={imageUrls![0]}
        alt=''
        width={0}
        height={0}
        sizes='100vw'
        className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>
          {title}
        </h3>
        <div className='text-gray-600 mb-4'>
          {type}
        </div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ${getRateDisplay(listing)}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline-block mr-2'/>
            {beds}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-2'/>
            {baths}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-2'/>
            {sqft}
            <span className='md:hidden lg:inline'> sqft</span>
          </p>
        </div>
        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p>
            <FaMoneyBill className='inline-block mr-2'/>
            {nightlyRate && `$${nightlyRate.toLocaleString()} Nightly${weeklyRate && ' '}`}
            {weeklyRate && `$${weeklyRate.toLocaleString()} Weekly${monthlyRate && ' '}`}
            {monthlyRate && `$${monthlyRate.toLocaleString()} Monthly`}
          </p>
        </div>
        <div className='border border-gray-200 mb-5'/>
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-lg text-orange-700'/>
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
export default FeaturedListingCard