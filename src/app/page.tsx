import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomePageListings from '@/components/HomePageListings'
import FeaturedListings from '@/components/FeaturedListings'
export const metadata: Metadata = {
  title: 'Home'
}
const HomePage: FunctionComponent = (): ReactElement => (
  <>
    <Hero/>
    <InfoBoxes/>
    <FeaturedListings/>
    <HomePageListings/>
  </>
)
export default HomePage