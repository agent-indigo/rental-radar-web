import inquirySqlModel from '@/models/inquirySqlModel'
import Id from '@/types/Id'
import {
  FunctionComponent,
  ReactElement
} from 'react'
const UnreadInquiriesCountDisplay: FunctionComponent<Id> = async ({id}): Promise<ReactElement | null> => {
  const unreadInquiriesCount: number = await inquirySqlModel.count({
    where: {
      recipientId: id,
      isRead: false
    }
  })
  return unreadInquiriesCount > 0 ? (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadInquiriesCount}
    </span>
  ) : null
}
export default UnreadInquiriesCountDisplay