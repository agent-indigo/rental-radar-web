import {
  FunctionComponent,
  ReactElement
} from 'react'
import Image from 'next/image'
import {Metadata} from 'next'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import defaultProfileImage from '@/assets/images/profile.png'
import authentication from '@/configuration/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import UserListingCard from '@/components/UserListingCard'
import Listing from '@/types/Listing'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'My Listings'
}
const MyListingsPage: FunctionComponent = async (): Promise<ReactElement> => {
  const me: UserWithRole = await authentication.api.getUser()
  await connectToSqlDb()
  const myListings: Listing[] = await listingSqlModel.findAll({
    where: {
      ownerId: me.id
    }
  }).then((results: Model<Listing>[]): Promise<Listing[]> => Promise.all(results.map(async (result: Model<Listing>): Promise<Listing> => {
    const listing: Listing = result.toJSON()
    return {
      ...listing,
      imageUrls: await imageUrlSqlModel.findAll({
        where: {
          listingId: listing.id
        }
      }).then((imageUrls: Model<ImageUrl>[]): string[] => imageUrls.map((imageUrl: Model<ImageUrl>): string => imageUrl.getDataValue('imageUrl')))
    }
  })))
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>
            My Profile
          </h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  alt='User'
                  height={200}
                  width={200}
                  src={me?.image ?? defaultProfileImage}
                />
              </div>
              <h2 className='text-2xl mb-4'>
                {me?.name}
              </h2>
              <h2 className='text-2xl mb-4'>
                {me?.email}
              </h2>
            </div>
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>
                My Listings
              </h2>
              {myListings.length === 0 ? (
                <p>
                  You have not listed any of your own rental properties.
                </p>
              ) : (
                <section>
                  {myListings.map((listing: Listing): ReactElement => (
                    <UserListingCard
                      key={listing.id}
                      listing={listing}
                    />
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default MyListingsPage