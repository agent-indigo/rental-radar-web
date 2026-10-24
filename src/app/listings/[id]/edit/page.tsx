import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {
  notFound,
  unauthorized
} from 'next/navigation'
import {headers} from 'next/headers'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import EditListingForm from '@/components/EditListingForm'
import authentication from '@/connectors/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Listing from '@/types/Listing'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'Edit Listing'
}
const EditListingPage: FunctionComponent<any> = async ({params}): Promise<ReactElement> => {
  const {id: listingId} = await params
  await connectToSqlDb()
  const listing: Listing | null = await listingSqlModel.findByPk(listingId).then(async (listing: Model<Listing> | null): Promise<Listing | null> => {
    if (listing) {
      const {
        name: ownerName,
        email: ownerEmail
      }: UserWithRole = await authentication.api.getUser({
        query: {
          id: listing.getDataValue('ownerId')
        },
        headers: await headers()
      })
      return {
        ...listing.toJSON(),
        ownerName,
        ownerEmail,
        amenities: await amenitySqlModel.findAll({
          where: {
            listingId
          }
        }).then((amenities: Model<Amenity>[]): string[] => amenities.map((amenity: Model<Amenity>): string => amenity.getDataValue('amenity'))),
        imageUrls: await imageUrlSqlModel.findAll({
          where: {
            listingId
          }
        }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
      }
    } else {
      return null
    }
  })
  if (!listing) {
    notFound()
  } else if (listing.ownerId !== (await authentication.api.getSession({
    headers: await headers()
  }))?.user.id) {
    unauthorized()
  }
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <EditListingForm listing={listing}/>
        </div>
      </div>
    </section>
  )
}
export default EditListingPage