<template>
    <div class="login">
        <div>
            <el-upload
                    class="upload-demo"
                    action="http://127.0.0.1:5000/tech/create_sc"
                    :on-remove="handleRemove"
                    list-type="picture-card"
                    :show-file-list="false"
                    :multiple="false" :limit="1" :on-success="UploadSuccess">
                <el-button size="small" type="primary" plain>点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {}
        },
        methods :{
            handleRemove(){
                return this.$message.info("取消上传");
            },
            UploadSuccess(){
                return this.$message.success("上传成功");

            }
        }
    }
</script>

<style scoped>

</style>