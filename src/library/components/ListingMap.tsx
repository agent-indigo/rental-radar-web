'use client'
import {
  FunctionComponent,
  ReactElement,
} from 'react'
import {toast} from 'react-toastify'
import {
  GoogleMap,
  LoadScript,
  Marker
} from '@react-google-maps/api'
import {LatLngLiteral} from '@googlemaps/google-maps-services-js'
import Spinner from '@/components/Spinner'
import ComponentListing from '@/types/ComponentListing'
import {useGeolocateListingQuery} from '@/redux/slices/listingsApiSlice'
import Listing from '@/types/Listing'
const ListingMap: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const {id}: Listing = listing
  const {
    data,
    isFetching,
    error
  } = useGeolocateListingQuery(id!)
  if (error) toast.error(error.toString())
  const {
    lat,
    lng
  }: LatLngLiteral = data
  return isFetching ? (
    <Spinner loading={isFetching}/>
  ) : error ? (
    <h1 className='text-red-500 text-center font-bold'>
      Error geolocating property.
    </h1>
  ) : (
    <LoadScript googleMapsApiKey={process.env.PUBLIC_GOOGLE_MAPS_JS_API_KEY ?? ''}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: 500
        }}
        center={{
          lat,
          lng
        }}
        zoom={15}
      >
        <Marker position={{
          lat,
          lng
        }}/>
      </GoogleMap>
    </LoadScript>
  )
}
export default ListingMap