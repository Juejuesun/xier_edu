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

import axios from 'axios'

export default{
  [PUSH_ACCOUNT] (state, doc) {
    console.log(doc)
    // state.accountInfo = JSON.parse(JSON.stringify(doc))
    state.accountInfo.avadar = 'data:image/jpg;base64,'+ doc.avadar
    state.accountInfo.name = doc.name
    state.accountInfo.account = doc.userid
    state.accountInfo.classNum = doc.classNum
    state.accountInfo.date = doc.date
    state.accountInfo.user_id = doc.user_id
    state.accountInfo.is_teacher = doc.is_teacher
    window.sessionStorage.setItem('token', doc.token)
  },
  async [GET_CLASS_LIST] (state) {
    const {data: res} = await axios.post('/std/get_classes', {user_id: state.accountInfo.user_id})
    console.log(res)
    if(res.status == 200) {
      state.classList = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [GET_TEA_CLASS_LIST] (state) {
    const {data: res} = await axios.post('/tech/get_messages', {user_id: state.accountInfo.user_id})
    console.log(res)
    if(res.status == 200) {
      state.TeaClassList = JSON.parse(JSON.stringify(res.data[0].classes_info))
    }
  },
  async [GET_TALKINGS] (state) {
    const {data: res} = await axios.post('/get_talkings', {class_id: state.tempInfo.class_id})
    console.log(res)
    if(res.status == 200) {
      state.talkingList = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [GET_ANCE] (state) {
    const {data: res} = await axios.post('/get_notices', {class_id: state.tempInfo.class_id})
    console.log(res)
    if(res.status == 200) {
      state.anceList = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [GET_VIDEO_LIST] (state) {
    let asc = {
      user_id: state.accountInfo.user_id,
      class_id: state.tempInfo.class_id
    }
    const {data: res} = await axios.post('/get_course_list', asc)
    console.log(res)
    if(res.status == 200) {
      state.videoList = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [GET_HOMEWORK_LIST] (state) {
    let asc = {
      user_id: state.accountInfo.user_id,
      class_id: state.tempInfo.class_id
    }
    const {data: res} = await axios.post('/get_workList', asc)
    console.log(res)
    if(res.status == 200) {
      state.homeworkList = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [USER_SIGN_OUT] (state) {
    const {data: res} = await axios.post('/auth/logout', {user_id: state.accountInfo.user_id})
    console.log(res)
    
  },
  async [GET_STU_LIST] (state) {
    let asc = {
      class_id: state.tempInfo.class_id,
      user_id: state.accountInfo.user_id
    }
    const {data: res} = await axios.post('/manage/class_num_management', asc)
    console.log(res)
    if(res.status == 200) {
      state.stuListMeg = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [GET_MEG_CLASS_LIST] (state) {
    const {data: res} = await axios.post('/manage/class_management', {user_id: state.accountInfo.user_id})
    console.log(res)
    if(res.status == 200) {
      state.megClassList = JSON.parse(JSON.stringify(res.data[0].classes_message))
    }
  },
  async [GET_AT_SUBMIT] (state) {
    const {data: res} = await axios.post('/tech/get_assignment_submit', {assignment_id: state.tempInfo.oneHomework.details_id})
    console.log(res)
    if(res.status == 200) {
      state.subedInfo = JSON.parse(JSON.stringify(res.data[0]))
    }
  },
  async [GET_NEW_WORK] (state) {
    const {data: res} = await axios.post('/latest_courses_assigns', {class_id: state.tempInfo.class_id})
    console.log(res)
  }
}