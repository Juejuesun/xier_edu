<template>
  <div class="mainbox">
    <div>
      <el-page-header @back="goBack" :content="$route.query.row" title="作业"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div>
      <h4>标题：<span>{{tempInfo.oneHomework.details_name}}</span></h4>
      <p>内容：{{worktent.content}}</p>
      <p style="margin-left: 3em">
        <el-image
          v-for="(img, index) in worktent.imgs"
          :key="index"
          style="width: 100px; height: 100px; margin-right: 10px;"
          :src="img"
          :preview-src-list="$route.query.rowInfo.pictures"
        ></el-image>
      </p>
    </div>
    <div>
       <el-button type="info" @click="checkowe" plain>批改作业</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: false,
      borderColor: "#dcdfe6",
      dialogTableVisible: false,
      form: {
        title: "",
        module: "",
        content: "",
      },
      worktent: {},
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        module: [
          {
            required: true,
            message: "请选择模块",
            trigger: "change",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["accountInfo", "tempInfo"]),
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.back(-1);
    },
    checkowe() {
      this.$router.push({
        name: 'PaperCheck',
        // query: {
        //   row: row.details_name
        })
    },
    onEditorChange({ quill, html, text }) {
      // 内容改变事件
      this.form.content = html;
    },
    // handleSee() {
    //   this.$refs["form"].validate((valid) => {
    //     this.$refs.form.validateField("content", (errorMsg) => {
    //       this.borderColor = "#dcdfe6";
    //       if (errorMsg) {
    //         this.borderColor = "#F56C6C";
    //       }
    //     });
    //     if (valid) {
    //       this.dialogTableVisible = true;
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    async getWorkContent() {
      const {data: reswork} = await this.$http.post('/get_work', {assignment_id: this.tempInfo.oneHomework.details_id})
      console.log(reswork)
      if(reswork.status == 200) {
        this.worktent = JSON.parse(JSON.stringify(reswork.data))
      }
      if(this.tempInfo.oneHomework.details_isdone) {
        let asc = {
          user_id: this.accountInfo.user_id,
          assignment_id: this.tempInfo.oneHomework.details_id
        }
        const { data: res } = await this.$http.post("/std/get_submit", asc);
        console.log(res)
        if (res.status == 200) {
          this.form.content = res.data[0].content;
        }
      }
      
    },
  },
  created() {
    this.getWorkContent()
  },
};
</script>

<style scoped>
.mainbox {
  margin-left: 20px;
  margin-right: 20px;
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
</style>

<style lang="scss" scoped>
.backbtn {
  font-size: 1.2em;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
  width: 50px;
  color: #409eff;
}

// .news {
//   &-title {
//     text-align: center;
//   }

//   &-content {
//     ::v-deep {
//       p {
//         line-height: 30px;

//         img {
//           display: block;
//           margin-right: auto;
//           margin-left: auto;
//         }
//       }
//     }
//   }
// }
</style>