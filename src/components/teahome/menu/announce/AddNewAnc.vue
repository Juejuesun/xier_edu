<template>
  <div class="mainbox">
    <div class="titleheader">
      <el-page-header @back="goBack" content="发布新公告" title="公告"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="inputbox">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5}"
        placeholder="请输入内容"
        v-model="content"
      >
      </el-input>
    </div>
    <div class="btnbox">
       <el-button type="primary" round size="medium" @click="pubAncc">发布</el-button>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapState([ 'accountInfo', 'tempInfo' ])
  },
  methods: {
    goBack() {
      console.log('go back');
      this.$router.back(-1)
    },
    async pubAncc() {
      if(this.title && this.content) {
        let asc = {
          title: this.title,
          content: this.content,
          user_id: this.accountInfo.user_id,
          class_id: this.tempInfo.class_id
        }
        const {data: res} = await this.$http.post('/tech/post_notices', asc)
        console.log(res)
        if(res.status == 200) {
          console.log(res.message)
          this.goBack()
          this.$message({
            type: 'success',
            message: res.message + '！'
          })
        }else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }else {
        this.$message({
          type: 'error',
          message: '请填写完整信息！'
        })
      }
      
    }
  }
}
</script>

<style scoped>
.titleheader {
  display: flex;
  align-items: center;
}
.mainbox {
  margin-left: 20px;
  margin-right: 20px;
}
.inputbox {
  margin-bottom: 20px;
  margin-top: 20px;
}
.btnbox {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>