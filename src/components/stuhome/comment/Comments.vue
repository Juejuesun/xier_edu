<template>
  <div class="mainbox">
    <div class="headers">
      <el-page-header @back="goBack" :content="tempInfo.oneTalking.title" title="评论区"></el-page-header>
      <div>
        <el-button type="info" round size="mini" v-show="tempInfo.oneTalking.userName === accountInfo.name" @click="delcomt">删除</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <el-card class="box_card" shadow="hover">
      <div class="header_title">{{tempInfo.oneTalking.title}}</div>
      <div>{{tempInfo.oneTalking.content}}</div>
      <div class="card_btm">
        <div class="btm_chr">
          <div class="chr_font">{{tempInfo.oneTalking.userName}}</div>
          <div class="chr_font"><span>{{tempInfo.oneTalking.date}}</span>发表</div>
        </div>
        <div class="btm_chr">
          <!-- <div class="chr_font">浏览<span>{{comment.watch}}</span></div> -->
          <div class="chr_font">回复<span>{{tempInfo.oneTalking.replyNum}}</span></div>
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
       <el-button type="primary" round size="small" @click="sendReply">回复</el-button>
    </div>
    <div>共 <span>{{tempInfo.oneTalking.replyNum}} 条回复</span></div>
    <el-divider></el-divider>
    <div v-for="(item, index) in backcomments" :key="index">
      <div class="backcon">{{item.content}}</div>
      <div class="card_btm">
        <div class="btm_chr">
          <div class="chr_font">{{item.userName}}</div>
          <div class="chr_font"><span>{{item.date}}</span>发表</div>
        </div>
        <div class="btm_chr">
          <div class="chr_font"><el-button v-show="item.userName === accountInfo.name" type="info" icon="el-icon-delete" size="small" circle></el-button></div>
          <!-- <div class="chr_font">回复 <span>{{item.reply_num}}</span></div> -->
        </div>
      </div>
      <!-- <div>
        <div v-for="(reply, inds) in item.replys" :key="inds" class="repcont">
          <div class="repbackcon">{{reply.content}}</div>
          <div class="repcard_btm">
            <div class="repbtm_chr">
              <div class="repchr_font">{{reply.userName}}</div>
              <div class="repchr_font"><span>{{reply.date}}</span>发表</div>
            </div>
          </div>
        </div>
      </div> -->
      <el-divider></el-divider>
    </div>
  </div>  
</template>

<script>
import { mapState} from 'vuex'

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
      backcomments: []
    }
  },
  computed: {
    ...mapState([ 'accountInfo', 'tempInfo' ])
  },
  methods: {
    goBack() {
      console.log('go back');
       this.$router.back(-1)
    },
    async getBackcms() {
      console.log(this.tempInfo.oneTalking.id)
      const {data: res} = await this.$http.post('/get_comments', {talking_id: this.tempInfo.oneTalking.id})
      console.log(res)
      if(res.status==200) {
        this.backcomments = JSON.parse(JSON.stringify(res.data))
        for(let comt of this.backcomments) {
          comt.replys = [] 
        }
        for(let comt of this.backcomments) {
          // console.log(comt)
          // comt.replys = []
          if(comt.reply_num > 0) {
            const {data: reps} = await this.$http.post('/get_replies', {comment_id: comt.comment_id})
            console.log(reps)
            if(reps.status == 200) {
              comt.replys = JSON.parse(JSON.stringify(reps.data))
            }
          }
        }
        
      }
    },
    async sendReply() {
      let asc = {
        // comment_id: this.tempInfo.oneTalking.id,
        user_id: this.accountInfo.user_id,
        talking_id: this.tempInfo.oneTalking.id,
        content: this.textareas
      }
      const {data: res} = await this.$http.post('/send_comment', asc)
      console.log(res)
      if(res.status == 200) {
        this.textareas = ''
        this.getBackcms()
        this.tempInfo.oneTalking.replyNum ++
        this.$message({
          message: res.message + '！',
          type: 'success'
        })
      }else {
        this.$message({
          message: res.message + '！',
          type: 'error'
        })
      }
    },
    async delcomt(){
      const {data: res} = await this.$http.post('/del_talking', {talking_id: this.tempInfo.oneTalking.id})
      console.log(res)
      if(res.status == 200) {
        this.goBack()
        this.$message({
          message: res.message + '！',
          type: 'success'
        })
      }else {
        this.$message({
          message: res.message + '！',
          type: 'error'
        })
      }
    }
  },
  mounted() {
    this.getBackcms()
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

/* 回复 */
.repbackcon {
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: 15px;
}
.repcard_btm {
  display: flex;
  justify-content: space-between;
}
.repbtm_chr {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.repchr_font {
  margin: 5px;
  margin-top: 10px;
  font-size: 10px;
  color: #606266;
}
.repcont {
  margin-left: 50px;
}
</style>