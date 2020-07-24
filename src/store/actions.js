import { SEARCH_FILE, GET_LIST } from './mutation-types'

export default{
  searchFile({commit}, doc) {
    commit(SEARCH_FILE, {doc})
  },
  getList({commit}, doc) {
    commit(GET_LIST, {doc})
  }
}