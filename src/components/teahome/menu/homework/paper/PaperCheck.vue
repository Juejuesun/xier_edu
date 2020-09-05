<template>
    <div>
        <div>
          <span class="backbtn" @click="$router.back()"><i class="el-icon-back"></i></span>
          <!-- <span>作业号：{{prerow.workId}}</span> -->
          <el-divider direction="vertical"></el-divider>
          <span>已提交：{{subedInfo.total_num}}/{{subedInfo.stds_num}}</span>
        </div>
        <el-divider></el-divider>
        <el-table
            :data="subedInfo.details"
            stripe
            style="width: 100%">
            <el-table-column
            prop="from_user"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="id"
            label="学号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="submit_time"
            label="提交时间">
            </el-table-column>
          <!-- <el-table-column label="提交状况">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.subState==1">已提交</el-tag>
              <el-tag v-else type="danger">未提交</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column label="批改状况">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.checkState==0" type="warning">未批改</el-tag>
              <el-tag v-else>{{ scope.row.score }} 分</el-tag>
              
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="checking(scope.row)">批改/修改</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
      return {
        prerow: {},
        tableData: [
        {
          stuNum: '1234567',
          name: '张三',
          subState: true,
          subDate: '2020-06-01',
          checkState: true,
          point: 98
        },
        {
          stuNum: '1234568',
          name: '张四',
          subState: true,
          subDate: '2020-06-01',
          checkState: false,
          point: '未批改'
        },
        {
          stuNum: '1234568',
          name: '张五',
          subState: false,
          subDate: '0000-00-00',
          checkState: false,
          point: '未批改'
        }]
      }
    },
    computed: {
      ...mapState([ 'accountInfo', 'tempInfo', 'homeworkList', 'videoList', 'subedInfo' ])
    },
    methods: {
      checking(row) {
        console.log(row)
        this.$router.push({
          name: 'CheckView',
          query: {
            // homeworkCon: this.prerow,
            rowInfo: row
          }
        })
      }
    },
    created() {
      // this.prerow = JSON.parse(this.$route.query.homeworkCon)
      this.$store.dispatch('getAtSubmit')
    }
}
</script>

<style scoped>
.backbtn {
    font-size: 1.2em;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
    width: 50px;
    color: #409EFF;
}
</style>