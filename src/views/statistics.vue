<template>
  <div class="statistics">
    <div class="card-list">
      <div class="card">
        <div class="title">当日销售额（元）</div>
        <div class="content">10000.00</div>
        <div class="bottom">
          <div class="left">平均当日销售额</div>
          <div class="right">12345.00</div>
        </div>
      </div>
      <div class="card">
        <div class="title">当日销售额（元）</div>
        <div class="content">10000.00</div>
        <div class="bottom">
          <div class="left">平均当日销售额</div>
          <div class="right">12345.00</div>
        </div>
      </div>
      <div class="card">
        <div class="title">当日销售额（元）</div>
        <div class="content">10000.00</div>
        <div class="bottom">
          <div class="left">平均当日销售额</div>
          <div class="right">12345.00</div>
        </div>
      </div>
    </div>
    <div class="chart">
      <chart-area :option="option"></chart-area>
    </div>
  </div>
</template>
<script>
import chartArea from "@/components/chartAreaComponent";
export default {
  components: {
    chartArea,
  },
  data() {
    return {
      option: {
        legend: {
          data: ["月销售量", "月销售额"],
        },
        tooltip: {
          show: true,
        },
        toolBox: {
          feature: {
            saveAsimage: {},
          },
        },
        xAxis: {
          name: "月份",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: [
          {
            type: "value",
            name: "数量",
          },
          {
            type: "value",
            name: "金额",
          },
        ],
        series: [
          {
            type: "bar",
            name: "月销售量",
            data: [100, 320, 145, 120, 142, 123, 121, 523, 542, 133, 110, 154],
          },
          {
            type: "bar",
            name: "月销售额",
            yAxisIndex: 1,
            data: [
              1457,
              3224,
              1276,
              2434,
              1245,
              3245,
              2754,
              2641,
              1954,
              3524,
              1246,
              1245,
            ],
          },
        ],
      },
    };
  },
};
</script>
<style scoped lang="less">
.statistics {
  width: 100%;
  height: 100%;

  .card-list {
    width: 100%;
    height: 200px;
    padding: 20px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .card {
      width: 30%;
      height: 100%;
      background-color: rgb(114, 115, 255);
      padding: 15px;
      box-sizing: border-box;
      color: white;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 14px;
      }
      .content {
        height: 90px;
        font-size: 35px;
        padding-top: 25px;
        box-sizing: border-box;
      }
      .bottom {
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
  .chart {
    background-color: white;
    height: calc(100% - 200px);
  }
}
</style>