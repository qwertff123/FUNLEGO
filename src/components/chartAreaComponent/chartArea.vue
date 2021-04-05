<template>
  <div class="chart-area"></div>
</template>
<script>
import echarts from "./echarts";
export default {
  props: {
    option : {
        type : Object,
        require : true
    }
  },
  mounted() {
    const chart = echarts.init(this.$el);
    chart.setOption(this.option);
  },
};
</script>
<style scoped>
.chart-area {
  width: 100%;
  height: 100%;
}
</style>
