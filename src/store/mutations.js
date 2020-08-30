import { PUSH_ACCOUNT, GET_CLASS_LIST } from './mutation-types'
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
  }
}