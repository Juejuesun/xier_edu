<template>
  <div class="mainbox">
    <div>
      <el-page-header @back="goBack" content="发布讨论" title="评论区"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-input v-model="comForm.title" placeholder="请输入标题"></el-input>
    <div class="inputbox">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5}"
        placeholder="请输入内容"
        v-model="comForm.content"
      >
      </el-input>
    </div>
    <div class="btnbox">
       <el-button type="primary" round size="medium" @click="publish">发表</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['accountInfo'])
  },
  data() {
    return {
      comForm: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    goBack() {
      console.log('go back');
       this.$router.back(-1)
    },
    async publish() {
      if(this.comForm.title && this.comForm.content) {
        let asc = {
          user_id: this.accountInfo.user_id,
          class_id: 4, //模拟数据
          title: this.comForm.title,
          content: this.comForm.content
        }
        const {data: res} = await this.$http.post('/post_discussion', asc)
        console.log(res)
        if(res.status == 200) {
          this.$message({
            message: '发布成功！',
            type: 'success'
          })
          this.goBack()
        }else {
          this.$message({
            message: res.message + '！',
            type: 'error'
          })
        }
      }else {
        this.$message({
          message: '内容不能为空',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
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