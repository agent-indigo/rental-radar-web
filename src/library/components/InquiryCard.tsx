import {
  FunctionComponent,
  ReactElement
} from 'react'
import Link from 'next/link'
import DeleteInquiryButton from './DeleteInquiryButton'
import ToggleInquiryReadButton from './ToggleInquiryReadButton'
import ComponentInquiry from '@/types/ComponentInquiry'
import Inquiry from '@/types/Inquiry'
const InquiryCard: FunctionComponent<ComponentInquiry> = ({inquiry}): ReactElement => {
  const {
    id,
    listingId,
    listingTitle,
    senderName,
    senderEmail,
    senderPhone,
    body,
    isRead,
    createdAt
  }: Inquiry = inquiry
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <Link
          href={`/listings/${listingId}`}
          className='text-blue-500'
        >
          {listingTitle}
        </Link>
      </h2>
      {body && (
        <p className='text-gray-700'>
          {body}
        </p>
      )}
      <ul className='mt-4'>
        <li>
          {senderName}
        </li>
        <li>
          <a
            href={`mailto:${senderEmail}`}
            className='text-blue-500'
          >
            {senderEmail}
          </a>
        </li>
        {senderPhone && (
          <li>
            <a
              href={`tel:${senderPhone}`}
              className='text-blue-500'
            >
              {senderPhone}
            </a>
          </li>
        )}
        <li>
          {new Date(createdAt!).toLocaleString()}
        </li>
      </ul>
      <ToggleInquiryReadButton
        id={id!}
        isRead={isRead}
      />
      <DeleteInquiryButton id={id!}/>
    </div>
  )
}
export default InquiryCard