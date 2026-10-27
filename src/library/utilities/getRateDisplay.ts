import Listing from '@/types/Listing'
const getRateDisplay = (listing: Listing): string | undefined => {
  const {
    nightlyRate,
    weeklyRate,
    monthlyRate
  } = listing
  if (monthlyRate) {
    return `${monthlyRate.toLocaleString()}/month`
  } else if (weeklyRate) {
    return `${weeklyRate.toLocaleString()}/week`
  } else if (nightlyRate) {
    return `${nightlyRate.toLocaleString()}/night`
  }
}
export default getRateDisplay