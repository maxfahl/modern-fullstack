import React, {FunctionComponent, useEffect} from 'react'
import {useNavigate} from '@reach/router'
import {useRecoilState} from 'recoil'
import {authState} from '../../state'

const Navigator: FunctionComponent = () => {
  const navigate = useNavigate()
  const [auth] = useRecoilState(authState)

  useEffect(() => {
    if (auth) {
      const token = auth?.token
      const isLoggedIn = !!token
      navigate(isLoggedIn ? '/' : 'login')
    }
  }, [auth, navigate])

  return null
}

export default Navigator
