'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import ErrorPageProps from '@/types/ErrorPageProps'
const ErrorPage: FunctionComponent<ErrorPageProps> = ({
  error,
  reset
}): ReactElement => (
  <section>
    <h1>
      500: Internal Server Error
    </h1>
    <p>
      {error.toString()}
    </p>
    <button onClick={(): void => reset()}>
      Retry
    </button>
  </section>
)
export default ErrorPage