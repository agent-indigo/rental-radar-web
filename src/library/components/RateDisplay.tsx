import {
  FunctionComponent,
  ReactElement
} from 'react'
import {FaMoneyBill} from 'react-icons/fa'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const RateDisplay: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const {
    nightlyRate,
    weeklyRate,
    monthlyRate
  }: Listing = listing
  return (
    <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
      <p>
        <FaMoneyBill className='inline-block mr-2'/>
        {nightlyRate && `$${nightlyRate.toLocaleString()}/night${weeklyRate && ' '}`}
        {weeklyRate && `$${weeklyRate.toLocaleString()}/week${monthlyRate && ' '}`}
        {monthlyRate && `$${monthlyRate.toLocaleString()}/month`}
      </p>
    </div>
  )
}
export default RateDisplay