import { SEARCH_FILE, GET_LIST } from './mutation-types'
import axios from 'axios'

export default{
  async [SEARCH_FILE] (state, {doc}) {
    if(!doc) {
      console.log('搜索字段空')
      return;
    }
    const {data: res} = await axios.post('/searchs', {doc :doc})
    console.log(res)
    state.searchLis = JSON.parse(JSON.stringify(res.searchls))
  },
  async [GET_LIST] (state, {doc}) {
    const {data: res} = await axios.post('/mus', doc)
    state.realList = JSON.parse(JSON.stringify(res.realList))
    state.FileList = JSON.parse(JSON.stringify(res.FileList))
  }
}