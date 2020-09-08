<template>
  <div>
    <div class="list" >
      <el-card class="box-card" shadow="hover" v-for="(item, index) in TeaClassList" :key="index">
        <el-image style="width: 100%; height: 150px" src="https://gitee.com/juejuesun/pic-tyo/raw/master/img/1583115478206.jpeg" fit="fit"></el-image>
        <h3>{{item.subName}}</h3>
        <p>主讲教师：<span>{{item.teacher}}</span></p>
        <p>班级：一年2班</p>
        <div>
          <el-button size="mini" @click="pgch('CLS', item)">进入课程</el-button>
          <el-button size="mini" @click="pgch('HWK', item)">查看作业</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['accountInfo', 'TeaClassList', 'tempInfo' ])
  },
  methods: {
    pgch(typ, row) {
      console.log(row)
      this.tempInfo.class_id = row.class_id
      if(typ==='CLS') {
        this.$router.push({path: '/teaclass/announcement'})
      }else {
        this.$router.push({path: '/teaclass/homework'})
      }
    },
    // async getclass() {
    //   const {data: res} = await this.$http.post('/tech/get_messages', {user_id: this.accountInfo.user_id})
    //   console.log(res)
    // }
  },
  created() {
    // this.getclass()
    this.$store.dispatch('getTeaClassList')
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