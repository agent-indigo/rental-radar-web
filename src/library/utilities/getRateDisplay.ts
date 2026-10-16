import Property from '@/types/Listing'
const getRateDisplay: Function = (property: Property): string | undefined => {
  const {
    nightlyRate,
    weeklyRate,
    monthlyRate
  } = property
  if (nightlyRate) {
    return `${nightlyRate.toLocaleString()}/night`
  } else if (weeklyRate) {
    return `${weeklyRate.toLocaleString()}/week`
  } else if (monthlyRate) {
    return `${monthlyRate.toLocaleString()}/month`
  }
}
export default getRateDisplay