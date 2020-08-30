import { PUSH_ACCOUNT, GET_CLASS_LIST } from './mutation-types'

export default{
  pushAccount({commit}, doc) {
    commit(PUSH_ACCOUNT, doc)
  },
  getClassList({commit}) {
    commit(GET_CLASS_LIST)
  }
}