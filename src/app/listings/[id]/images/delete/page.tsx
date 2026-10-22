import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {Model} from 'sequelize'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import DeleteImagesForm from '@/components/DeleteImagesForm'
import Listing from '@/types/Listing'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'Delete Images'
}
const DeleteImagesPage: FunctionComponent<any> = async ({params}): Promise<ReactElement> => {
  const {id} = await params
  await connectToSqlDb()
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <DeleteImagesForm listing={{
            ...(await listingSqlModel.findByPk(id).then((listing: Model<Listing> | null): Listing => listing!.toJSON())),
            imageUrls: await imageUrlSqlModel.findAll({
              where: {
                listingId: id
              }
            }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
          }}/>
        </div>
      </div>
    </section>
  )
}
export default DeleteImagesPage