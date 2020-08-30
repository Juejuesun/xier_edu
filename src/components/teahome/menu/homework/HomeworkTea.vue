<template>
  <div class="home">
    <sheet-list v-for="(item,index) in sheetList" :item="item" :key="index"></sheet-list>
  </div>
</template>

<script>
// import HomeworkSheetList from "./HomeworkSheetList";
import HomeworkSheetList from "./HomeworkSheetList";
export default {
  components: { "sheet-list": HomeworkSheetList },
  data() {
    return {
      sheetList: [
        {
          id: 1,
          name: "第一章：白杨树作业",
          num: 2,
          details: [
            {
              details_iswatch: true,
              details_id: 1,
              details_name: "第一节：白杨礼赞",
              details_num: 30,
            },
            {
              details_iswatch: false,
              details_id: 2,
              details_name: "第二节：白杨",
              details_num: 15,
            },
          ],
        },
        {
          id: 2,
          name: "第二章：这是第二章的作业",
          num: 2,
          details: [
            {
              details_iswatch: false,
              details_id: 1,
              details_name: "这应该是你比较喜欢听的歌曲了",
              details_num: 10,
            },
            {
              details_iswatch: true,
              details_id: 2,
              details_name: "欧美风格的音乐，安静的听",
              details_num: 2,
            },
          ],
        },
      ],
    };
  },
  methods: {},
  created() {
    this.$store.dispatch('getHomeworkList')
  }
};
</script>

<style scoped>

</style>