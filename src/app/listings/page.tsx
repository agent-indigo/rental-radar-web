import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {headers} from 'next/headers'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import FeaturedListings from '@/components/FeaturedListings'
import SearchListingsForm from '@/components/SearchListingsForm'
import Listings from '@/components/Listings'
import authentication from '@/configuration/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Listing from '@/types/Listing'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'All Listings'
}
const ListingsPage: FunctionComponent<any> = async ({searchParams}): Promise<ReactElement> => {
  const {
    page = 1,
    size = 6
  } = await searchParams
  await connectToSqlDb()
  const listings: Listing[] = await listingSqlModel.findAll({
    offset: (parseInt(page.toString() ?? '1') - 1) * size,
    limit: size
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
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <SearchListingsForm/>
        </div>
      </section>
      <FeaturedListings/>
      <Listings
        listings={listings}
        total={await listingSqlModel.count()}
        page={page}
        size={size}
      />
    </>
  )
}
export default ListingsPage