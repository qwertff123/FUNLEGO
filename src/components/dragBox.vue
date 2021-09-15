<template>
  <div class="drag-box" @mousedown="start" ref="dragBox">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startX: 0, //元素的起始点坐标
      startY: 0,
      X: 0, //鼠标的起始坐标，即记录鼠标点击的初始位置
      Y: 0,
      disX: 0, //元素拖拽结束后与起始坐标之差
      disY: 0,
      width: 0, //元素的尺寸
      height: 0,
    };
  },
  props: {
    scope: {
      type: Object,
      /**
       * 可拖拽的空间范围
       * {
       *  X : 左顶点X,
       *  Y : 右顶点,
       *  width: 宽度,
       *  height : 高度
       * }
       */
    },
    target: {
      type: Object,
      /**
       * 拖拽到目标空间范围
       * {
       *  X : 左顶点X,
       *  Y : 右顶点,
       *  width: 宽度,
       *  height : 高度
       * }
       */
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    addMoveEvent() {
      document.addEventListener("mousemove", this.onmousemove);
    },
    removeMoveEvent() {
      document.removeEventListener("mousemove", this.onmousemove);
    },
    onmousemove(e) {
      const dragBox = this.$refs.dragBox;
      const offset = this.getOffsetPos(e.pageX, e.pageY);
      dragBox.style.transform = `translate(${offset.X}px,${offset.Y}px)`;
    },
    //开始拖拽
    start(e) {
      //每次重新开始拖拽都需要记录鼠标的起始坐标
      this.X = e.pageX;
      this.Y = e.pageY;
      this.addMoveEvent();
      this.$refs.dragBox.style.transition = "none";
      document.addEventListener("mouseup", this.end);
    },
    //结束拖拽
    end(e) {
      console.log(this.target);
      if (this.target && this.isArrive(e.pageX, e.pageY)) {
        this.$emit("arrive", this.$refs.dragBox,this.reset);
      }
      this.reset();
      this.removeMoveEvent();
      document.removeEventListener("mouseup", this.end);
    },
    init() {
      const dragBox = this.$refs.dragBox;
      const info = dragBox.getBoundingClientRect();
      this.startX = info.x;
      this.startY = info.y;

      this.width = info.width;
      this.height = info.height;
    },
    reset() {
      const dragBox = this.$refs.dragBox;
      dragBox.style.transition = "all .3s";
      dragBox.style.transform = "translate(0px,0px)";
    },
    //获得偏移的X与Y坐标
    getOffsetPos(pageX, pageY) {
      const scope = this.scope;
      const widthHalf = Math.floor(this.width / 2);
      const heightHalf = Math.floor(this.height / 2);
      const offset = {
        X: pageX - this.X + this.disX,
        Y: pageY - this.Y + this.disY,
      };
      const centerPos = {
        //未界时拖拽元素此时的左顶角坐标
        X: this.startX + offset.X + widthHalf,
        Y: this.startY + offset.Y + heightHalf,
      };

      if (scope) {
        //具有拖拽的范围
        const scope = this.scope;

        //中心点
        const xMin = scope.X + widthHalf;
        const xMax = scope.X + scope.width - widthHalf;
        const yMin = scope.Y + heightHalf;
        const yMax = scope.Y + scope.height - heightHalf;

        offset.X =
          centerPos.X < xMin ? xMin - (this.startX + widthHalf) : offset.X;
        offset.X =
          centerPos.X > xMax ? xMax - (this.startX + widthHalf) : offset.X;

        offset.Y =
          centerPos.Y < yMin ? yMin - (this.startY + heightHalf) : offset.Y;
        offset.Y =
          centerPos.Y > yMax ? yMax - (this.startY + heightHalf) : offset.Y;
        // offset.X = centerPos.X >
      }
      return offset;
    },
    //是否到达目标区域
    isArrive(X, Y) {
      const target = this.target;
      if (
        X > target.X &&
        X < target.X + target.width &&
        Y > target.Y &&
        Y < target.Y + target.height
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
.origin-area {
  border: 1px dashed;
  .drag-box {
    width: 100%;
    height: 100%;
    // background-color: red;
    user-select: none;
  }
}
</style>