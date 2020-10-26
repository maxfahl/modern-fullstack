import React, {
  cloneElement,
  Fragment,
  FunctionComponent,
} from 'react'
import {Redirect, RouteComponentProps} from '@reach/router'
import {useRecoilState} from 'recoil'
import {authState} from '../../state'

interface PrivateRouteProps extends RouteComponentProps {
  children: JSX.Element
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({children}) => {
  const [auth] = useRecoilState(authState)
  const isLoggedIn = !!auth?.token

  return isLoggedIn ? (
    cloneElement(children, {component: Fragment})
  ) : (
    <Redirect to="login" from="/" noThrow />
  )
}

export default PrivateRoute
