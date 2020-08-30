<template>
  <div>
    <div class="list" >
      <el-card class="box-card" shadow="hover" v-for="(item, index) in classList" :key="index">
        <el-image style="width: 100%; height: 150px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit"></el-image>
        <h3>{{item.subName}}</h3>
        <p>主讲教师：<span>{{item.teacher}}</span></p>
        <p>班级：一年2班</p>
        <div>
          <el-button size="mini" @click="pgch('CLS')">进入课程</el-button>
          <el-button size="mini" @click="pgch('HWK')">查看作业</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['classList'])
  },
  methods: {
    pgch(typ) {
      if(typ==='CLS') {
        this.$router.push({path: '/stuclass/announcement'})
      }else {
        this.$router.push({path: '/stuclass/homework'})
      }
    }
  },
  created() {
    this.$store.dispatch('getClassList')
  }
}
</script>

<style scoped>
.box-card {
  width: 30%;
  margin: 1%;
}
.list {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
</style>