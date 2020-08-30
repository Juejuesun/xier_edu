import { PUSH_ACCOUNT, GET_CLASS_LIST, GET_NOTICES, GET_TEA_CLASS_LIST, GET_TALKINGS, GET_ANCE } from './mutation-types'

export default{
  pushAccount({commit}, doc) {
    commit(PUSH_ACCOUNT, doc)
  },
  getClassList({commit}) {
    commit(GET_CLASS_LIST)
  },
  getNotices({commit}, classId) {
    commit(GET_NOTICES, {classId})
  },
  getTeaClassList({commit}) {
    commit(GET_TEA_CLASS_LIST)
  },
  getTalkings({commit}) {
    commit(GET_TALKINGS)
  },
  getAnce({commit}) {
    commit(GET_ANCE)
  }
}