import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './app.css';

import Balance from './components/Balance/Balance';
import Deposit from './components/Deposit/Deposit';
import Header from './components/Header/Header';
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Withdraw from './components/Withdraw/Withdraw'

/**
 * Set to true to bypass entering a pin during development, or false in production.
 *
 * (Yes, this might be better an .env file or `process.env` or something ...)
 */
export const isDevelopment = false;

// App context
// @ts-ignore
export const AppContext = React.createContext()

export const DAILY_WITHDRAWL_LIMIT = 1000
export const DAILY_DEPOSIT_LIMIT = 5000

/**
 * Fetch from some fake db.
 */
const loadInitialAccountData = (): object => {
  return {
    balance: 4213.88
  }
}

interface AppState {
  isAuthenticated: boolean,
  user?: {
    name: string
  },
  account?: {
    balance?: number
  }
}

// Auth reducer
const initialState: AppState = isDevelopment
  ? {
    isAuthenticated: true,
    user: {
      name: 'Grant'
    },
    account: loadInitialAccountData(),
  }
  : {
    isAuthenticated: false,
    user: null,
    account: null,
  }

export const appReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
      // TODO: Add real jwt token to localStorage
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			return {
				...state,
				isAuthenticated: true,
        user: action.payload.user,
        account: loadInitialAccountData(),
			}
		case 'LOGOUT':
			localStorage.clear()
			return {
				...state,
				isAuthenticated: false,
				user: null,
			}
		case 'WITHDRAW':
			return {
				...state,
				account: {
          balance: action.payload.newBalance
        }
			}
		case 'DEPOSIT':
			return {
				...state,
				account: {
          balance: action.payload.newBalance
        }
			}
		default:
			return state
	}
}

/**
 * TODO: Here's a list of to-do items that I would implement if I had more time ...
 *
 *       - Prettier for consistent code formatting
 *       - Add Types for most classes/functions/etc (set strict to true in tsconfig)
 *       - Add mobile breakpoints
 *       - Write unit/e2e tests
 *       - Abstract away the localStorage calls
 *       - Add a real db
 *       - Lots more input validation
 *       - Add real auth (via jwt, most likely)
 *       - Componentize all the things!  (well, most of the things ...)
 *       - Use selectors for pulling values out of app state
 *       - Verify a11y works for people with various usability impairments
 */

const App: React.FC = () => {
	const [ state, dispatch ] = React.useReducer(appReducer, initialState)

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			<Router>
				<div className="app">
					<Header />
					<Switch>
						<Route path="/withdraw" exact>
							{state.isAuthenticated ? <Withdraw /> : <Redirect push to="/" />}
						</Route>
						<Route path="/deposit" exact>
							{state.isAuthenticated ? <Deposit /> : <Redirect push to="/" />}
						</Route>
						<Route path="/" exact>{state.isAuthenticated ? <Balance /> : <Login />}</Route>
            <Route>
              <NotFound />
            </Route>
					</Switch>
				</div>
			</Router>
		</AppContext.Provider>
	)
}

export default App
