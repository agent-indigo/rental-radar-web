import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import SubmitListingForm from '@/components/SubmitListingForm'
export const metadata: Metadata = {
  title: 'New Listing'
}
const NewListingPage: FunctionComponent = (): ReactElement => (
  <section className='bg-blue-50'>
    <div className='container m-auto max-w-2xl py-24'>
      <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
        <SubmitListingForm/>
      </div>
    </div>
  </section>
)
export default NewListingPage