import {
  PUSH_ACCOUNT,
  GET_CLASS_LIST,
  GET_TEA_CLASS_LIST,
  GET_TALKINGS,
  GET_ANCE,
  GET_VIDEO_LIST,
  GET_HOMEWORK_LIST,
  USER_SIGN_OUT,
  GET_STU_LIST,
  GET_MEG_CLASS_LIST,
  GET_AT_SUBMIT,
  GET_NEW_WORK
} from './mutation-types'

export default{
  pushAccount({commit}, doc) {
    commit(PUSH_ACCOUNT, doc)
  },
  getClassList({commit}) {
    commit(GET_CLASS_LIST)
  },
  getTeaClassList({commit}) {
    commit(GET_TEA_CLASS_LIST)
  },
  getTalkings({commit}) {
    commit(GET_TALKINGS)
  },
  getAnce({commit}) {
    commit(GET_ANCE)
  },
  getVideoList({commit}) {
    commit(GET_VIDEO_LIST)
  },
  getHomeworkList({commit}) {
    commit(GET_HOMEWORK_LIST)
  },
  userSignOut({commit}) {
    commit(USER_SIGN_OUT)
  },
  getStuList({commit}) {
    commit(GET_STU_LIST)
  },
  getMegClassList({commit}) {
    commit(GET_MEG_CLASS_LIST)
  },
  getAtSubmit({commit}) {
    commit(GET_AT_SUBMIT)
  },
  getNewWork({commit}) {
    commit(GET_NEW_WORK)
  }
}