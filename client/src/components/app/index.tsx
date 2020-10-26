import React, {Fragment, FunctionComponent} from 'react'
import {createHistory, LocationProvider, Router} from '@reach/router'
import {RecoilRoot} from 'recoil'
import {Header, Navigator} from '..'
import {PrivateRoute, UrqlClientProvider} from '../index'
import {ErrorBoundary} from 'react-error-boundary'
import {getTokenFromLocalStorage} from '../../utils/auth'
import {authState} from '../../state'
import {AuthPage, HomePage} from '../../pages'

const history = createHistory(window as any)

const initializeAuthState = ({set}) => {
  const token = getTokenFromLocalStorage()
  if (token) set(authState, {token})
}

const App: FunctionComponent = () => {
  return (
    <div className="app flex flex-col">
      <ErrorBoundary fallback={<div>Woopsie!</div>}>
        <RecoilRoot initializeState={initializeAuthState}>
          <UrqlClientProvider>
            <LocationProvider history={history}>
              <Navigator />
              <Header />
              <Router primary={false} component={Fragment}>
                <PrivateRoute path="/">
                  <HomePage default />
                </PrivateRoute>
                <AuthPage path="login" />
              </Router>
            </LocationProvider>
          </UrqlClientProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </div>
  )
}

export default App
