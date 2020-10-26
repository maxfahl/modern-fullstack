import React, {FunctionComponent} from 'react'
import {LoginForm} from '../index'

const Login: FunctionComponent = () => {
  // let {from} = location.state || {from: {pathname: '/'}}

  return (
    <>
      {/*<div><p>You must log in to view the page at {from.pathname}</p></div>*/}
      <LoginForm />
    </>
  )
}

export default Login
