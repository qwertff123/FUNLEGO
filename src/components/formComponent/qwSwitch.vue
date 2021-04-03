<template>
  <label
    class="qw-switch"
    :class="{ checked }"
    @click="$emit('change', !checked)"
  >
    <span class="btn"></span>
  </label>
</template>
<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: ["checked"],
  watch: {
    checked() {
      if (this.checked) {
        this.$el.classList.remove("close");
        //等待下一帧添加上类以实现动画效果
        requestAnimationFrame(() => this.$el.classList.add("open"));
      } else {
        this.$el.classList.remove("open");
        requestAnimationFrame(() => this.$el.classList.add("close"));
      }
    },
  },
};
</script>
<style scoped lang="less">
.qw-switch {
  display: flex;
  align-items:center;
  width: 40px;
  height: 20px;
  border-radius: 13px;
  position: relative;
  background-color: rgb(220, 223, 230);
  cursor: pointer;
  transition: all 0.3s;

  &.checked {
    background-color: rgb(34,239,209);

    .btn {
      left: 20px;
    }
  }

  &.open .btn {
    animation: move 0.3s linear both;
  }
  &.close .btn {
    animation: move 0.3s linear reverse both;
  }
  .btn {
    position: absolute;
    left: 0;
    background-color: white;
    background-clip: padding-box;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid transparent;
    box-sizing: border-box;
  }
}

@keyframes move {
  0% {
    left: 0;
  }
  50% {
    width: 25px;
  }
  100% {
    left: 20px;
  }
}
</style>