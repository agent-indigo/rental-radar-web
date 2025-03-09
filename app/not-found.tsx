import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Metadata} from 'next'
import Link from 'next/link'
export const metadata: Metadata = {}
const NotFoundPage: FunctionComponent = (): ReactElement => (
  <section>
    <h1>
      Error 404
    </h1>
    <p>
      Page Not Found
    </p>
    <Link href='/'>
      Home
    </Link>
  </section>
)
export default NotFoundPage