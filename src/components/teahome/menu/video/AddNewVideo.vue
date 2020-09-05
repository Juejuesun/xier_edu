<template>
  <div class="mainbox">
    <div>
      <el-page-header @back="goBack" :content="$route.query.row" title="作业"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div>
      <h4>发布课程</h4>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择章节">
          <el-select v-model="form.region" placeholder="章节选择">
            <!-- <el-option label="加在最前" value="0"></el-option> -->
            <el-option
              v-for="(item, index) in videoList"
              :key="index"
              :label="'第 ' + (index+1) + ' 章'"
              :value="item.id"
            ></el-option>
            <!-- <el-option label="加在最后" value="1"></el-option> -->
          </el-select>
          <span>.</span>
          <el-button type="primary" @click="EditVisible = !EditVisible">创建新章节</el-button>
        </el-form-item>
        <el-form-item label="课程标题">
          <el-input v-model="form.workTitle"></el-input>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- <el-upload
            ref="uploadpub"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :before-upload="handleBefore"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload> -->

          <!-- http://47.96.231.121/tech/create_sc   :data="uploadData"-->
          <el-upload
            ref="uploadpub"
            class="upload-demo"
            action="http://47.96.231.121/tech/create_sc" 
            
            :before-upload="beforeUploadVideo"
            :on-remove="handleRemove"
            :auto-upload="false"
            list-type="picture-card"
            accept=".mp4"
            multiple :limit="1" :on-success="handleVideoSuccess">
            <i class="el-icon-upload"></i>
            <div slot="tip" class="el-upload__tip">只能上传mp4文件/不超过500M</div>
            <el-progress v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top:30px;"></el-progress>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog> -->

          <!-- <el-upload
            class="avatar-uploader el-upload--text"
            :action="uploadUrl"
            :show-file-list="false"
            accept=".mp4"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
            :on-progress="uploadVideoProcess"
          >
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top:30px;"
            ></el-progress>
            <el-button
              class="video-btn"
              slot="trigger"
              size="small"
              v-if="isShowUploadVideo"
              type="primary"
            >选取文件</el-button>
          </el-upload>
          <P v-if="isShowUploadVideo" class="text">请保证视频格式正确，且不超过20M</P> -->
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="onSubmit">立即发布</el-button>
          <el-button @click="cancleSub('pub')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog
        :visible.sync="EditVisible"
        center
        :close-on-click-modal="false"
        :destroy-on-close="true"
        @close="cancleadd"
      >
        <el-form :model="addnewchap" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="addnewchap.title" placeholder="请输入新章节标题"></el-input>
          </el-form-item>
          <el-form-item label="章节">
            <el-select v-model="addnewchap.chapter" placeholder="章节选择">
              <el-option label="在最前加入" value="front"></el-option>
              <el-option
                v-for="(item, index) in videoList"
                :key="index"
                :label="'在第 ' + (index+1) + ' 章后加入'"
                :value="item.id"
              ></el-option>
              <el-option label="在最后加入" value="last"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subchap">创建</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: false,
      dialogImageUrl: "",
      dialogVisible: false,
      iconBase64: [],
      EditVisible: false,
      form: {
        workId: "",
        workTitle: "",
        workCloseTime: "",
        workContext: "",
        pictures: [],
        isShow: false,
        region: "",
      },
      addnewchap: {
        title: "",
        chapter: "",
      },

      uploadUrl: "", //你要上传视频到你后台的地址
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false, //显示上传按钮

      uploadData: {},
      files: new FormData()
    };
  },
  computed: {
    ...mapState(["accountInfo", "tempInfo", "homeworkList", "videoList"]),
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.back(-1);
    },
    cancleadd() {
      this.addnewchap.title = "";
      this.addnewchap.chapter = "";
    },
    async subchap() {
      if (this.addnewchap.title && this.addnewchap.chapter) {
        let asc = {
          class_id: this.tempInfo.class_id,
          title: this.addnewchap.title,
          before: this.addnewchap.chapter,
        };
        const { data: res } = await this.$http.post("/tech/create_fc", asc);
        console.log(res);
        if (res.status == 200) {
          this.$store.dispatch("getHomeworkList");
          this.$message({
            message: res.message + "！",
            type: "success",
          });
          this.EditVisible = false;
        } else {
          this.$message({
            message: res.message + "！",
            type: "error",
          });
        }
      } else {
        this.$message({
          message: "信息未填完整！",
          type: "error",
        });
      }
    },


    beforeUploadVideo(file) {
      if (["video/mp4"].indexOf(file.type) == -1) {
        'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      // this.isShowUploadVideo = false;
      // this.uploadData.title = this.form.workTitle
      // this.uploadData.fc_id = this.form.region
      // this.uploadData.class_id = this.tempInfo.class_id

      // this.files = file
      this.files.append('file', file)
      // this.uploadData.file = file
      // console.log(file)
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },

    //上传成功回调
    handleVideoSuccess(res, file) {
      console.log(file)
      console.log(res)
      this.loading = false
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 200) {
        this.$message({
            message: res.message + "！",
            type: "success",
          });
        this.cancleadd()
        this.$refs.uploadpub.clearFiles();
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },



    
    async handleBefore(file) {
      console.log(file);
      let tem = await this.transforBase(file);
      this.iconBase64.push(tem);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
    },
    deepClone(obj) {
      let clone = {};
      for (let key in obj) {
        clone[key] = obj[key];
      }
      return clone;
    },
    clearform() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.form.isShow = false;
    },
    async onSubmit() {
      this.loading = true;      
      console.log("submit!");
      let asc = {
        fc_id: this.form.region,
        title: this.form.workTitle
      }
      const {data: res} = await this.$http.post('/tech/save_scdata', asc)
      console.log(res)
      if (res.status == 200) {
        // this.$message({
        //     message: res.message + "！",
        //     type: "success",
        //   });
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
      setTimeout(async () => {
          await this.$refs.uploadpub.submit();
        }, 2000);
    },
    cancleSub(str) {
      this.form.pictures = []; //清空列表
      this.iconBase64 = [];
      this.clearform();
      if (str === "pub") {
        this.$refs.uploadpub.clearFiles();
      } else {
        this.$refs.upload.clearFiles();
      }
    },
    async handleRemove(file, fileList) {
      console.log(file, fileList);
      this.iconBase64 = [];
      for (let v of fileList) {
        console.log(v);
        let tem = await this.transforBase(v.raw);
        this.iconBase64.push(tem);
      }
      console.log("移除后", this.iconBase64);
    },
  },
  created() {},
};
</script>

<style scoped>
.mainbox {
  margin-left: 20px;
  margin-right: 20px;
}

</style>