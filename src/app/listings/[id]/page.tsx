import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import {headers} from 'next/headers'
import {FaArrowLeft} from 'react-icons/fa'
import {Model} from 'sequelize'
import {UserWithRole} from 'better-auth/plugins'
import ListingHeaderImage from '@/components/ListingHeaderImage'
import ListingDetails from '@/components/ListingDetails'
import ListingImages from '@/components/ListingImages'
import BookmarkButton from '@/components/BookmarkButton'
import SubmitInquiryForm from '@/components/SubmitInquiryForm'
import ShareButtons from '@/components/ShareButtons'
import authentication from '@/connectors/authentication'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import listingSqlModel from '@/models/listingSqlModel'
import amenitySqlModel from '@/models/amenitySqlModel'
import imageUrlSqlModel from '@/models/imageUrlSqlModel'
import Listing from '@/types/Listing'
import Amenity from '@/types/Amenity'
import ImageUrl from '@/types/ImageUrl'
export const metadata: Metadata = {
  title: 'Listing Details'
}
const ListingDetailsPage: FunctionComponent<any> = async ({params}): Promise<ReactElement> => {
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
  }
  const {imageUrls} = listing
  return (
    <>
      <ListingHeaderImage imageUrl={imageUrls![0]}/>
      <section>
        <div className='container m-auto px-6 py-6'>
          <Link
            href='/listings?page=1'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2'/>
            Back to All Listings  
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <ListingDetails listing={listing}/>
            <aside className='space-y-4'>
              <BookmarkButton listing={listing}/>
              <h3 className='text-xl font-bold text-center pt-2'>
                Share
              </h3>
              <div className='flex gap-3 justify-center pb-5'>
                <ShareButtons listing={listing}/>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SubmitInquiryForm
                  listing={listing}
                  userId={(await authentication.api.getSession({
                    headers: await headers()
                  }))!.user.id}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          <ListingImages imageUrls={imageUrls!}/>
        </div>
      </section>
    </>
  )
}
export default ListingDetailsPage