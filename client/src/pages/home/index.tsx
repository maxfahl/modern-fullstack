import React, {FunctionComponent} from 'react'
import {RouteComponentProps} from '@reach/router'

const HomePage: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
      Welcome to the home page.
    </div>
  )
}

export default HomePage
