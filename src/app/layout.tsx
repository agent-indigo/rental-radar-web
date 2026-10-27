import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {NextFont} from 'next/dist/compiled/@next/font'
import {ToastContainer} from 'react-toastify'
import ContextProvider from '@/components/ContextProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import 'react-toastify/dist/ReactToastify.css'
import 'photoswipe/dist/photoswipe.css'
import '@/assets/styles.css'
const inter: NextFont = Inter({
  subsets: [
    'latin'
  ]
})
export const metadata: Metadata = {
  title: {
    template: '%s | RentalRadar | Find the Perfect Rental',
    default: 'PropertyPulse | Find the Perfect Rental'
  },
  description: 'Find the perfect rental property.',
  keywords: 'find, rental, property'
}
const RootLayout: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => (
  <ContextProvider>
    <html lang='en'>
      <body className={inter.className}>
        <Navigation/>
        <main>
          {children}
        </main>
        <Footer/>
        <ToastContainer/>
      </body>
    </html>
  </ContextProvider>
)
export default RootLayout