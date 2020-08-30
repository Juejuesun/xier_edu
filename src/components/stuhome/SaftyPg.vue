<template>
  <div>
    <div class="titles">
      <div class="iconbox">
        <i class="el-icon-refresh"></i>
      </div>
      <div class="titlebox">修改密码</div>
    </div>
    <!-- 表单 -->
    <div class="formBox">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="ruleFormbox"
      >
        <el-form-item label="原密码" prop="prePass">
          <el-input type="password" v-model="ruleForm.prePass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['accountInfo'])
  },
  data() {
    var checkPre = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入原密码"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    return {
      // fit: "cover",
      // dialogTableVisible: false,
      // dialogVisible: false,
      // previewImg: "",
      // oldImg: "",

      // 防止重复提交
      // loading: false,

      ruleForm: {
        pass: "",
        checkPass: "", //新密码
        prePass: "" //原密码
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        prePass: [{ validator: checkPre, trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // let asc = {
            //     id: this.userInfo.userId,
            //     prePassword: this.ruleForm.prePass,
            //     newPassword: this.ruleForm.checkPass,
            //     identity: this.userInfo.userRoot
            // }
            let asc = {
                user_id: this.accountInfo.user_id,
                old_password: this.ruleForm.prePass,
                new_password1: this.ruleForm.pass,
                new_password2: this.ruleForm.checkPass
            }
            const {data: res} = await this.$http.post('/update_password', asc)
            // console.log(res)
            if(res.status == 200) {
                this.$message({
                    message: '修改成功！',
                    type: 'success'
                })
            }else {
                this.$message({
                    message: '修改失败！'+ res.message,
                    type: 'error'
                })
            }
            this.clearform()
          } else {
            this.$message({
                message: '请求失败！',
                type: 'error'
            })
            this.$refs[formName].resetFields();
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      clearform() {
          this.$refs['ruleForm'].resetFields();
      }
    }
}
</script>

<style scoped>
.titlebox {
  font-size: 2em;
}
.iconbox {
  font-size: 3em;
  margin-right: 15px;
}
.titles {
  display: flex;
  align-items: center;
  color: #606266;
}

.formBox {
  display: flex;
  justify-content: flex-start;
}
.ruleFormbox {
    width: 40%;
    margin-top: 50px;
}
</style>