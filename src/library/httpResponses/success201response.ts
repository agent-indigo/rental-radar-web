import {NextResponse} from 'next/server'
const success201response = (data: object): NextResponse => new NextResponse(
  JSON.stringify(data), {
    status: 201
  }
)
export default success201response