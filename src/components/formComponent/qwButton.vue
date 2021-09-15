<template>
  <div class="qw-button" :class="qwClass">
    <input
      class="file"
      type="file"
      v-if="type == 'file'"
      @change="handleClick"
    />
    <button :type="type == 'submit' ? 'submit' : 'button'" @click="handleClick">
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  data(){
    return { 
      errorMsg : ""
    }
  },
  props: ["type", "label", "qwClass", "eventConfig", "field","prop"],
  mounted() {
    if(this.type != "file"){
      return;
    }
    this.$formBus.$on("submitVertify", (vertifyError) => {
      const result = vertifyError
        .filter((val) => {
          return val.prop == this.prop;
        })
        .pop();
        console.log(result);
      if (result) {
        this.errorMsg = result.msg;
        alert(this.errorMsg);
      } else {
        this.errorMsg = "";
      }
    });
  },
  methods: {
    handleClick(e) {
      if (this.eventConfig) {
        e.stopPropagation();
      }
      if (this.type == "file") {
        const formData = new FormData();
        formData.append(this.field, e.target.files[0]);
        this.$emit("change", formData);
      } else if (this.type == "button") {
        e.preventDefault();
        this.$emit("click");
      }
    },
  },
};
</script>
<style scoped lang="less">
.qw-button {
  background-color: rgb(58, 205, 225);
  font-size: 14px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
}
button {
  background-color: transparent;
  color: inherit;
  font-weight: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
}
input {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 100;
}
</style>