import React from 'react'
import { AppContext } from '../../App'
import { formatUSCurrency } from '../../utils/currency'

const Balance: React.FC = () => {
  // Context
  const { state } = React.useContext(AppContext)

  return (<>
    <h1>Current Balance</h1>

    <p>This little piggy has <strong className="currency">{formatUSCurrency(state.account?.balance)}</strong> in the bank.</p>
  </>)
}

export default Balance
