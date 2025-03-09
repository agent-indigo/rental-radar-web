import {
  FunctionComponent,
  ReactElement
} from 'react'
import {ClipLoader} from 'react-spinners'
import {Metadata} from 'next'
export const metadata: Metadata = {}
const LoadingPage: FunctionComponent<boolean> = (loading): ReactElement => (
  <ClipLoader
    color='#3b82f6'
    loading={loading}
    cssOverride={{
      display: 'block',
      margin: '100px auto'
    }}
    size={150}
    aria-label='Loading Spinner'
  />
)
export default LoadingPage