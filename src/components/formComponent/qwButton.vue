<template>
  <button
    class="qw-submit"
    :class="['color',qwClass]"
    :type="type == 'submit' ? 'submit' : 'button'"
    @click="$emit('click')"
  >{{ label }}</button>
</template>
<script>
export default {
  props: ["color", "type", "label","qwClass"],
};
</script>
<style scoped lang="less">
.qw-submit {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgb(58, 205, 225);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  &.submit {
    background-color: rgb(102, 94, 255);
  }

  &.cancel {
    border: 1px solid rgb(229, 79, 80);
    color: rgb(229, 79, 80);
    background-color: white;
  }
  &:active {
    opacity: 0.8;
  }
}
</style>