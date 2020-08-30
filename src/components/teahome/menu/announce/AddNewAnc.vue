<template>
  <div class="mainbox">
    <div class="titleheader">
      <el-page-header @back="goBack" content="发布新公告" title="公告"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-input v-model="input" placeholder="请输入标题"></el-input>
    <div class="inputbox">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5}"
        placeholder="请输入内容"
        v-model="textareas"
      >
      </el-input>
    </div>
    <div class="btnbox">
       <el-button type="primary" round size="medium">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      console.log('go back');
       this.$router.back(-1)
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