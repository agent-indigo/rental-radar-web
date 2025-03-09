import {NextResponse} from 'next/server'
const success200response: Function = (data: object): NextResponse => new NextResponse(
  JSON.stringify(data), {
    status: 200
  }
)
export default success200response