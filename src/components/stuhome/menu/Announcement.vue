<template>
  <el-container >
    <el-main>
      <div class="titlebox">公告</div>
      <el-divider></el-divider>
      <div v-for="(item, index) in anceList" :key="index">
        <h3>{{item.title}}</h3>
        <div>{{item.contant}}</div>
        <el-divider></el-divider>
      </div>
    </el-main>
  <el-aside width="200px">
    <div class="asiders">
      <div class="asidebox">最新更新</div>
      <p style="color: #909399;">课程</p>
      <div>
        <el-link class="linklist" type="primary" v-for="(item, index) in videoList" :key="index">{{item.name}}</el-link>
      </div>
      <p style="color: #909399;">作业</p>
      <div>
        <el-link class="linklist" type="primary" v-for="(item, index) in homeworkList" :key="index">{{item.name}}</el-link>
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
    ...mapState([ 'accountInfo', 'anceList', 'tempInfo', 'videoList', 'homeworkList' ])
  },
  created() {
    // this.$store.dispatch('getNotices', this.classId)
    this.$store.dispatch('getAnce')
    this.$store.dispatch('getNewWork')
    this.$store.dispatch('getHomeworkList')
    this.$store.dispatch('getVideoList')
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
  /* padding: 5px; */
  background: rgba(242,242,242);
  padding: 10px;
  margin-top: 30%;
  border-radius: 10px;
  
}
.linklist {
  overflow: hidden;    
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;    
  -webkit-box-orient: vertical;    
  -webkit-line-clamp: 3;    
  overflow: hidden;
  margin-bottom: 5px;
}
</style>