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
      <div v-for="o in 3" :key="o">
        <div class="ancbox">
          <div style="width: 90%">
            <p>公告标题</p>
            <div>啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</div>
          </div>
          <div>
            <el-button type="danger" size="small" round v-show="isShow">删除</el-button>
          </div>
        </div>
        
        <el-divider></el-divider>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    pushcomm() {
      this.$router.push({path: '/teaclass/announcement/addnew'})
    },
    ancmeg() {
      this.isShow = !this.isShow
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