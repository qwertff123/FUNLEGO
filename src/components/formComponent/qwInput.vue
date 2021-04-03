<template>
  <input
    type="text"
    class="qw-input content"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template> 
<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: ["placeholder", "value", "prop"],
};
</script>

<style scoped lang="less">
.qw-input {
  padding-left: 10px;
  box-sizing: border-box;
}

</style>