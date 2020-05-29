import React from 'react'
import { withRouter } from 'react-router-dom'
import { AppContext, DAILY_DEPOSIT_LIMIT } from "../../App"
import { formatUSCurrency, calculateDeposit } from '../../utils/currency'

interface DepositState {
  isSubmitting: boolean,
  error?: string,
  depositAmount: string,
}

const Deposit = (props) => {
  // Context
  const { state, dispatch } = React.useContext(AppContext)

  // State
	const initialWithdrawlState: DepositState = {
		isSubmitting: false,
    error: null,
    depositAmount: '0',
	}
  const [ data, setData ] = React.useState(initialWithdrawlState)

  // Event handlers
	const handleInputChange = (event) => {
    // TODO: Validate input on change, not just on button click

		setData({
			...data,
			depositAmount: event.target.value,
		})
  }

  const isdepositAmountValid = (amount: string): boolean => {
    const amountFloat = parseFloat(amount)

    return (amountFloat <= DAILY_DEPOSIT_LIMIT)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    setData({
      ...data,
      isSubmitting: true,
      error: null,
    })

    const isValid = isdepositAmountValid(data.depositAmount)

    if (isValid) {
      // Simulate time
      setTimeout(() => {
        dispatch({
            type: "WITHDRAW",
            payload: {
              newBalance: calculateDeposit(parseFloat(data.depositAmount), state.account?.balance)
            }
        })

        // Navigate back to balance
        props.history.push('/')
      }, 1000)
    } else {
      setData({
        ...data,
        isSubmitting: false,
        error: `${formatUSCurrency(parseFloat(data.depositAmount))} is not a valid amount.  You may not deposit more than ${formatUSCurrency(DAILY_DEPOSIT_LIMIT)} today.`,
      })
    }
  }

  return (<>
    <h1>Make a Deposit</h1>

    <p>Current balance: <strong className="currency">{formatUSCurrency(state.account?.balance)}</strong></p>

    {data.error &&
      <div className="error">{data.error}</div>
    }

    <form onSubmit={handleFormSubmit}>
				<div className="field-container">
					<label htmlFor="depositAmount">How much?</label>
					<input type="number" id="depositAmount" name="depositAmount" value={data.depositAmount} onChange={handleInputChange} />
				</div>
				<div className="button-container">
					<button type="submit" disabled={data.isSubmitting}>{data.isSubmitting ? "One moment ... ⏳" : "Deposit"}</button>
				</div>
			</form>
  </>)
}

export default withRouter(Deposit)
