import React, {FormEvent, FunctionComponent} from 'react'
import {gql} from 'graphql-request'
import {useMutation} from 'urql'
import {useRecoilState} from 'recoil'
import {authState} from '../../state'
import {setTokenInLocalStorage} from '../../utils/auth'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`

const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [, doLoginMutation] = useMutation(LOGIN_MUTATION)
  const [, setAuth] = useRecoilState(authState)

  // const mutate = React.useCallback(() => {
  //   doLoginMutation({ email, password })
  //     .then(({ data }) => {
  //       const token = data?.signIn?.token;
  //       if (token) {
  //         setTokenInLocalStorage(token);
  //         Router.history.push('/')
  //       }
  //     });
  // }, [doLoginMutation, email, password]);

  const doLogin = (e: FormEvent) => {
    e.preventDefault()
    doLoginMutation({email, password}).then(({data}) => {
      const {token} = data?.signIn
      if (token) {
        setTokenInLocalStorage(token)
        setAuth({token})
      }
    })
  }

  return (
    <div className="max-w-md w-full">
      <form className="mt-8" onSubmit={doLogin}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm">
          <div>
            <input
              aria-label="Email address"
              name="email"
              type="email"
              required
              autoComplete="off"
              className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-900 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:shadow-outline-gray focus:border-gray-500 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="-mt-px">
            <input
              aria-label="Password"
              name="password"
              type="password"
              required
              autoComplete="off"
              className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-900 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:shadow-outline-gray focus:border-gray-500 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/*<div className="mt-6 flex items-center justify-between">*/}
        {/*  <div className="flex items-center">*/}
        {/*    <input*/}
        {/*      id="remember_me"*/}
        {/*      type="checkbox"*/}
        {/*      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"*/}
        {/*    />*/}
        {/*    <label*/}
        {/*      htmlFor="remember_me"*/}
        {/*      className="ml-2 block text-sm leading-5 text-white"*/}
        {/*    >*/}
        {/*      Remember me*/}
        {/*    </label>*/}
        {/*  </div>*/}

        {/*  /!*<div className="text-sm leading-5">*!/*/}
        {/*  /!*  <a*!/*/}
        {/*  /!*    href="#"*!/*/}
        {/*  /!*    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"*!/*/}
        {/*  /!*  >*!/*/}
        {/*  /!*    Forgot your password?*!/*/}
        {/*  /!*  </a>*!/*/}
        {/*  /!*</div>*!/*/}
        {/*</div>*/}

        <div className="mt-6">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
