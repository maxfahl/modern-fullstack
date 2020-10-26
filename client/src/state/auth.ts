import {atom} from 'recoil'

const authState = atom({
  key: 'auth',
  default: null,
})

export {authState}
