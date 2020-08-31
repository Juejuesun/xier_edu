<template>
  <el-container >
    <el-main>
      <div class="titlebox">公告</div>
      <el-divider></el-divider>
      <div v-for="(item, index) in anceList" :key="index">
        <p>{{item.title}}</p>
        <div>{{item.contant}}</div>
        <el-divider></el-divider>
      </div>
    </el-main>
  <el-aside width="200px">
    <div class="asiders">
      <div class="asidebox">最新更新</div>
      <p style="color: #909399;">课程</p>
      <div>
        <el-link type="primary">课程列表</el-link>
      </div>
      <p style="color: #909399;">作业</p>
      <div>
        <el-link type="primary">作业列表</el-link>
      </div>
    </div>
  </el-aside>
  </el-container>
</template>

<script>
import { mapState} from 'vuex'

export default {
  data() {
    return {
      classId: 4
    }
  },
  computed: {
    ...mapState([ 'accountInfo', 'anceList', 'tempInfo' ])
  },
  created() {
    // this.$store.dispatch('getNotices', this.classId)
    this.$store.dispatch('getAnce')

  }
}
</script>

<style scoped>
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
</style>