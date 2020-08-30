import { PUSH_ACCOUNT, GET_CLASS_LIST, GET_NOTICES, GET_TEA_CLASS_LIST, GET_TALKINGS, GET_ANCE } from './mutation-types'
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
    window.sessionStorage.setItem('token', doc.token)
  },
  async [GET_CLASS_LIST] (state) {
    const {data: res} = await axios.post('/std/get_classes', {user_id: state.accountInfo.user_id})
    console.log(res)
    if(res.status == 200) {
      state.classList = JSON.parse(JSON.stringify(res.data))
    }
  },
  async [GET_NOTICES] (state, {classId}) {  //获取公告
    console.log(classId)
    const {data: res} = await axios.post('/get_notices', {class_id: classId})
    console.log(res)
    if(res.status == 200) {
      console.log(res.data)
    }else {
      console.log(res.message)
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
  }
}