import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import Link from 'next/link'
import {headers} from 'next/headers'
import {
  Model,
  Op
} from 'sequelize'
import {FaArrowCircleLeft} from 'react-icons/fa'
import {UserWithRole} from 'better-auth/plugins'
import SearchListingsForm from '@/components/SearchListingsForm'
import ListingCard from '@/components/ListingCard'
import FeaturedListings from '@/components/FeaturedListings'
import Paginator from '@/components/Paginator'
import authentication from '@/connectors/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Listing from '@/types/Listing'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'Search Results'
}
const SearchResultsPage: FunctionComponent<any> = async ({searchParams}): Promise<ReactElement> => {
  const {
    keywords,
    type = 'All',
    page = 1,
    size = 6
  } = await searchParams
  await connectToSqlDb()
  const normalizedKeywords: string = typeof keywords === 'string' ? keywords.trim() : ''
  const results: Listing[] = await listingSqlModel.findAll({
    where: {
      ...(type === 'All' ? {} : {type}),
      ...(normalizedKeywords ? {
        [Op.or]: [
          {title: {[Op.iLike]: `%${normalizedKeywords}%`}},
          {description: {[Op.iLike]: `%${normalizedKeywords}%`}},
          {city: {[Op.iLike]: `%${normalizedKeywords}%`}},
          {state: {[Op.iLike]: `%${normalizedKeywords}%`}}
        ]
      } : {})
    }
  }).then((results: Model<Listing>[]): Promise<Listing[]> => Promise.all(results.map(async (result: Model<Listing>): Promise<Listing> => {
    const listingId: string | undefined = result.getDataValue('id')
    const {
      name: ownerName,
      email: ownerEmail
    }: UserWithRole = await authentication.api.getUser({
      query: {
        id: result.getDataValue('ownerId')
      },
      headers: await headers()
    })
    return {
      ...result.toJSON(),
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
  })))
  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <SearchListingsForm/>
        </div>
      </section>
      <FeaturedListings/>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/listings?page=1'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowCircleLeft className='mr-2 mb-1'/>
            Back to All Listings
          </Link>
          <h1 className='text-2xl mb-4'>
            Search Results
          </h1>
          {results.length === 0 ? (
            <p>
              No results.
            </p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {results.map((listing: Listing): ReactElement => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                />
              ))}
            </div>
          )}
          <Paginator
            page={page}
            size={size}
            total={results.length}
            fromSearch={true}
          />
        </div>
      </section>
    </>
  )
}
export default SearchResultsPage