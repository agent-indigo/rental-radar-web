'use client'
import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  ReactElement,
  useState
} from 'react'
import {useRouter} from 'next/navigation'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {toast} from 'react-toastify'
import SubmitButton from '@/components/SubmitButton'
import {useEditListingMutation} from '@/redux/slices/listingsApiSlice'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const EditListingForm: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const {id}: Listing = listing
  const [
    title,
    setTitle
  ] = useState<string>(listing.title)
  const [
    type,
    setType
  ] = useState<string>(listing.type)
  const [
    description,
    setDescription
  ] = useState<string>(listing.description)
  const [
    street,
    setStreet
  ] = useState<string>(listing.street)
  const [
    city,
    setCity
  ] = useState<string>(listing.city)
  const [
    state,
    setState
  ] = useState<string>(listing.state)
  const [
    zip,
    setZip
  ] = useState<string>(listing.zip)
  const [
    beds,
    setBeds
  ] = useState<number>(listing.beds)
  const [
    baths,
    setBaths
  ] = useState<number>(listing.baths)
  const [
    sqft,
    setSqft
  ] = useState<number>(listing.sqft)
  const [
    amenities,
    setAmenities
  ] = useState<string[]>(listing.amenities!)
  const [
    nightlyRate,
    setNightlyRate
  ] = useState<number | undefined>(listing.nightlyRate)
  const [
    weeklyRate,
    setWeeklyRate
  ] = useState<number | undefined>(listing.weeklyRate)
  const [
    monthlyRate,
    setMonthlyRate
  ] = useState<number | undefined>(listing.monthlyRate)
  const [
    ownerPhone,
    setOwnerPhone
  ] = useState<string | undefined>(listing.ownerPhone)
  const router: AppRouterInstance = useRouter()
  const [editListing] = useEditListingMutation()
  const handleCheckbox: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setAmenities((amenities: string[]): string[] => event.target.checked ? [
      ...amenities,
      event.target.value
    ] : amenities.filter((amenity: string): boolean => amenity !== event.target.value))
  }
  return (
    <form action={async (): Promise<void> => {
      const changes: Partial<Listing> = {}
      if (title !== listing.title) changes.title = title
      if (type !== listing.type) changes.type = type
      if (description !== listing.description) changes.description = description
      if (street !== listing.street) changes.street = street
      if (city !== listing.city) changes.city = city
      if (state !== listing.state) changes.state = state
      if (zip !== listing.zip) changes.zip = zip
      if (beds !== listing.beds) changes.beds = beds
      if (baths !== listing.baths) changes.baths = baths
      if (sqft !== listing.sqft) changes.sqft = sqft
      if (nightlyRate !== listing.nightlyRate) changes.nightlyRate = nightlyRate
      if (weeklyRate !== listing.weeklyRate) changes.weeklyRate = weeklyRate
      if (monthlyRate !== listing.monthlyRate) changes.monthlyRate = monthlyRate
      const {error} = await editListing({
        id,
        body: {
          ...changes,
          amenities: amenities.length !== listing.amenities?.length || amenities.some((
            amenity: string,
            index: number
          ): boolean => amenity !== listing.amenities?.[index]) ? amenities : undefined
        }
      })
      if (error) {
        toast.error(error.toString())
      } else {
        toast.success('Changes saved.')
        router.push(`/listings/${id}`)
      }
    }}>
      <h2 className='text-3xl text-center font-semibold mb-6'>
        Edit Listing
      </h2>
      <div className='mb-4'>
        <label
          htmlFor='type'
          className='block text-gray-700 font-bold mb-2'
        >
          Type
        </label>
        <select
          id='type'
          name='type'
          className='border rounded w-full py-2 px-3'
          required
          defaultValue={type}
          onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
            event.preventDefault()
            setType(event.target.value)
          }}
        >
          <option defaultValue='Apartment'>
            Apartment
          </option>
          <option defaultValue='Condo'>
            Condo
          </option>
          <option defaultValue='House'>
            House
          </option>
          <option defaultValue='Cabin Or Cottage'>
            Cabin or Cottage
          </option>
          <option defaultValue='Room'>
            Room
          </option>
          <option defaultValue='Studio'>
            Studio
          </option>
          <option defaultValue='Other'>
            Other
          </option>
        </select>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='title'
          className='block text-gray-700 font-bold mb-2'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          className='border rounded w-full py-2 px-3 mb-2'
          required
          defaultValue={title}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            event.preventDefault()
            setTitle(event.target.value)
          }}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          className='border rounded w-full py-2 px-3'
          rows={4}
          required
          defaultValue={description}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
            event.preventDefault()
            setDescription(event.target.value)
          }}
        />
      </div>
      <div className='mb-4 bg-blue-50 p-4'>
        <label
          htmlFor='location'
          className='block text-gray-700 font-bold mb-2'
        >
          Location
        </label>
        <input
          type='text'
          id='street'
          name='street'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Street'
          required
          defaultValue={street}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            event.preventDefault()
            setStreet(event.target.value)
          }}
        />
        <input
          type='text'
          id='city'
          name='city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          required
          defaultValue={city}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            event.preventDefault()
            setCity(event.target.value)
          }}
        />
        <input
          type='text'
          id='state'
          name='state'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='State'
          required
          defaultValue={state}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            event.preventDefault()
            setState(event.target.value)
          }}
        />
        <input
          type='text'
          id='zip'
          name='zip'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Zip Code'
          required
          defaultValue={zip}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            event.preventDefault()
            setZip(event.target.value)
          }}
        />
      </div>
      <div className='mb-4 flex flex-wrap'>
        <div className='w-full sm:w-1/3 pr-2'>
          <label
            htmlFor='beds'
            className='block text-gray-700 font-bold mb-2'
          >
            Beds
          </label>
          <input
            type='number'
            id='beds'
            name='beds'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={beds}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              event.preventDefault()
              setBeds(parseInt(event.target.value))
            }}
          />
        </div>
        <div className='w-full sm:w-1/3 px-2'>
          <label
            htmlFor='baths'
            className='block text-gray-700 font-bold mb-2'
          >
            Baths
          </label>
          <input
            type='number'
            id='baths'
            name='baths'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={baths}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              event.preventDefault()
              setBaths(parseFloat(event.target.value))
            }}
          />
        </div>
        <div className='w-full sm:w-1/3 pl-2'>
          <label
            htmlFor='sqft'
            className='block text-gray-700 font-bold mb-2'
          >
            Square Feet
          </label>
          <input
            type='number'
            id='sqft'
            name='sqft'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={sqft}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              event.preventDefault()
              setSqft(parseFloat(event.target.value))
            }}
          />
        </div>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='amenities'
          className='block text-gray-700 font-bold mb-2'
        >
          Amenities
        </label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div>
            <input
              type='checkbox'
              id='amenity_wifi'
              name='amenities'
              defaultValue='Wi-Fi'
              className='mr-2'
              defaultChecked={amenities.includes('Wi-Fi')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_wifi'>
              Wi-Fi
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_kitchen'
              name='amenities'
              defaultValue='Full Kitchen'
              className='mr-2'
              defaultChecked={amenities.includes('Full Kitchen')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_kitchen'>
              Full kitchen
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_washer_dryer'
              name='amenities'
              defaultValue='Washer & Dryer'
              className='mr-2'
              defaultChecked={amenities.includes('Washer & Dryer')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_washer_dryer'>
              Washer & Dryer
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_free_parking'
              name='amenities'
              defaultValue='Free Parking'
              className='mr-2'
              defaultChecked={amenities.includes('Free Parking')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_free_parking'>
              Free Parking
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_pool'
              name='amenities'
              defaultValue='Swimming Pool'
              className='mr-2'
              defaultChecked={amenities.includes('Swimming Pool')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_pool'>
              Swimming Pool
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_hot_tub'
              name='amenities'
              defaultValue='Hot Tub'
              className='mr-2'
              defaultChecked={amenities.includes('Hot Tub')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_hot_tub'>
              Hot Tub
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_24_7_security'
              name='amenities'
              defaultValue='24/7 Security'
              className='mr-2'
              defaultChecked={amenities.includes('24/7 Security')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_24_7_security'>
              24/7 Security
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_wheelchair_accessible'
              name='amenities'
              defaultValue='Wheelchair Accessible'
              className='mr-2'
              defaultChecked={amenities.includes('Wheelchair Accessible')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_wheelchair_accessible'>
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_elevator_access'
              name='amenities'
              defaultValue='Elevator Access'
              className='mr-2'
              defaultChecked={amenities.includes('Elevator Access')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_elevator_access'>
              Elevator Access
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_dishwasher'
              name='amenities'
              defaultValue='Dishwasher'
              className='mr-2'
              defaultChecked={amenities.includes('Dishwasher')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_dishwasher'>
              Dishwasher
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_gym_fitness_center'
              name='amenities'
              defaultValue='Gym/Fitness Center'
              className='mr-2'
              defaultChecked={amenities.includes('Gym/Fitness Center')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_gym_fitness_center'>
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_air_conditioning'
              name='amenities'
              defaultValue='Air Conditioning'
              className='mr-2'
              defaultChecked={amenities.includes('Air Conditioning')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_air_conditioning'>
              Air Conditioning
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_balcony_patio'
              name='amenities'
              defaultValue='Balcony/Patio'
              className='mr-2'
              defaultChecked={amenities.includes('Balcony/Patio')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_balcony_patio'>
              Balcony/Patio
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_smart_tv'
              name='amenities'
              defaultValue='Smart TV'
              className='mr-2'
              defaultChecked={amenities.includes('Smart TV')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_smart_tv'>
              Smart TV
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_coffee_maker'
              name='amenities'
              defaultValue='Coffee Maker'
              className='mr-2'
              defaultChecked={amenities.includes('Coffee Maker')}
              onChange={handleCheckbox}
            />
            <label htmlFor='amenity_coffee_maker'>
              Coffee Maker
            </label>
          </div>
        </div>
      </div>
      <div className='mb-4 bg-blue-50 p-4'>
        <label
          htmlFor='rates'
          className='block text-gray-700 font-bold mb-2'
        >
          Rates (Leave blank if not applicable)
        </label>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <div className='flex items-center'>
            <label
              htmlFor='weekly_rate'
              className='mr-2'
            >
              Weekly
            </label>
            <input
              type='number'
              id='weekly_rate'
              name='weeklyRate'
              className='border rounded w-full py-2 px-3'
              defaultValue={weeklyRate}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                event.preventDefault()
                setWeeklyRate(parseFloat(event.target.value))
              }}
            />
          </div>
          <div className='flex items-center'>
            <label
              htmlFor='monthly_rate'
              className='mr-2'
            >
              Monthly
            </label>
            <input
              type='number'
              id='monthly_rate'
              name='monthlyRate'
              className='border rounded w-full py-2 px-3'
              defaultValue={monthlyRate}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                event.preventDefault()
                setMonthlyRate(parseFloat(event.target.value))
              }}
            />
          </div>
          <div className='flex items-center'>
            <label
              htmlFor='nightly_rate'
              className='mr-2'
            >
              Nightly
            </label>
            <input
              type='number'
              id='nightly_rate'
              name='nightlyRate'
              className='border rounded w-full py-2 px-3'
              defaultValue={nightlyRate}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                event.preventDefault()
                setNightlyRate(parseFloat(event.target.value))
              }}
            />
          </div>
        </div>
      </div>
      <div className='mb-4'>
        <label
          htmlFor='ownerPhone'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Phone
        </label>
        <input
          type='tel'
          id='ownerPhone'
          name='ownerPhone'
          className='border rounded w-full py-2 px-3'
          defaultValue={ownerPhone}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            event.preventDefault()
            setOwnerPhone(event.target.value)
          }}
        />
      </div>
      <div>
        <SubmitButton
          message='Saving changes...'
          action='Save Changes'
        />
      </div>
    </form>
  )
}
export default EditListingForm