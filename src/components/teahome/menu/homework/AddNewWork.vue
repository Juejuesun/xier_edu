<template>
  <div class="mainbox">
    <div>
      <el-page-header @back="goBack" :content="$route.query.row" title="作业"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div>
      <h4>发布作业</h4>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择章节">
          <el-select v-model="form.region" placeholder="章节选择">
            <!-- <el-option label="加在最前" value="0"></el-option> -->
            <el-option
              v-for="(item, index) in homeworkList"
              :key="index"
              :label="'第 ' + (index+1) + ' 章'"
              :value="item.name"
            ></el-option>
            <!-- <el-option label="加在最后" value="1"></el-option> -->
          </el-select>
          <span> . </span>
          <el-button type="primary" @click="EditVisible = !EditVisible">创建新章节</el-button>
        </el-form-item>
        <el-form-item label="作业名称">
          <el-input v-model="form.workTitle"></el-input>
        </el-form-item>
        <el-form-item label="作业内容">
          <el-input type="textarea" v-model="form.workContext"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            ref="uploadpub"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :before-upload="handleBefore"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
            <!-- <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>-->
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- <el-form-item label="作业号" style="width: 50%;">
                            <el-input v-model="form.workId"></el-input>
        </el-form-item>-->
        <el-form-item label="截止时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.workCloseTime"
            value-format="yyyy-MM-dd"
            style="width: 50%;"
          ></el-date-picker>
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
          v-for="(item, index) in homeworkList"
          :key="index"
          :label="'在第 ' + (index+1) + ' 章后加入'"
          :value="item.name"
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
import { mapState } from "vuex"

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
        title: '',
        chapter: ''
      },
    };
  },
  computed: {
    ...mapState(["accountInfo", "tempInfo", "homeworkList"]),
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.back(-1);
    },
    cancleadd() {
      this.addnewchap.title = ''
      this.addnewchap.chapter = ''
    },
    async subchap() {
      if(this.addnewchap.title && this.addnewchap.chapter) {
        let asc = {
          class_id: this.tempInfo.class_id,
          title: this.addnewchap.title,
          before: this.addnewchap.chapter
        }
        const {data: res} = await this.$http.post('/tech/create_fc', asc)
        console.log(res)
        if(res.status == 200) {
          this.$store.dispatch('getHomeworkList')
          this.$message({
            message: res.message +'！',
            type: "success",
          });
          this.EditVisible = false
        }else {
          this.$message({
            message: res.message +'！',
            type: 'error',
          });
        }
      }else {
        this.$message({
          message: '信息未填完整！',
          type: 'error',
        });
      }
      

    },
    async transforBase(file) {
      //图片转base64
      function reader(file) {
        return new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            resolve(reader);
          };
          reader.onerror = reject;
        });
      }

      let { result: temp } = await reader(file);
      return temp;
    },
    async handleBefore(file) {
      console.log(file);
      let tem = await this.transforBase(file);
      this.iconBase64.push(tem);
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
      await this.$refs.uploadpub.submit();
      console.log("submit!");
      this.form.pictures = this.iconBase64;
      console.log(this.form.pictures);
      // 发送请求，暂无图片
      let asc = {
        sc_id: this.form.region,
        title: this.form.workTitle,
        content: this.form.workContext,
        // closeTime: this.form.workCloseTime,
        imgs: this.form.pictures,
      }
      // for (let v of this.form.pictures) {
      //   let s = {
      //     context: v,
      //   };
      //   asc.pictures.push(s);
      // }
      console.log('pictures', asc.imgs)
      const { data: res } = await this.$http.post("/tech/submit_work", asc);
      console.log(res);
      if (res.status == 200) {
        // this.form.workId = res.workId;
        let item = this.deepClone(this.form);
        // this.homeworkList.splice(0, 0, item);
        this.form.pictures = []; //清空列表
        this.iconBase64 = [];
        this.$refs.uploadpub.clearFiles();
        this.clearform();
        this.$message({
          message: "发布成功！",
          type: "success",
        });
        this.loading = false
      } else {
        this.$message({
          message: "请求失败！",
          type: "error",
        });
        this.loading = false
        return false;
      }
      this.loading = false;
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