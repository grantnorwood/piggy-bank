import React from 'react'
import { AppContext } from "../../App"

interface LoginState {
  isSubmitting: boolean,
  error?: string,
  pin?: string,
}

const Login: React.FC = () => {
  // Context
  const { dispatch } = React.useContext(AppContext)

  // State
	const initialState: LoginState = {
		pin: '',
		isSubmitting: false,
		error: null,
	};
  const [ data, setData ] = React.useState(initialState)

  // Event handlers
	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		})
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    setData({
      ...data,
      isSubmitting: true,
      error: null,
    })

    // TODO: Put pin/user into app context
    if (data.pin === '1234') {
      // Simulate time
      setTimeout(() => {
        dispatch({
            type: "LOGIN",
            payload: {
              user: {
                name: 'Grant'
              }
            }
        })
      }, 1000)
    } else {
      setData({
        ...data,
        isSubmitting: false,
        error: 'Incorrect PIN.  You have 3 more attempts before your account is locked.', // TODO: Implement max tries
      })
    }
  }

	return (
		<React.Fragment>
			<h1>Welcome to PiggyBank</h1>

      {data.error &&
        <div className="error">{data.error}</div>
      }

			<form onSubmit={handleFormSubmit}>
				<div className="field-container">
					<label htmlFor="pin">Please enter your PIN</label>
					<input type="password" id="pin" name="pin" value={data.pin} onChange={handleInputChange} />
				</div>
				<div className="button-container">
					<button type="submit" disabled={data.isSubmitting}>{data.isSubmitting ? "One moment ... ⏳" : "Login"}</button>
				</div>
			</form>
		</React.Fragment>
	)
}

export default Login
