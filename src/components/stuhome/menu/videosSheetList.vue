<template>
  <div class="sheet-list">
    <div class="sheet-header" @click="toggleSheet">
      <i class="el-icon-arrow-right" ref="toggleicon"></i>
      <span class="sheet-header-span">
        {{data_item.name}}
        <span>({{data_item.num}})</span>
      </span>
      <!-- <i class="sheet-header-i el-icon-setting" @click.stop="showSheetMenu(data_item.name)"></i> -->
    </div>

    <div
      v-show="showSheets"
      class="sheet-content"
      v-for="(i, index) in data_item.details"
      :key="index"
      @click="showSheetMenu(i)"
    >
      <!-- <div class="sheet-content-image">
        <img :src="i.details_image" width="50" height="50" style="padding: 5px;overflow: hidden" />
      </div> -->
      <div class="sheet-content-iswatch">
        <i v-if="i.details_iswatch" class="el-icon-success" style="color: rgb(59,169,246)"></i>
        <i v-else class="el-icon-circle-check"></i>
      </div>
      <div class="sheet-content-middle">
        <p style>{{i.details_name}}</p>
        <!-- <p style="margin-top: 10px;font-size: 14px;color: #666">{{i.details_num}}首歌曲</p> -->
      </div>
      <i class="el-icon-more sheet-content-i" @click.stop="showSheetMenu(i)"></i>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      showSheets: false,
      data_item: {},
    };
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
      // alert(1111);
      this.$router.push({
        name: 'VideoPlayer',
        query: {
          row: JSON.stringify(row)
        }
      })
    },
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
</style>