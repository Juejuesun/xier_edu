<template>
    <el-container>
        <!-- <el-header height="150px" class="headerbox">
            <div class="backbtn" @click="leftback">
                <i class="fa fa-long-arrow-left" style="margin-right: 10px;"></i>
                <span>班级</span>
            </div>
            <div class="classname">hhh</div>
        </el-header> -->
        <el-main class="mainbox">
            <div class="subInfoLine">
               <div>
                    <el-page-header @back="goBack" :content="$route.query.title" title="返回"></el-page-header>
                </div>
                <div class="plusbtn">
                    <!-- <i class="fa fa-user-plus iconclass"  @click="dialogTableVisible = true"></i> -->
                    <el-button type="danger" icon="el-icon-delete" circle @click="askDismiss"></el-button>
                    <el-button type="primary" icon="el-icon-user-solid" circle @click="dialogTableVisible = true"></el-button>
                </div>
            </div>
            <!-- 模态框 -->
            <el-dialog :visible.sync="dialogTableVisible" center :close-on-click-modal="false" :destroy-on-close="true">
                <template slot="title">
                    <div class="titlebox">添加成员</div>
                </template>
                <AddNew/>
            </el-dialog>
            <div class="overline">
                <h3>
                    班级成员
                </h3>
                <div class="overline">
                    <div>
                        <div class="delBtn" @click="open">删除成员</div>
                        <!-- <el-dialog :visible.sync="delVisible" center :close-on-click-modal="false" :destroy-on-close="true">
                            <template slot="title">
                                <div class="titlebox">删除成员</div>
                            </template>
                            <div>
                                <div >警告：确定删除学生？</div>
                                <div >您未选中任何学生！</div>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="delVisible = false">取 消</el-button>
                                <el-button type="primary" @click="delmems">确 定</el-button>
                            </span>
                        </el-dialog> -->
                    </div>
                    <el-input placeholder="请输入内容" v-model="search" clearable style="width: 200px; margin-right: 80px; margin-left: 20px;"></el-input>
                </div>
            </div>
            <el-divider></el-divider>
            <div style="margin-left: 50px;">
                <el-table
                :data="stuListMeg.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())|| data.account.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                @selection-change="handleSelectionChanges">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="username" label="姓名"  show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="account" label="学号"  show-overflow-tooltip> </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import AddNew from '../comment/AddNew'
import { mapState} from 'vuex'

export default {
    components: {
        AddNew
    },
    data () {
        return {
            dialogTableVisible: false,
            delVisible: false,
            multipleSelection: [],
            search: '',
            isToShow: 0,
            toShow: false,
            pageTitle: ''
        }
    },
    computed: {
        ...mapState(['accountInfo', 'stuListMeg', 'tempInfo' ])
    },
    created() {
        // this.getPageTitle()
        this.$store.dispatch('getStuList')
    },
    methods: {
        goBack() {
            console.log('go back');
            this.$router.back(-1)
        },
        getPageTitle() {
            // let grad = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
            // if(this.userInfo.userRoot==1) {
            //     this.pageTitle = `${grad[this.userInfo.userGrade-1]}年级${this.userInfo.userClass}班`
            // }else {
               this.pageTitle = this.teaClassInfo.defaultName
            // }
        },
        mouseEnter(row) {
            console.log(row)
        },
        mouseLeave(row) {
            console.log(row)
        },
        handleSelectionChanges(val) {
            this.multipleSelection = val;
        },
        toShowDel() {
            this.delVisible = true
            if(this.multipleSelection.length>0) {
                this.toShow = true
            }
        },
        open() {
            this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.multipleSelection.length) {
                    this.delmems()
                }else {
                    this.$message({
                        type: 'info',
                        message: '您未选中任何成员'
                    });
                }                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        async delmems() {
            console.log(this.multipleSelection)
            let asc = {
                subjectIdOfStudnet: this.teaClassInfo.defaultInfo.subjectId,
                students: []
            }
            for(let v of this.multipleSelection){
                let s = {
                    studentId: v.studentId
                }
                asc.students.push(s)
            }
            console.log('asc',asc)
            if(this.userInfo.userRoot === 2) {
                const {data: res} = await this.$http.post('/teacher/deleteStudent', asc)
                if(res.status == 'success'){
                    this.$message({
                        message: '删除成功！',
                        type: 'warning'
                    })
                    // if(this.$route.name == 'ClassSetting') {
                        this.$store.dispatch('getClassmates')
                    // }
                }else {
                    this.$message({
                        message: '请求失败！',
                        type: 'error'
                    })
                }
            }else {

                this.$message({
                    message: '您无权限！',
                    type: 'error'
                })
                return
            }
        },
        askDismiss() {
            this.$confirm('此操作将解散该班级, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dismissClass()             
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        async dismissClass() {
            let asc = {
                user_id: this.accountInfo.user_id,
                class_id: this.tempInfo.class_id
            }
            const {data: res} = await this.$http.post('/manage/close_class', asc)
            console.log(res)
            if(res.status == 200) {
                this.$message({
                    message: '删除成功！',
                    type: 'warning'
                })
                // const s = 2
                // await this.$store.dispatch('getNewClass', s)
                this.goBack()
            }else {
                this.$message({
                    message: res.message + '！',
                    type: 'error'
                })
            }
        }
    },
    // watch: {
    //     // 'multipleSelection': function(newVal) {
    //     //     if(newVal.length) {
    //     //         this.toShow = true
    //     //     }else {
    //     //         this.toShow = false
    //     //     }
    //     // }
    // }
}
</script>

<style scoped>
.headerbox {
    min-height: 150px;
    background-color: #E4E7ED;
}
.backbtn {
    font-size: 1.5em;
    margin: 20px 0 0 20px;
    cursor: pointer;
}
.classname {
    font-size: 2em;
    text-align: center;
    padding: 30px;
}
.mainbox {
    padding-left: 60px;
    padding-right: 60px;
}
.plusbtn {
    text-align: end;
    margin: 10px;
}
.subInfoLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.overline {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.delBtn {
    color: #F56C6C;
    cursor: pointer;
    
}
.isshowBtn {
    visibility: hidden;
}
</style>