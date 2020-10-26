import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import createUrqlClient from '../../utils/createUrqlClient'
import {Provider} from 'urql'
import {useRecoilState} from 'recoil'
import {authState} from '../../state'
import {deleteTokenFromLocalStorage} from '../../utils/auth'

const UrqlClientProvider: FunctionComponent = ({children}) => {
  const [auth, setAuth] = useRecoilState(authState)
  const [client, setClient] = useState(null)
  const lastClientTokenRef = useRef()

  const logout = useCallback(() => {
    const token = auth?.token
    if (token) return
    setAuth(null)
    deleteTokenFromLocalStorage()
  }, [auth?.token, setAuth])

  useEffect(() => {
    const token = auth?.token || null
    lastClientTokenRef.current = token
    if (!token) setClient(createUrqlClient())
    else if (auth && lastClientTokenRef.current !== token)
      setClient(createUrqlClient(token, logout))
  }, [auth, lastClientTokenRef, setAuth, logout])

  return <Provider value={client}>{children}</Provider>
}

export default UrqlClientProvider
