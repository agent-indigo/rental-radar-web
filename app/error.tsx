'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import ErrorPageProps from '@/types/ErrorPageProps'
const ErrorPage: FunctionComponent<ErrorPageProps> = ({
  error,
  reset
}): ReactElement => {
  const {
    message,
    stack
  }: Error = error
  return (
    <section>
      <h1>
        500: Internal Server Error
      </h1>
      <p>
        {message}
      </p>
      <h2>
        Stack
      </h2>
      <p>
        {stack}
      </p>
      <button onClick={(): void => reset()}>
        Retry
      </button>
    </section>
  )
}
export default ErrorPage