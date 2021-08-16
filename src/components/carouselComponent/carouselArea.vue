<template>
  <div class="carousel-area">
    <div class="container">
      <slot></slot>
      <div class="no-content" v-if="count == 0">{{ placeholder }}</div>
    </div>
    <ul class="spot-list" v-if="count != 0">
      <li
        v-for="item in count"
        :key="item"
        :class="{ selected: curIndex == item - 1 }"
        @click="curIndex = item - 1"
      ></li>
    </ul>
  </div>
</template>
<script>
export default {
  //用户进行双向数据绑定的值即为轮播图当前需要滚动到的页面下标
  model: {
    prop: "index",
    event: "change",
  },
  props: {
    itemWidth: {
      required: true,
    },
    count: {//轮播内容的数量
      default: 0,
    },
    index: 0,
    placeholder: {
      default(){
        return "请添加图片"
      }
    },
  },
  data() {
    return {
      curIndex: 0, //当前展示的索引值
    };
  },
  watch: {
    curIndex() {
      this.container.style.transform = `translateX(${
        -this.curIndex * this.itemWidth
      }px)`;
      this.$emit("change",this.curIndex);
      this.$emit("imgChange",this.curIndex);
    },
    count() {
      this.curIndex = this.count - 1;
      console.log(this.count);
    },
  },
  methods: {
    //用于通过用户传入当个轮播内容的宽度来计算轮播容器的宽度
    initContainerWidth() {
        this.container.style.width = this.count * this.itemWidth + "px";
        if (!this.count) {
          this.container.style.width = this.itemWidth + "px";
        }
    },
  },
  mounted() {
    //记录container元素便于使用
    this.container = this.$el.querySelector(".container");

    //初始化容器的宽度
    this.initContainerWidth();

    //监听按钮
    this.$eventBus.$on("prev", ()=>{
      this.curIndex = (this.curIndex - 1 + this.count) % this.count;
    });
    this.$eventBus.$on("next",()=>{
      this.curIndex = (this.curIndex + 1 + this.count) % this.count;
    });
  },
};
</script>
<style scoped lang="less">
.carousel-area {
  overflow: hidden;
  position: relative;
  width:150px;
  height:150px;
  .container {
    transform: translateX(0);
    // transition: all 0.3s;
    display: flex;
    height: 100%;

    .carousel-item{
      flex-shrink: 0;
      flex-grow: 0;
    }
    .no-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(120, 132, 158);
      color: white;
      font-weight: bolder;
    }
  }
  .spot-list {
    position: absolute;
    padding: 0;
    margin: 0;
    list-style: none;
    bottom: 0;
    height: 40px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    li {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: white;
      margin-right: 7px;
      cursor: pointer;
      &.selected {
        background-color: rgb(200, 64, 234);
        transform: scale(1.2);
      }
      &:not(.selected):hover {
        background-color: rgb(222, 174, 235);
      }
    }
  }
}
</style>