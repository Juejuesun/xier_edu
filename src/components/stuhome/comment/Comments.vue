<template>
  <div class="mainbox">
    <div class="headers">
      <el-page-header @back="goBack" :content="comment.title" title="评论区"></el-page-header>
      <el-button type="info" round size="mini">删除</el-button>
    </div>
    <el-divider></el-divider>
    <el-card class="box-card" shadow="hover">
      <div class="header_title">{{comment.title}}</div>
      <div>{{comment.content}}</div>
      <div class="card_btm">
        <div class="btm_chr">
          <div class="chr_font">{{comment.acture}}</div>
          <div class="chr_font"><span>{{comment.date}}</span>发表</div>
        </div>
        <div class="btm_chr">
          <div class="chr_font">浏览<span>{{comment.watch}}</span></div>
          <div class="chr_font">回复<span>{{comment.commit}}</span></div>
        </div>
      </div>
    </el-card>
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
       <el-button type="primary" round size="small">回复</el-button>
    </div>
    <div>共 <span>{{comment.commit}} 条回复</span></div>
    <el-divider></el-divider>
    <div v-for="(item, index) in backcomments" :key="index">
      <div class="backcon">{{item.content}}</div>
      <div class="card_btm">
        <div class="btm_chr">
          <div class="chr_font">{{item.acture}}</div>
          <div class="chr_font"><span>{{item.date}}</span>发表</div>
        </div>
        <div class="btm_chr">
          <div class="chr_font">浏览<span>{{item.watch}}</span></div>
          <div class="chr_font">回复<span>{{item.commit}}</span></div>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      textareas: '',
      comment: {
        title: '一二三四五',
        content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
        acture: '江小白',
        date: '2020-7-11',
        watch: '10',
        commit: '5'
      },
      backcomments: [
        {
          content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
        {
          content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
        {
          content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
        {
          content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        }
      ]
    }
  },
  methods: {
    goBack() {
      console.log('go back');
       this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
.headers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  padding-top: 10px;
}
.mainbox {
  margin-left: 20px;
  margin-right: 20px;
}
.card_btm {
  display: flex;
  justify-content: space-between;
}
.btm_chr {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.chr_font {
  margin: 5px;
  margin-top: 10px;
  font-size: 15px;
  color: #606266;
}
.header_title {
  font-size: 25px;
  letter-spacing: 10px;
  margin-bottom: 10px;
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

.backcon {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>