export const formatNumber = (num: number): string => {
  return `${Math.abs(num).toFixed(1)}bn`
}

export const getVarianceColor = (variance: number): string => {
  return variance >= 0 ? "positive" : "negative"
}
