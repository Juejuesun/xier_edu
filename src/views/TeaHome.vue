<template>
  <el-container>
    <el-header class="header_box">
      <div class="inpout">
        <!-- <input class="inpbox" placeholder="请输入课程名称"/>
        <div class="scbtn"><i class="el-icon-search"></i></div> -->
      </div>
      <div class="asibtn">
        <div class="userh" @click="pgchange('home')">
          <i class="el-icon-user"></i>
        </div>
        <el-button size="small" type="info" round @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-main style=" padding: 0; margin: 0">
      <el-container style=" padding: 0;">
        <el-aside width="250px">
          <div class="infobox">
            <el-avatar style="border: 1px solid #606266;" :size="80" :src="accountInfo.avadar" @click.native="dialogTableVisible=true">头像</el-avatar>
            <div class="inlineinfo">{{accountInfo.name}}</div>
            <div class="inlineinfo">登陆时间：<span style="font-size: 5px;">{{accountInfo.date}}</span></div>
            <div class="inlineinfo">总班级数：<span>{{accountInfo.classNum}}</span></div>
            <div class="inlineinfo saftybox" @click="pgchange('grs')">
              <i class="el-icon-user" style="margin-right: 5px;"></i><span>个人中心</span>
            </div>
            <div class="inlineinfo saftybox" @click="pgchange('sft')">
              <i class="el-icon-price-tag" style="margin-right: 5px;"></i><span>安全设置</span>
            </div>
            <div class="inlineinfo saftybox" @click="pgchange('meg')">
              <i class="el-icon-collection" style="margin-right: 5px;"></i><span>班级管理</span>
            </div>
            <div class="inlineinfo saftybox" @click="pgchange('new')">
              <i class="el-icon-set-up" style="margin-right: 5px;"></i><span>申请新班级</span>
            </div>
          </div>
          <!-- <div class="messagebox">消息通知</div> -->
          
          <!-- 更换头像 -->
          <div>
                <el-dialog :visible.sync="dialogTableVisible" center :close-on-click-modal="false" :destroy-on-close="true" @close="closeDia">
                    <template slot="title">
                        <div class="titlebox">更换头像</div>
                    </template>
                    <div>
                        <div class="previewBox">
                            <el-avatar style="border: solid 1px #C0C4CC;" shape="square" :size="250" :fit="fit" :src="previewImg">gg</el-avatar>
                        </div>
                        <div class="previewBox">
                            <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"                           
                            :show-file-list="false"
                            :on-change='changeUpload'
                            :auto-upload="false"
                            :before-upload="beforeAvatarUpload">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>  
                        </div>
                    </div>
                </el-dialog>
            </div>
            <!-- 裁剪图片 -->
            <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
                <div class="cropper-content">
                    <div class="cropper" style="text-align:center">
                    <VueCropper
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="true"
                        :full="option.full"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :autoCrop="option.autoCrop"
                        :fixed="option.fixed"
                        :fixedNumber="option.fixedNumber"
                        :centerBox="option.centerBox"
                        :infoTrue="option.infoTrue"
                        :fixedBox="option.fixedBox"                        
                    ></VueCropper>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancle">取 消</el-button>
                    <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
                </div>
            </el-dialog>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
import { mapState } from "vuex";

export default {
  components: {
        VueCropper
    },
    computed: {
      ...mapState(["accountInfo"]),
    },
    data () {
        return {
            fit: 'cover',
            dialogTableVisible: false,
            dialogVisible: false,
            previewImg: '',
            oldImg: '',

            // 裁剪组件的基础配置option
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                // autoCropWidth: 200, // 默认生成截图框宽度
                // autoCropHeight: 200, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [5, 5], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            picsList: [],  //页面显示的数组
            // 防止重复提交
            loading: false,

        }
    },
  methods: {
    pgchange(targ) {
      if(targ=='sft') { //进入安全设置
        this.$router.push({path: '/teahome/saftypg'})
      }else if(targ=='home') { //进入个人住院日
        this.$router.push({path: '/teahome/classlist'})
      }else if(targ=='meg') { //班级管理
        this.$router.push({path: '/teahome/meglist'})        
      }else if(targ == 'new') {
        this.$router.push({path: '/teahome/addnew'})
      }else {
        this.pgchange('home')
      }
    },
    handlePreview(file) {
            console.log(file);
        },
        async beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log(file)
            this.previewImg = await this.transforBase(file)
            
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        async transforBase(file) {
            // let temp = ''
            function reader (file) {
                return new Promise(function (resolve, reject) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file)        
                    reader.onload = function () {
                        resolve(reader);
                    };
                    reader.onerror = reject;
                });
            }

            let {result: temp} = await reader(file)
            // console.log('外面',temp)
            return temp
        },
        changeUpload(file, fileList) {
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!')
                return false
            }
            this.fileinfo = file.raw
            console.log('列表',file.raw)
            // 上传成功后将图片地址赋值给裁剪框显示图片
            this.$nextTick( async () => {
                this.option.img = await this.transforBase(file.raw)
                this.dialogVisible = true
            })
        },
        cancle() {
            this.previewImg = this.oldImg
            this.loading = false
            this.dialogVisible = false
        },
        closeDia() {
            this.previewImg = this.oldImg
            this.loading = false
        },
        finish() {
            this.$refs.cropper.getCropData(async(data) => {
                var fileName = 'goods' + this.fileinfo.uid
                // console.log('装酒',data)                
                this.loading = true
                this.previewImg = data
                
                let asc = {
                  user_id: this.accountInfo.user_id,
                  user_face: this.previewImg,
                }
                const { data: res } = await this.$http.post('/update_face', asc)
                console.log(res)
                // let res = {}
                // if(this.userInfo.userRoot===1) {
                //     const {data: ress} = await this.$http.post('/student/updatePicture', asc)
                //     res = ress
                // }else {
                //     const {data: rest} = await this.$http.post('/teacher/updatePicture', asc)
                //     res = rest
                // }
                // console.log(res)
                if (res.status == 200) {
                  this.accountInfo.avadar = this.previewImg;
                  this.oldImg = this.accountInfo.avadar;
                  // this.previewImg =t ''
                  this.dialogVisible = false;
                  this.loading = false;
                  this.$message({
                    message: "上传成功！",
                    type: "success",
                  });
                } else {
                  this.$message({
                    message: "上传失败！",
                    type: "error",
                  });
                  this.previewImg = this.oldImg;
                  this.loading = false;
                }
                this.dialogTableVisible = false;
                //上传阿里云服务器
                // client().put(fileName, data).then(result => {
                // this.dialogVisible = false
                // this.picsList.push(result.url)
                // }).catch(err => {
                // console.log(err)
                // this.loading = false
                // })
            })
        },
    logout() {
      this.$store.dispatch('userSignOut')
      this.$router.push({path: '/login'})
    }
  },
  created() {
    // this.previewImg = 'data:image/jpg;base64,'+ this.accountInfo.avadar
    this.previewImg = this.accountInfo.avadar
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
  margin: 5px;
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

<style lang="scss" scoped>
.previewBox {
    display: flex;
    justify-content: center;
    margin: 10px;
}

.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
</style>