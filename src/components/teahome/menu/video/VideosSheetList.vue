<template>
  <div class="sheet-list">
    <div class="sheet-header" @click="toggleSheet">
      <i class="el-icon-arrow-right" ref="toggleicon"></i>
      <span class="sheet-header-span">
        {{item.name}}
        <span>({{item.num}})</span>
      </span>
      <span class="en-btn1">
        <el-button  type="info" v-show="tempInfo.isShowVideo" size="mini" @click.stop="rename('chap')">重命名</el-button>
        <el-button  type="danger" v-show="tempInfo.isShowVideo" size="mini" @click.stop="removehw('chap')" icon="el-icon-delete" circle></el-button>
      </span>
    </div>

    <div
      v-show="showSheets"
      class="sheet-content"
      v-for="(i, index) in item.details"
      :key="index"
       @click.stop="showSheetMenu(i)"
    >
      <div class="sheet-content-iswatch">
        <i v-if="i.details_iswatch" class="el-icon-success" style="color: rgb(59,169,246)"></i>
        <i v-else class="el-icon-circle-check"></i>
      </div>
      <div class="sheet-content-middle">
        <p style>{{i.details_name}}</p>
      </div>
      <span class="en-btn2">
        <el-button  type="info" v-show="tempInfo.isShowVideo" size="mini" @click.stop="rename('class', i)">重命名</el-button>
        <el-button  type="danger" v-show="tempInfo.isShowVideo" size="mini" @click.stop="removehw('class', i)" icon="el-icon-delete" circle></el-button>
      </span>
    </div>
    <!-- 对话框 -->
    <div>
      <el-dialog
        :visible.sync="EditVisible"
        center
        :close-on-click-modal="false"
        :destroy-on-close="true"
        @close="cancleadd"
      >
      <el-form :model="renameForm" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="renameForm.newName" placeholder="请输入新名称"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="reprename">确定</el-button>
      <el-button @click="canclebtn">取消</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {},
  props: {
    item: {
      type: Object,
    }
  },
  data() {
    return {
      showSheets: false,
      data_item: {},
      EditVisible: false,
      renameForm: {
        newName: ''
      },
      tmp: {}
    }
  },
   computed: {
    ...mapState([ 'accountInfo', 'tempInfo', 'videoList' ])
  },
  methods: {
    //向右的小图标动画
    toggleSheet(index) {
      // console.log(this.$refs);
      this.$refs.toggleicon.style.transform = !this.showSheets
        ? "rotate(90deg)"
        : "rotate(0)";
      this.showSheets = !this.showSheets;
    },
    showSheetMenu(row) {
      this.$router.push({
        name: 'VideoPlayer',
        query: {
          row: JSON.stringify(row)
        }
      })
      this.tempInfo.oneHomework = JSON.parse(JSON.stringify(row))
    },
    cancleadd() {
      this.renameForm.newName = ''
    },
    canclebtn() {
      this.cancleadd()
      this.EditVisible = false
    },
    async reprename() {
      if(this.tmp.type === 'chap') {
        const {data: res} = await this.$http.post('/tech/rename_fc', {fc_id: this.item.id, name: this.renameForm.newName})
        console.log(res)
        if(res.status == 200) {
          this.item.name = this.renameForm.newName
          await this.$store.dispatch('getVideoList')
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
        const {data: res} = await this.$http.post('/tech/rename_sc', {sc_id: this.tmp.row.details_id, name: this.renameForm.newName})
        console.log(res)
        if(res.status == 200) {
          await this.$store.dispatch('getVideoList')
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
      }
    },
    rename(type, row) {
      this.EditVisible = true
      this.tmp.type = type
      this.tmp.row = row
      console.log(this.tmp)
    },
    async removehw(type, row) {
      if(type === 'chap') {
        const {data: res} = await this.$http.post('/tech/del_fc', {fc_id: this.item.id})
        console.log(res)
        if(res.status == 200) {
          await this.$store.dispatch('getVideoList')
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
        console.log(this.item)
        console.log(row)
        const {data: res} = await this.$http.post('/tech/del_sc', {assignment_id: row.details_id})
        console.log(res)
        if(res.status == 200) {
          await this.$store.dispatch('getVideoList')
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
      }
    }
  },
  created() {
    this.data_item = this.item;
  },
};
</script>

<style scoped>
.sheet-list {
  clear: both;
}
.sheet-header {
  height: 50px;
  background: rgb(195,234,252);
  position: relative;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
}
.sheet-header i:nth-child(1) {
  line-height: 30px;
  position: absolute;
  left: 10px;
  color: #666;
  transition: all 0.5s;
}
.sheet-header-i {
  line-height: 30px;
  position: absolute;
  right: 10px;
}
.sheet-header-span {
  left: 40px;
  font-size: 14px;
  position: absolute;
  line-height: 30px;
}
.sheet-content {
  position: relative;
  width: 100%;
  display: flex;
  cursor: pointer;
}
/* .sheet-content i:nth-child(2) { */
.sheet-content-i {
  font-size: 26px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
.sheet-content-iswatch {
  width: 40px;
  /* float: left; */
  /* text-align: center; */
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sheet-content-middle {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
}
.sheet-content-middle p {
  font-size: 16px;
  width: 70%;
  color: #666;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.en-btn1 {
  line-height: 30px;
  position: absolute;
  right: 10px;
}
.en-btn2 {
  line-height: 30px;
  position: absolute;
  right: 10px;
  
  align-self: center;
}
</style>