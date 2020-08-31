<template>
  <el-container>
    <el-header class="header_box">
      <div class="backbox" @click="backbtn">
        <i class="el-icon-arrow-left"></i> 返回
      </div>
      <div class="asibtn">
        <div class="userh" @click="pgchange">
          <i class="el-icon-user"></i>
        </div>
        <el-button size="small" type="info" round>退出</el-button>
      </div>
    </el-header>
    <el-main style=" padding: 0; margin: 0;">
      <el-container style=" padding: 0; height: 100%;">
        <el-aside width="400px" style="heignt: 100%;" class="boxs">
          <el-main>
            <!-- <sheet-list :item="sheetList"/> -->
            <sheet-list v-for="(item,index) in videoList" :item="item" :key="index" @plus="updateUrl"></sheet-list>
          </el-main>
        </el-aside>
        <el-main style="background: rgba(242,242,242); height: 100%;">
          <!-- <el-row :gutter="15"> -->
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"> -->
            <el-card shadow="hover" calss="playerbox" style="padding: 0;">
              <div slot="header">{{playrow.details_name}}</div>
              <byui-player-mp4 :config="config1" @player="Player1 = $event" />
            </el-card>
          <!-- </el-col> -->
          <!-- </el-row> -->
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { ByuiPlayerMp4 } from "@/plugins/byuiPlayer.js"
// import Video from '../menu/Video'
import playerSheetList from "./playerSheetList";
import { mapState} from 'vuex'

export default {
 components: {
    ByuiPlayerMp4,
    // Video,
    'sheet-list': playerSheetList
  },
  data() {
    return {
      config1: {
        id: "mse1",
        url: "https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4",
        volume: 1,
        autoplay: false,
      },
      Player1: null,
      playrow: {},
      sheetList: [
        {
          id: 1,
          name: "第一章：白杨树",
          num: 2,
          details: [
            {
              details_iswatch: true,
              details_id: 1,
              details_name: "第一节：白杨礼赞",
              details_num: 30,
            },
            {
              details_iswatch: false,
              details_id: 2,
              details_name: "第二节：白杨",
              details_num: 15,
            },
          ],
        },
        {
          id: 1,
          name: "第一章：白杨树",
          num: 2,
          details: [
            {
              details_iswatch: true,
              details_id: 1,
              details_name: "第一节：白杨礼赞",
              details_num: 30,
            },
            {
              details_iswatch: false,
              details_id: 2,
              details_name: "第二节：白杨",
              details_num: 15,
            },
          ],
        },
        {
          id: 2,
          name: "第二章",
          num: 2,
          details: [
            {
              details_iswatch: false,
              details_id: 1,
              details_name: "这应该是你比较喜欢听的歌曲了",
              details_num: 10,
            },
            {
              details_iswatch: true,
              details_id: 2,
              details_name: "欧美风格的音乐，安静的听",
              details_num: 2,
            },
          ],
        },
      ]
    }
  },
  computed: {
    ...mapState([ 'accountInfo', 'tempInfo', 'videoList' ])
  },
  methods: {
    backbtn() {
      this.$router.push({path: '/stuclass/video'})
    },
    pgchange() {
      this.$router.push({path: '/stuhome/classlist'})
    },
    updateUrl(newUrl) {
      this.config1.url = newUrl
    }
  },
  created() {
    this.playrow = JSON.parse(this.$route.query.row)
    this.config1.url = 'http://' + this.playrow.details_movie
  }
}
</script>

<style scoped>
.userh {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dcdfe6;
  color: #909399;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  margin: 0 20px 0 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.backbox {
  background-color: rgba(136, 214, 248);
  height: 100%;
  width: 8%;
  font-size: 1.5em;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.backbox:hover {
  background-color: rgb(157, 222, 250);
}
.asibtn {
  display: flex;
  height: 100%;
  height: 30px;
  /* align-self: center; */
}
.header_box {
  height: 50px;
  padding-left: 0;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  justify-content: space-between;
  -moz-box-shadow: 0px 1px 3px #adadad;
  -webkit-box-shadow: 0px 1px 3px #adadad;
  box-shadow: 0px 1px 3px #adadad;
}

/* asider */

.infobox {
  /* width: 90%; */
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.boxs {
  margin-top: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.playerbox {
  /* height: 130px; */
  width: 50%;
}
</style>