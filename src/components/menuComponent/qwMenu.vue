<template>
  <div class="qw-menu">
    <slot></slot>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  data() {
    return {
    };
  },
  props: ["defaultActive", "active"],
  provide: function () {
    return {
      curSelected: this.active,
      defaultActive: this.defaultActive,
    };
  },
  created() {
    this.$menuBus.$on("selected", (index) => {
      this.$menuBus.$emit("update_curSelected",index);
    });
    window.vm = this;
  },
};
</script>
<style scoped>
.qw-menu {
  position: fixed;
  width: 30vh;
  height: 100%;
  background-color: #fff;
  margin-right: 15px;
  font-size: 16px;
}
</style>