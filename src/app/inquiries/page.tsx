import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {Model} from 'sequelize'
import {headers} from 'next/headers'
import {UserWithRole} from 'better-auth/plugins'
import authentication from '@/configuration/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import inquirySqlModel from '@/models/inquirySqlModel'
import listingSqlModel from '@/models/listingSqlModel'
import InquiryCard from '@/components/InquiryCard'
import Inquiry from '@/types/Inquiry'
import Listing from '@/types/Listing'
export const metadata: Metadata = {
  title: 'My Received Inquiries'
}
const InquiriesPage: FunctionComponent = async (): Promise<ReactElement> => {
  await connectToSqlDb()
  const inquiries: Inquiry[] = await inquirySqlModel.findAll({
    where: {
      recipientId: (await authentication.api.getSession({
        headers: await headers()
      }))!.user.id
    }
  }).then((inquiries: Model<Inquiry>[]): Promise<Inquiry[]> => Promise.all(inquiries.map(async (inquiry: Model<Inquiry>): Promise<Inquiry> => {
    const {
      email,
      name
    }: UserWithRole = await authentication.api.getUser({
      query: {
        id: inquiry.getDataValue('senderId')
      },
      headers: await headers()
    })
    return {
      ...inquiry.toJSON(),
      listingTitle: await listingSqlModel.findByPk(inquiry.getDataValue('listingId')).then((listing: Model<Listing> | null): string => listing!.getDataValue('title')),
      senderName: name,
      senderEmail: email
    }
  })))
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>
            My Received Inquiries
          </h1>
          <div className='space-y-4'>
            {inquiries.length === 0 ? (
              <p>
                You have not received any inquiries.
              </p>
            ) : (inquiries.map((inquiry: Inquiry): ReactElement => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
              />
            )))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default InquiriesPage