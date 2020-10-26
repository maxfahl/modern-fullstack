import {createClient, defaultExchanges} from 'urql'
import {authExchange} from '@urql/exchange-auth'
import {Client} from '@urql/core/dist/types/client'

const createUrqlClient = (
  token: string = undefined,
  logout: () => void = () => {},
): Client => {
  return createClient({
    url: 'http://localhost:5000/graphql',
    exchanges: [
      ...defaultExchanges,
      authExchange<{token: string}>({
        getAuth: async ({authState}) => {
          if (!authState) {
            if (token) return {token}
            return null
          }

          logout()
          return null
        },
        addAuthToOperation: ({authState, operation}) => {
          if (!authState?.token) {
            return operation
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {}

          return {
            ...operation,
            context: {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.token}`,
                },
              },
            },
          }
        },
        didAuthError: ({error}) => {
          return error.graphQLErrors.some(
            e => e.extensions?.code === 'FORBIDDEN',
          )
        },
      }),
    ],
  })
}

export default createUrqlClient
