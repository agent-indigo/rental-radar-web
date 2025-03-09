import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {NextFont} from 'next/dist/compiled/@next/font'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/assets/styles.css'
import AuthProvider from '@/components/AuthProvider'
import GlobalContextProvider from '@/components/GlobalContextProvider'
import Children from '@/types/Children'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const inter: NextFont = Inter({subsets: ['latin']})
export const metadata: Metadata = {}
const RootLayout: FunctionComponent<Children> = ({children}): ReactElement => (
  <AuthProvider>
    <GlobalContextProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Header/>
          <main>
            {children}
          </main>
          <Footer/>
          <ToastContainer/>
        </body>
      </html>
    </GlobalContextProvider>
  </AuthProvider>
)
export default RootLayout