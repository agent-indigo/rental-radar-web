'use client'
import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  XShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share'
import DestructuredListing from '@/types/DestructuredListing'
import Listing from '@/types/Listing'
const ShareButtons: FunctionComponent<DestructuredListing> = ({listing}): ReactElement => {
  const {
    id,
    title,
    type
  }: Listing = listing
  const url: string = `${process.env.NEXT_PUBLIC_DOMAIN}/listings/${id}`
  return (
    <>
      <FacebookShareButton
        url={url}
        title={title}
        hashtag={`${type?.replace(/\s/g, '')}ForRent`}
      >
        <FacebookIcon size={40}/>
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={url}
        title={title}
        appId={process.env.FACEBOOK_MESSENGER_APP_ID ?? ''}
      >
        <FacebookMessengerIcon size={40}/>
      </FacebookMessengerShareButton>
      <WhatsappShareButton
        url={url}
        separator=':: '
      >
        <WhatsappIcon size={40}/>
      </WhatsappShareButton>
      <XShareButton
        url={url}
        hashtags={[`${type?.replace(/\s/g, '')}ForRent`]}
      >
        <XIcon size={40}/>
      </XShareButton>
      <EmailShareButton
        url={url}
        subject={`${title} for rent`}
        body={`I thought this ${type} might meet your needs:\n${title}\n${url}`}
      >
        <EmailIcon size={40}/>
      </EmailShareButton>
    </>
  )
}
export default ShareButtons