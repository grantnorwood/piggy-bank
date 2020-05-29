/**
 * Return a formatted currency string.
 * @param amount
 */
export const formatUSCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export const calculateWithdrawl = (amount: number, currentBalance: number): number => {
  const newBalance = currentBalance - amount

  if (newBalance < 0) {
    // TODO: Better user-facing error handling
    throw new Error('You may not withdraw more money than you have.')
  }

  return newBalance
}

export const calculateDeposit = (amount: number, currentBalance: number): number => {
  return currentBalance + amount
}
