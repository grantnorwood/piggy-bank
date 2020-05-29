import React from 'react'
import { withRouter } from 'react-router-dom'
import { AppContext, DAILY_WITHDRAWL_LIMIT } from "../../App"
import { formatUSCurrency, calculateWithdrawl } from '../../utils/currency'

interface WithdrawlState {
  isSubmitting: boolean,
  error?: string,
  withdrawlAmount: string,
}

const Withdraw = (props) => {
  // Context
  const { state, dispatch } = React.useContext(AppContext)

  // State
	const initialWithdrawlState: WithdrawlState = {
		isSubmitting: false,
    error: null,
    withdrawlAmount: '0',
	}
  const [ data, setData ] = React.useState(initialWithdrawlState)

  // Event handlers
	const handleInputChange = (event) => {
    // TODO: Validate input on change, not just on button click

		setData({
			...data,
			withdrawlAmount: event.target.value,
		})
  }

  const isWithdrawlAmountValid = (amount: string): boolean => {
    const amountFloat = parseFloat(amount)

    return (amountFloat <= state.account?.balance)
      && amountFloat <= DAILY_WITHDRAWL_LIMIT
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    setData({
      ...data,
      isSubmitting: true,
      error: null,
    })

    const isValid = isWithdrawlAmountValid(data.withdrawlAmount)

    if (isValid) {
      // Simulate time
      setTimeout(() => {
        dispatch({
            type: "WITHDRAW",
            payload: {
              newBalance: calculateWithdrawl(parseFloat(data.withdrawlAmount), state.account?.balance)
            }
        })

        // Navigate back to balance
        props.history.push('/')
      }, 1000)
    } else {
      const maxWithdrawl = Math.min(state.account?.balance, DAILY_WITHDRAWL_LIMIT)

      setData({
        ...data,
        isSubmitting: false,
        error: `${formatUSCurrency(parseFloat(data.withdrawlAmount))} is not a valid amount.  You may not withdrawl more than ${formatUSCurrency(maxWithdrawl)} today.`,
      })
    }
  }

  return (<>
    <h1>Make a Withdrawl</h1>

    <p>Current balance: <strong className="currency">{formatUSCurrency(state.account?.balance)}</strong></p>

    {data.error &&
      <div className="error">{data.error}</div>
    }

    <form onSubmit={handleFormSubmit}>
				<div className="field-container">
					<label htmlFor="withdrawlAmount">How much bacon do you wanna bring home?</label>
					<input type="number" id="withdrawlAmount" name="withdrawlAmount" value={data.withdrawlAmount} onChange={handleInputChange} />
				</div>
				<div className="button-container">
					<button type="submit" disabled={data.isSubmitting}>{data.isSubmitting ? "One moment ... ⏳" : "Withdraw"}</button>
				</div>
			</form>
  </>)
}

export default withRouter(Withdraw)
