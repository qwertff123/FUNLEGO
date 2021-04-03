<template>
  <div class="carousel-area" :class="qwClass">
    <div class="container">
      <slot></slot>
      <div class="no-content" v-if="!hasContent">{{ placeholder }}</div>
    </div>
    <ul class="spot-list" v-if="hasContent">
      <li
        v-for="item in itemsLength"
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
    prop: "value",
    event: "change",
  },
  props: {
    qwClass: {},
    itemWidth: {
      required: true,
    },
    watch: {},
    value: {},
    placeholder: {},
  },
  data() {
    return {
      itemsLength: null, //轮播内容的数量
      hasContent: false, //当前是否有轮播内容
    };
  },
  computed: {
    //当前轮播内容的下标
    curIndex: {
      get() {
        return this.value;
      },
      set(curIndex) {
        this.$emit("change", curIndex);
      },
    },
  },
  watch: {
    //侦查用户所传入的响应式数据
    watch() {
      this.initContainerWidth();

      //每次添加或移除轮播页时都展示最后一张轮播页
      this.curIndex = this.itemsLength - 1;
    },

    value() {
      this.container.style.transform = `translateX(${
        -this.curIndex * this.itemWidth
      }px)`;
    },
  },
  methods: {
    //用于通过用户传入当个轮播内容的宽度来计算轮播容器的宽度
    initContainerWidth() {
      //如果插槽内有内容
      if (this.$slots.default) {
        this.hasContent = true;
        //通过计算默认插槽的数量即可以知道轮播内容的数量
        this.itemsLength = this.$slots.default.length;
        this.container.style.width = this.itemsLength * this.itemWidth + "px";
        if (!this.itemsLength) {
          this.container.style.width = this.itemWidth + "px";
        }
      } else {
        //如果插槽内没有内容即表示当前没有轮播内容
        this.hasContent = false;
      }
    },
  },
  mounted() {
    //每次新的展示时都讲当前的下标更新至0
    this.curIndex = 0;

    //记录container元素便于使用
    this.container = this.$el.querySelector(".container");

    //初始化容器的宽度
    this.initContainerWidth();

    //监听按钮
    this.$eventBus.$on("prev", () => {
      this.curIndex = (this.curIndex - 1 + this.itemsLength) % this.itemsLength;
    });
    this.$eventBus.$on("next", () => {
      this.curIndex = (this.curIndex + 1 + this.itemsLength) % this.itemsLength;
    });
  },
};
</script>
<style scoped lang="less">
.carousel-area {
  overflow: hidden;
  position: relative;
  .container {
    transform: translateX(0);
    // transition: all 0.3s;
    display: flex;
    height: 100%;

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