<template>
  <div class="qw-option" @click="handleClick" :class="{ selected: selected }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      optionInfo: "",
    };
  },
  methods: {
    handleClick() {
      //触发父组件上的selected方法
      //向父组件传递value
      console.log(this.value);
      this.$parent.$emit("selected", this.value);
    },
  },
  mounted() {
    this.optionInfo = {
      value: this.value,
      innerText: this.$slots.default[0].text,
    };
    this.$parent.$emit("update",this.optionInfo);
  },
  computed: {
    selected() {
      return this.$parent.value == this.value;
    },
  },
};
</script>
<style scoped lang="less">
.qw-option {
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.1s;
  &.selected {
    background-color: rgb(58, 205, 225);
    color: white;
    font-weight: bolder;
  }
  &:not(.selected):hover {
    background-color: rgba(58, 205, 225, 0.2);
  }
}
</style>