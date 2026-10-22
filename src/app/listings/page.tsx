import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {Model} from 'sequelize'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Listings from '@/components/Listings'
import FeaturedListings from '@/components/FeaturedListings'
import SearchListingsForm from '@/components/SearchListingsForm'
import Listing from '@/types/Listing'
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
  }).then((results: Model<Listing>[]): Promise<Listing[]> => Promise.all(results.map(async (result: Model<Listing>): Promise<Listing> => ({
    ...result.toJSON(),
    imageUrls: await imageUrlSqlModel.findAll({
      where: {
        listingId: result.getDataValue('id')
      }
    }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
  }))))
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