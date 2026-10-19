import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Model} from 'sequelize'
import listingSqlModel from '@/models/listingSqlModel'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import FeaturedListingCard from '@/components/FeaturedListingCard'
const FeaturedListings: FunctionComponent = async (): Promise<ReactElement | null> => {
  await connectToSqlDb()
  const featuredListings: Listing[] = await listingSqlModel.findAll({
    where: {
      isFeatured: true
    }
  }).then((results: Model<Listing>[]): Listing[] => results.map((result: Model<Listing>): Listing => result.toJSON()))
  return featuredListings.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Listings
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {featuredListings.map((listing: Listing): ReactElement => (
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