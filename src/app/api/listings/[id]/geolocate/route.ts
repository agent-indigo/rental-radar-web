import error404response from '@/httpResponses/error404response'
import error500response from '@/httpResponses/error500response'
import success200response from '@/httpResponses/success200response'
import listingSqlModel from '@/models/listingSqlModel'
import Listing from '@/types/Listing'
import connectToSqlDb from '@/utilities/connectToSqlDb'
import {
  Client,
  GeocodeResponse,
  GeocodeResponseData
} from '@googlemaps/google-maps-services-js'
import {NextResponse} from 'next/server'
import {Model} from 'sequelize'
export const GET = async ({params}: any): Promise<NextResponse> => {
  try {
    await connectToSqlDb()
    const listing: Model<Listing> | null = await listingSqlModel.findByPk((await params).id)
    if (listing) {
      const {
        street,
        city,
        state,
        zip
      }: Listing = listing.toJSON()
      const response: GeocodeResponse = await new Client().geocode({
        params: {
          address: `${street} ${city} ${state} ${zip} USA`,
          key: process.env.PRIVATE_GOOGLE_MAPS_GEOCODING_API_KEY ?? ''
        }
      })
      const {
        data,
        status
      }: GeocodeResponse = response
      const {
        error_message,
        results
      }: GeocodeResponseData = data
      return status === 200 ? success200response(results[0].geometry.location) : error500response(new Error(error_message))
    } else {
      return error404response
    }
  } catch(error: any) {
    return error500response(error)
  }
}