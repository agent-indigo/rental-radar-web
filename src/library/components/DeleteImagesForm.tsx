'use client'
import {
  ChangeEvent,
  ChangeEventHandler,
  FunctionComponent,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useState
} from 'react'
import Image from 'next/image'
import {
  Gallery,
  Item
} from 'react-photoswipe-gallery'
import {toast} from 'react-toastify'
import {FaTimes} from 'react-icons/fa'
import {useRouter} from 'next/navigation'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {useDeleteImageFromListingMutation} from '@/redux/slices/listingsApiSlice'
import ComponentListing from '@/types/ComponentListing'
import Listing from '@/types/Listing'
const DeleteImagesForm: FunctionComponent<ComponentListing> = ({listing}): ReactElement => {
  const router: AppRouterInstance = useRouter()
  const [deleteImageFromListing] = useDeleteImageFromListingMutation()
  const {
    id,
    imageUrls,
    imageIds
  }: Listing = listing
  const imageUrl: string = imageUrls![0]
  const [
    remaining,
    setRemaining
  ] = useState<string[]>(imageUrls!)
  const [
    selected,
    setSelected
  ] = useState<string[]>([])
  const handleDeleteOne: Function = async (imageId: string): Promise<void> => {
    const {error} = await deleteImageFromListing({
      id: id!,
      imageId
    })
    if (error) {
      toast.error(error.toString())
    } else {
      setSelected(selected.filter((id: string): boolean => id !== imageId))
      setRemaining(remaining.filter((id: string): boolean => id !== imageId))
      toast.success(`Image ${imageId} deleted.`)
      if (remaining.length === 0) router.push(`/listing/${id}/images/add`)
    }
  }
  const handleDeleteAll: MouseEventHandler = async (event: MouseEvent): Promise<void> => {
    event.preventDefault()
    await Promise.all(imageIds!.map(async (imageId: string): Promise<void> => await handleDeleteOne(imageId)))
  }
  const handleDeleteSelected: MouseEventHandler = async (event: MouseEvent): Promise<void> => {
    event.preventDefault()
    await Promise.all(selected.map(async (imageId: string): Promise<void> => await handleDeleteOne(imageId)))
  }
  const handleCheckbox: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    if (event.target.checked) {
      setSelected([
        ...selected,
        event.target.value
      ])
    } else {
      setSelected(selected.filter((id: string): boolean => id !== event.target.value))
    }
  }
  return (
    <>
      <div className='flex justify-center mb-4 gap-2'>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded-md mr-2'
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded-md'
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      </div>
      <Gallery>
        <section className='bg-blue-50 p-4'>
          <div className='container mx-auto'>
            {imageUrls!.length === 1 ? (
              <>
                <div className="flex justify-between">
                  <input
                    type='checkbox'
                    className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                    value={imageIds!.filter((imageId: string): boolean => imageUrl.includes(imageId))}
                    onChange={handleCheckbox}
                  />
                  <button onClick={async (): Promise<void> => await handleDeleteOne(imageIds!.filter((imageId: string): boolean => imageUrl.includes(imageId))[0])}>
                    <FaTimes className='text-red-500 hover:text-red-700'/>
                  </button>
                </div>
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
                      className='object-cover h-[400px] mx-auto rounded-xl'
                      width={1800}
                      height={400}
                      priority={true}
                    />
                  )}
                </Item>
              </>
            ) : (
              <div className='flex justify-between mb-4'>
                {imageUrls!.map((
                  imageUrl: string,
                  index: number
                ): ReactElement => (
                  <div
                    key={index}
                    className={
                      imageUrls!.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                    }
                  >
                    <div className="flex justify-between">
                      <input
                        type='checkbox'
                        className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                        value={imageIds!.filter((imageId: string): boolean => imageUrl.includes(imageId))}
                        onChange={handleCheckbox}
                      />
                      <button onClick={async (): Promise<void> => await handleDeleteOne(imageIds!.filter((imageId: string): boolean => imageUrl.includes(imageId))[0])}>
                        <FaTimes className='text-red-500 hover:text-red-700'/>
                      </button>
                    </div>
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
                          className='object-cover h-[400px] w-full rounded-xl'
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
          </div>
        </section>
      </Gallery>
    </>
  )
}
export default DeleteImagesForm