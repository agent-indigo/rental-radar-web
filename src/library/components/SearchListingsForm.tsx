'use client'
import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  ReactElement,
  SubmitEventHandler,
  useState
} from 'react'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {useRouter} from 'next/navigation'
import FormInput from '@/types/FormInput'
import ListingSearchParams from '@/types/ListingSearchParams'
const SearchListingsForm: FunctionComponent = (): ReactElement => {
  const router: AppRouterInstance = useRouter()
  const [
    params,
    setParams
  ] = useState<ListingSearchParams>({
    type: 'All'
  })
  const {
    keywords,
    type
  }: ListingSearchParams = params
  const handleChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const {
      name,
      value
    }: FormInput = event.target
    setParams((previousValues: ListingSearchParams): ListingSearchParams => ({
      ...previousValues, [
        name
      ]: value
    }))
  }
  const handleSubmit: SubmitEventHandler = (event): void => {
    event.preventDefault()
    router.push(`/listings/search?keywords=${keywords}&type=${type}&page=1`)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
    >
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label
          htmlFor='keywords'
          className='sr-only'
        >
          Keywords
        </label>
        <input
          type='text'
          id='keywords'
          name='keywords'
          placeholder='Enter keywords'
          value={keywords}
          onChange={handleChange}
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <label
          htmlFor='type'
          className='sr-only'
        >
          Listing type
        </label>
        <select
          id='type'
          name='type'
          value={type}
          onChange={handleChange}
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
        >
          <option value='All'>
            All
          </option>
          <option value='Apartment'>
            Apartment
          </option>
          <option value='Studio'>
            Studio
          </option>
          <option value='Condo'>
            Condo
          </option>
          <option value='House'>
            House
          </option>
          <option value='Cabin Or Cottage'>
            Cabin or Cottage
          </option>
          <option value='Loft'>
            Loft
          </option>
          <option value='Room'>
            Room
          </option>
          <option value='Other'>
            Other
          </option>
        </select>
      </div>
      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
      >
        Search
      </button>
    </form>
  )
}
export default SearchListingsForm