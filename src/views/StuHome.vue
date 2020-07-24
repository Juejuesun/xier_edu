<template>
  <el-container>
    <el-header class="header_box">
      <div class="inpout">
        <input class="inpbox" placeholder="请输入课程名称"/>
        <div class="scbtn"><i class="el-icon-search"></i></div>
      </div>
      <div class="asibtn">
        <div class="userh" @click="pgchange('home')">
          <i class="el-icon-user"></i>
        </div>
        <el-button size="small" type="info" round>退出</el-button>
      </div>
    </el-header>
    <el-main style=" padding: 0; margin: 0">
      <el-container style=" padding: 0;">
        <el-aside width="250px">
          <div class="infobox">
            <el-avatar style="border: 1px solid #606266;" :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">头像</el-avatar>
            <div class="inlineinfo">江小白</div>
            <div class="inlineinfo">登陆时间：2020.7.10 9:00</div>
            <div class="inlineinfo">总学习时长：20小时</div>
            <div class="inlineinfo saftybox" @click="pgchange('sft')">
              <i class="fa fa-shield" style="margin-right: 5px;"></i><span>安全设置</span>
            </div>
          </div>
          <div class="messagebox">
            消息通知
          </div>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    pgchange(targ) {
      if(targ=='sft') {
        this.$router.push({path: '/stuhome/saftypg'})
      }else {
        this.$router.push({path: '/stuhome/classlist'})
      }
    }
  }
}
</script>

<style scoped>
.userh {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #DCDFE6;
  color: #909399;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  margin: 0 20px 0 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.inpbox {
  width: 250px;
  height: 2rem;
  border-radius: 20px;  
  background: #F2F2F2;  
  border: 1px solid #ffff;
  /* border: 1px solid #CCCCCC; */
  outline: none;  
  font-size: 1rem;
  color: #737373;
  letter-spacing: 1px;
  text-indent: 2rem;
}
.inpout {
  display: flex;
  /* align-items: center; */
}
.scbtn {
  height: 2rem;
  width: 4rem;
  background: #737373;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 20px;  
  transform: translate(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
}
.asibtn {
  display: flex;
  height: 100%;
  height: 30px;
  /* align-self: center; */
}
.header_box {
  height: 50px;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  justify-content: flex-end;
  -moz-box-shadow:0px 1px 3px #ADADAD; -webkit-box-shadow:0px 1px 3px #ADADAD; box-shadow:0px 1px 3px #ADADAD;
}

/* asider */

.infobox {
  border: 1px solid #606266;
  border-radius: 20px;
  width: 90%;
  /* height: 300px; */
  padding: 3%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inlineinfo {
  margin: 10px;
}
.saftybox {
  background-color: #E4E7ED;
  padding: 0.5em;
  letter-spacing: 3px;
  border-radius: 20px;
  cursor: pointer;
}
.saftybox:hover{
  background-color: #C0C4CC;
}

.messagebox {
  width: 90%;
  padding: 3%;
  border: 1px solid #E4E7ED;
  font-size: 1.5em;
  text-align: center;
  background-color: #E4E7ED;
  
}
</style>
