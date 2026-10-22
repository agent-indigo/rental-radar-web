import {
  FunctionComponent,
  ReactElement
} from 'react'
import {headers} from 'next/headers'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import FeaturedListingCard from '@/components/FeaturedListingCard'
import authentication from '@/configuration/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Amenity from '@/types/Amenity'
import Listing from '@/types/Listing'
import ImageUrl from '@/types/ImageUrl'
const FeaturedListings: FunctionComponent = async (): Promise<ReactElement | null> => {
  await connectToSqlDb()
  const listings: Listing[] = await listingSqlModel.findAll({
    where: {
      isFeatured: true
    }
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
  return listings.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Listings
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {listings.length === 0 ? (
            <p>
              No listings are currently designated as featured.
            </p>
          ) : listings.map((listing: Listing): ReactElement => (
            <FeaturedListingCard
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      </div>
    </section>
  ) : null
}
export default FeaturedListings