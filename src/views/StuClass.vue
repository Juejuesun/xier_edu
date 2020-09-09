<template>
  <el-container>
    <el-header class="header_box">
      <div class="backbox" @click="backbtn">
        <i class="el-icon-arrow-left"></i> 返回
      </div>
      <div class="asibtn">
        <div class="userh" @click="pgchange('grs')">
          <!-- <i class="el-icon-user"></i> -->
          <el-avatar size="small" :src="accountInfo.avadar"><i class="el-icon-user"></i></el-avatar>
        </div>
        <!-- <el-button size="small" type="info" round @click="logout">退出</el-button> -->
        <!-- <button class="button type2" @click="logout">退出</button> -->
        <el-popover
        placement="bottom"
        width="80"
        trigger="hover"
        >
        <div>
          <div class="btnhead"  @click="pgchange('grs')">个人中心</div>
          <div class="btnhead"  @click="pgchange('sft')">安全设置</div>
        </div>
        <button class="button type2" slot="reference" @click="logout">退出</button>
      </el-popover>
      </div>
    </el-header>
    <el-main style=" padding: 0; margin: 0;">
      <el-container style=" padding: 0; height: calc(90vh);">
        <el-aside width="260px" style="background: rgba(242,242,242); heignt: 100%;" class="boxs ">
          <div class="infobox">
            <el-image
              style="width: 100%; height: 150px;border-radius: 10px;"
              src="https://gitee.com/juejuesun/pic-tyo/raw/master/img/1583115478206.jpeg"
              fit="fit"
            ></el-image>
          </div>
          <div class="messagebox">
            <router-link to="/stuclass/announcement">
              <div class="bx">公告</div>
            </router-link>
            <router-link to="/stuclass/video">
              <div class="bx">课程</div>
            </router-link>
            <router-link to="/stuclass/homework">
              <div class="bx">作业</div>
            </router-link>
            <router-link to="/stuclass/disscuss">
              <div class="bx">讨论区</div>
            </router-link>
          </div>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(["accountInfo"]),
  },
  methods: {
    backbtn() {
      this.$router.push({ path: "/stuhome/classlist" });
    },
    // pgchange() {
    //   this.$router.push({path: '/stuhome/classlist'})
    // },
    pgchange(targ) {
      if (targ == "sft") {
        this.$router.push({ path: "/stuhome/saftypg" });
      }else if(targ == 'grs') {
        this.pgchange('home')
      }else {
        this.$router.push({ path: "/stuhome/classlist" });
      }
    },
    logout() {
      this.$store.dispatch('userSignOut')
      this.$router.push({path: '/login'})
    }
  },
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
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.messagebox {
  width: 90%;
  padding: 3%;
  border: 1px solid #e4e7ed;
  font-size: 1.2em;
  background-color: #ffff;
  border-radius: 10px;
}

</style>

<style lang="scss" scoped>
.outerbox {
  padding: 10px;
  color: #303133;
  text-decoration: none;
  margin: 10px;
  font-weight: 600;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  cursor: pointer;
}
a {
  color: #303133;
  text-decoration: none;
  // margin: 10px;
  font-weight: 600;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB","Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 0;
  // padding: 0;
  .bx {
    padding: 10px;
    border-bottom: 1px solid #e4e7ed;
  }
}
a:hover {
  color: #fff;
  .bx {
    background: rgb(157, 222, 250);
  }
}
a:active {
  color: #fff;
  .bx {
    background: rgb(136, 214, 248);
  }
}
.router-link-exact-active {
  color: #fff;
  .bx {
    background: rgb(136, 214, 248);
  }
}
.router-link-active {
  color: #fff;
  .bx {
    background: rgb(136, 214, 248);
  }
}
</style>