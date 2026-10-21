import {
  FunctionComponent,
  ReactElement
} from 'react'
import Link from 'next/link'
import {Model} from 'sequelize'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import Listing from '@/types/Listing'
import listingSqlModel from '@/models/listingSqlModel'
import ImageUrl from '@/types/ImageUrl'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import ListingCard from './ListingCard'
const HomePageListings: FunctionComponent = async (): Promise<ReactElement> => {
  await connectToSqlDb()
  const homePageListings: Listing[] = await listingSqlModel.findAll({
    order: [[
      'createdAt',
      'DESC'
    ]],
    limit: 3
  }).then((results: Model<Listing>[]): Listing[] => results.map((result: Model<Listing>): Listing => result.toJSON()))
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Listings
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {homePageListings.length === 0 ? (
              <p>
                No listings currently available.
              </p>
            ) : homePageListings.map(async (listing: Listing): Promise<ReactElement> => {
              const {id}: Listing = listing
              return (
                <ListingCard
                  key={id}
                  listing={{
                    ...listing,
                    imageUrls: await imageUrlSqlModel.findAll({
                      where: {
                        listingId: id
                      }
                    }).then((results: Model<ImageUrl>[]): string[] => results.map((result: Model<ImageUrl>): string => result.getDataValue('imageUrl')))
                  }}
                />
              )
            })}
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