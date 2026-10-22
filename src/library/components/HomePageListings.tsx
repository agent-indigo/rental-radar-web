import {
  FunctionComponent,
  ReactElement
} from 'react'
import Link from 'next/link'
import {headers} from 'next/headers'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import ListingCard from '@/components/ListingCard'
import authentication from '@/configuration/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Listing from '@/types/Listing'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
const HomePageListings: FunctionComponent = async (): Promise<ReactElement> => {
  await connectToSqlDb()
  const listings: Listing[] = await listingSqlModel.findAll({
    order: [[
      'createdAt',
      'DESC'
    ]],
    limit: 3
  }).then((listings: Model<Listing>[]): Promise<Listing[]> => Promise.all(listings.map(async (listing: Model<Listing>): Promise<Listing> => {
      const id: string | undefined = listing.getDataValue('id')
      const {
        name,
        email
      }: UserWithRole = await authentication.api.getUser({
        query: {
          id: listing.getDataValue('ownerId')
        },
        headers: await headers()
      })
      return {
        ...listing.toJSON(),
        ownerName: name,
        ownerEmail: email,
        amenities: await amenitySqlModel.findAll({
          where: {
            listingId: id
          }
        }).then((amenities: Model<Amenity>[]): string[] => amenities.map((amenity: Model<Amenity>): string => amenity.getDataValue('amenity'))),
        imageUrls: await imageUrlSqlModel.findAll({
          where: {
            listingId: id
          }
        }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
      }
    })))
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Listings
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {listings.length === 0 ? (
              <p>
                No listings currently available.
              </p>
            ) : listings.map((listing: Listing): ReactElement => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        </div>
      </section>
      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/listings'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View all Listings
        </Link>
      </section>
    </>
  )
}
export default HomePageListings