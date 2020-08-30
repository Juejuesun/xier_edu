<template>
  <div>
    <div class="headers">
      <div class="innerpd">讨论区</div>
      <el-button type="primary" round @click="pushcomm">发布讨论</el-button>
    </div>
    <el-divider></el-divider>
    <div v-for="(item, index) in talkingList" :key="index">
      <el-card class="box-card" shadow="hover">
        <div class="header_title">{{item.title}}</div>
        <div>{{item.content}}</div>
        <div class="card_btm">
          <div class="btm_chr">
            <div class="chr_font">{{item.userName}}</div>
            <div class="chr_font"><span>{{item.date}}</span>发表</div>
          </div>
          <div class="btm_chr">
            <!-- <div class="chr_font">浏览<span>{{item.watch}}</span></div> -->
            <div class="chr_font">回复<span>{{item.replyNum}}</span></div>
            <div class="btncom" @click="getcomm(item)"><i class="el-icon-chat-dot-square"></i></div>
          </div>
        </div>
      </el-card>
      <!-- <hr color='#909399'/> -->
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'

export default {
  data() {
    return {
      commenList: [
        {
          title: '一二三四五',
          content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
        {
          title: '英语试题的难度',
          content: '啊吧吧吧啊吧吧吧啊吧吧吧啊吧吧吧啊吧吧吧啊吧吧吧啊吧吧吧啊吧吧吧。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
        {
          title: '组原的复习情况',
          content: '诸如“#FF0000”这样的颜色代码对于初级朋友来说不容易分辩，你可以这样做：给网页中的字体加上颜色此颜色是你想给水平线所要加的颜色，然后把颜色代码复制并粘贴到水平线的“快速标签编辑器”即可。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
        {
          title: '一二三四五',
          content: '电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机电脑都是发票发动机发动机。。。。',
          acture: '江小白',
          date: '2020-7-11',
          watch: '10',
          commit: '5'
        },
      ]
    }
  },
  computed: {
    ...mapState([ 'talkingList', 'tempInfo' ])
  },
  methods: {
    getcomm(row) {
      this.tempInfo.oneTalking = JSON.parse(JSON.stringify(row))
      console.log(this.tempInfo.oneTalking)
      this.$router.push({path: '/teaclass/disscuss/comments'})
    },
    pushcomm() {
      this.$router.push({path: '/teaclass/disscuss/push'})
    }
  },
  created() {
    this.$store.dispatch('getTalkings')
  }
}
</script>

<style scoped>
.headers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  /* padding-left: 20px; */
  padding-top: 10px;
}
.innerpd {
  font-size: 20px;
  color: #606266;
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
  letter-spacing: 5px;
  margin-bottom: 10px;
}
.btncom {
  font-size: 25px;
  color: #409EFF;
  cursor: pointer;
  margin-left: 5px;
  transition: all 0.6s;
}
.btncom:hover {
  box-shadow: #606266;
  transform: scale(1.4);
}
</style>