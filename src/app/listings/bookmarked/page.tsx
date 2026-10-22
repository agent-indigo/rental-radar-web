import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {headers} from 'next/headers'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import ListingCard from '@/components/ListingCard'
import BookmarkButton from '@/components/BookmarkButton'
import authentication from '@/configuration/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import bookmarkSqlModel from '@/models/bookmarkSqlModel'
import Listing from '@/types/Listing'
import Amenity from '@/types/Amenity'
import Bookmark from '@/types/Bookmark'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'My Bookmarks'
}
const MyBookmarksPage: FunctionComponent = async (): Promise<ReactElement> => {
  await connectToSqlDb()
  const myBookmarks: Listing[] = await bookmarkSqlModel.findAll({
    where: {
      userId: (await authentication.api.getSession({
        headers: await headers()
      }))!.user.id
    }
  }).then((bookmarks: Model<Bookmark>[]): Promise<Listing[]> => Promise.all(bookmarks.map(async (bookmark: Model<Bookmark>): Promise<Listing> => {
    const listing: Model<Listing> | null = await listingSqlModel.findByPk(bookmark.getDataValue('listingId'))
    const id: string | undefined = listing?.getDataValue('id')
    const {
      name,
      email
    }: UserWithRole = await authentication.api.getUser({
      query: {
        id: listing!.getDataValue('ownerId')
      },
      headers: await headers()
    })
    return {
      ...listing!.toJSON(),
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
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>
          My Bookmarked Listings
        </h1>
        {myBookmarks.length === 0 ? (
          <p>
            You have not bookmarked any listings.
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {myBookmarks.map((listing: Listing): ReactElement => (
              <div key={listing.id}>
                <ListingCard listing={listing}/>
                <div className='my-2'/>
                <BookmarkButton listing={listing}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
export default MyBookmarksPage