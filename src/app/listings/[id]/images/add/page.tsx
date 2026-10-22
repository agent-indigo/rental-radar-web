import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {Model} from 'sequelize'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import AddImagesForm from '@/components/AddImagesForm'
import Listing from '@/types/Listing'
export const metadata: Metadata = {
  title: 'Add Images'
}
const AddImagesPage: FunctionComponent<any> = async ({params}): Promise<ReactElement> => {
  await connectToSqlDb()
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <AddImagesForm listing={await listingSqlModel.findByPk((await params).id).then((result: Model<Listing> | null): Listing => result!.toJSON())}/>
        </div>
      </div>
    </section>
  )
}
export default AddImagesPage