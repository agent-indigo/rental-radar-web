'use client'
import Image from 'next/image'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  Gallery,
  Item
} from 'react-photoswipe-gallery'
import ImageUrls from '@/types/ImageUrls'
const ListingImages: FunctionComponent<ImageUrls> = ({imageUrls}): ReactElement => {
  const imageUrl: string = imageUrls[0]
  return (
    <Gallery>
      {imageUrls.length === 1 ? (
        <Item
          original={imageUrl}
          thumbnail={imageUrl}
          width={1000}
          height={600}
        >
          {({
            ref,
            open
          }): ReactElement => (
            <Image
              ref={ref}
              onClick={open}
              src={imageUrl}
              alt=''
              className='object-cover h-100 mx-auto rounded-xl'
              width={1800}
              height={400}
              priority={true}
            />
          )}
        </Item>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {imageUrls.map((
            imageUrl: string,
            index: number
          ): ReactElement => (
            <div
              key={index}
              className={
                imageUrls.length === 3 && index === 2
                ? 'col-span-2'
                : 'col-span-1'
              }
            >
              <Item
                original={imageUrl}
                thumbnail={imageUrl}
                width={1000}
                height={600}
              >
                {({
                  ref,
                  open
                }): ReactElement => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={imageUrl}
                    alt=''
                    className='object-cover h-100 w-full rounded-xl'
                    width={1800}
                    height={400}
                    priority={true}
                  />
                )}
              </Item>
            </div>
          ))}
        </div>
      )}
    </Gallery>
  )
}
export default ListingImages