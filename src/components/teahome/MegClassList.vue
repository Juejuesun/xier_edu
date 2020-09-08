<template>
  <div>
    <div class="list" >
      <el-card class="box-card" shadow="hover" v-for="(item, index) in megClassList" :key="index">
        <el-image style="width: 100%; height: 150px" src="https://gitee.com/juejuesun/pic-tyo/raw/master/img/1583115478206.jpeg" fit="fit"></el-image>
        <h3>{{item.subName}}</h3>
        <p>学生数：<span>{{item.num}}</span></p>
        <!-- <p>班级：一年2班</p> -->
        <div>
          <el-button size="mini" @click="pgch(item)">人员管理</el-button>
          <!-- <el-button size="mini" @click="pgch('HWK', item)">查看作业</el-button> -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['accountInfo', 'megClassList', 'tempInfo' ])
  },
  methods: {
    pgch(row) {
      console.log(row)
      this.tempInfo.class_id = row.class_id
      this.$router.push({
        path: '/teahome/meglist/menageclass',
        query: {
          title: row.subName
        }
      })
    },
    // async getclass() {
    //   const {data: res} = await this.$http.post('/tech/get_messages', {user_id: this.accountInfo.user_id})
    //   console.log(res)
    // }
  },
  created() {
    // this.getclass()
    this.$store.dispatch('getMegClassList')
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