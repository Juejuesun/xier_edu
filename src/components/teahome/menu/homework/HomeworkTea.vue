<template>
  <div class="home">
    <div class="headerbtn">
      <div class="btns"> 
        <el-button type="primary" round size="medium" @click="addnewwork" v-show="!tempInfo.isShow">发布新作业</el-button>
        <el-button type="primary" round size="medium" @click="EditVisible = !EditVisible" v-show="tempInfo.isShow">创建新章节</el-button>
      </div>
      <div class="btns">
        <el-button type="primary" round size="medium" @click="cgang">{{btnName}}</el-button>
      </div>
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
    <sheet-list v-for="(item,index) in homeworkList" :item="item" :key="index"></sheet-list>
  </div>
</template>

<script>
// import HomeworkSheetList from "./HomeworkSheetList";
import HomeworkSheetList from "./HomeworkSheetList";
import { mapState} from 'vuex'

export default {
  components: { "sheet-list": HomeworkSheetList },
  data() {
    return {
      // isShow: false,
      btnName: '作业管理',
      addnewchap: {
        title: '',
        chapter: ''
      },
      EditVisible: false
    }
  },
  computed: {
    ...mapState([ 'accountInfo', 'tempInfo', 'homeworkList', 'videoList' ])
  },
  methods: {
    addnewwork() {
      this.$router.push({path: '/teaclass/homework/newwork'})
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
          await this.$store.dispatch('getHomeworkList')
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
    cgang() {
      this.tempInfo.isShow = !this.tempInfo.isShow
      if(this.tempInfo.isShow === false) {
        this.btnName = '作业管理'
      }else {
        this.btnName = '完成'
      }
    }
  },
  created() {
    this.$store.dispatch('getHomeworkList')
  }
};
</script>

<style scoped>
.headerbtn {
  display: flex;
  justify-content: flex-end;
}
.btns {
  margin: 12px;
}
</style>