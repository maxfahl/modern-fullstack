import React, {FunctionComponent} from 'react'
import {Login} from '../../components'
import {RouteComponentProps} from '@reach/router'

const AuthPage: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Login />
    </div>
  )
}

export default AuthPage
