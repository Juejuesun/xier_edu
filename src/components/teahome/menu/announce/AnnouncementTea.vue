<template>
  <el-container >
    <el-main>
      <div class="titleheader">
        <div class="titlebox">公告</div>
        <div>
           <el-button type="primary" round @click="pushcomm">发布新公告</el-button>
            <el-button type="primary" round @click="ancmeg">公告管理</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div v-for="(item, index) in anceList" :key="index">
        <div class="ancbox">
          <div style="width: 90%">
            <p>{{item.title}}</p>
            <div>{{item.contant}}</div>
          </div>
          <div>
            <el-button type="danger" size="small" round v-show="isShow" @click="delanc(item)">删除</el-button>
          </div>
        </div>
        
        <el-divider></el-divider>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState} from 'vuex'

export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState([ 'accountInfo', 'anceList', 'tempInfo' ])
  },
  methods: {
    pushcomm() {
      this.$router.push({path: '/teaclass/announcement/addnew'})
    },
    ancmeg() {
      this.isShow = !this.isShow
    },
    async delanc(row) {
      console.log(row)
      let asc = {
        class_id: this.tempInfo.class_id,
        notice_id: row.notice_id,
        user_id: this.accountInfo.user_id
      }
      const {data: res} = await this.$http.post('/tech/del_notice', asc)
      if(res.status == 200) {
        this.$store.dispatch('getAnce')
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
      
    }
  },
  created() {
    this.$store.dispatch('getAnce')
  }
}
</script>

<style scoped>
.titleheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.titlebox {
  font-size: 30px;
  color: #909399;
  margin: 20px;
}
.asidebox {
  font-size: 20px;
  color: #909399;
}
.asiders {
  margin: 0;
  padding: 0;
  background: rgba(242,242,242);
  padding: 10px;
  margin-top: 30%;
  border-radius: 10px;
}
.ancbox {
  display: flex;
  align-items: center;
}
</style>