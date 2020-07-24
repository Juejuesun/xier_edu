<template>
  <div class="login_con">
    <div class="headerbox">教育平台</div>
    <div class="mainbox">
      <div class="imgbox">
        <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
      </div>
      <div class="login_box">
        <div class="angle">
          <div :class="{angbox: true ,angboxact: ruleForm.identity==1}" @click="handleClick(1)">我是学生</div>
          <div :class="{angbox: true ,angboxact: ruleForm.identity==2}" @click="handleClick(2)">我是教师</div>
        </div>
        <el-form
          hide-required-asterisk
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号:" prop="id" class="name">
            <el-input style="width: 280px" v-model="ruleForm.id" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              style="width: 280px"
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <div class="inlinebox">
            <el-checkbox v-model="ruleForm.checked">十天内免登陆</el-checkbox>
            <!-- <div></div> -->
            <el-link>忘记密码 <i class="el-icon-question"></i></el-link>
            <!-- <div></div> -->
          </div>
          <div class="btnbox">
            <el-button
              type="primary"
              round
              style="background-color: rgba(126,183,208); border-color:#fff; width: 160px; font-size: 20px;"
              @click="submitForm"
            >登陆</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: "12345601",
        password: "11111111",
        identity: 1,
        checked: false
      },
      rules: {
        id: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(ang) {
      this.ruleForm.identity = ang;
      if (ang === 1) {
        this.ruleForm.id = "123402311";
      } else {
        this.ruleForm.id = "159001";
      }
    },
    submitForm() {
      // let that = this
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          console.log("登陆");
          if(this.ruleForm.identity=='1') {
            this.$router.push({path: '/stuhome'})
          }else {
            this.$router.push({path: '/teahome'})
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.headerbox {
  height: 10%;
  min-height: 60px;
  background-color: #ffff;
  font-size: 26px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.login_con {
  background: rgba(242, 242, 242);
  height: 100%;
  width: 100%;
  min-height: 600px;
  position: fixed;
}

.login_box {
  height: 400px;
  width: 400px;
  margin: 30px;
  border-radius: 20px;
  background-color: #ffff;
  border: solid 1px #EBEEF5;
}

.demo-ruleForm {
  /* align-self: center; */
  /* width: 70%; */
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.btnbox {
  text-align: center;
  margin: 30px;
}
.inlinebox {
  display: flex;
  justify-content: space-around;
}
.angle {
  display: flex;
  width: 100%;
  font-size: 20px;
  margin-bottom: 60px;
  border: solid 1px #EBEEF5;
  border-radius: 10px 10px 0 0;
}
.angbox {
  height: 45px;
  width: 50%;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.angboxact {
  background-color: rgba(126,183,208);
  color: #fff;
}

.imgbox {
  width: 50%;
  height: 350px;
  margin: 20px;
}

.mainbox {
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
}
</style>