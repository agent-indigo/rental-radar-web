import {
  FunctionComponent,
  ReactElement
} from 'react'
import ListingCard from '@/components/ListingCard'
import Paginator from '@/components/Paginator'
import ListingsComponentProps from '@/types/ListingsComponentProps'
import Listing from '@/types/Listing'
const Listings: FunctionComponent<ListingsComponentProps> = ({
  listings,
  page = 1,
  size = 6,
  total
}): ReactElement => (
  <section className='px-4 py-6'>
    <div className='container-xl lg:container m-auto px-4 py-6'>
      {listings.length === 0 ? (
        <p>
          No listings currently available.
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {listings.map((listing: Listing): ReactElement => (
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
        total={total}
        fromSearch={false}
      />
    </div>
  </section>
)
export default Listings