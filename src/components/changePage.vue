<template>
  <div id="change-page">
    <div class="page">
      <span
        class="page-prev"
        :class="{ hide: pageSelected == 1 }"
        @click="change(--pageSelected)"
        >&lt; 上一页</span
      >
      <ol class="page-number" v-if="pageSize < 9">
        <li
          v-for="num in pageSize"
          :key="num"
          :class="{ active: num == pageSelected }"
          @click="change(num)"
        >
          {{ num }}
        </li>
      </ol>
      <ol class="page-number" v-else>
        <li :class="{ active: pageSelected == 1 }" @click="change(1)">1</li>
        <li class="ellipsis" v-if="pageSelected > 5">...</li>
        <li :class="{ active: pageSelected == 2 }" @click="change(2)" v-else>
          2
        </li>

        <li
          v-for="num in filterPageSize"
          :key="num"
          :class="{ active: num == pageSelected }"
          @click="change(num)"
        >
          {{ num }}
        </li>

        <li class="ellipsis" v-if="pageSelected < pageSize - 4">...</li>
        <li
          @click="change(pageSize - 1)"
          :class="{ active: pageSelected == pageSize - 1 }"
          v-else
        >
          {{ pageSize - 1 }}
        </li>
        <li
          @click="change(pageSize)"
          :class="{ active: pageSelected == pageSize }"
        >
          {{ pageSize }}
        </li>
      </ol>
      <span
        class="page-next"
        :class="{ hide: pageSelected == pageSize }"
        @click="change(++pageSelected)"
        >下一页 &gt;</span
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //最大页码
    pageSize: {
      type: Number,
      required: true,
    },
    //当前的页码
    curPage: {
      type: Number,
      default: 1,
    },
    //在换页时需要触发的回掉函数
    callback: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      pageSelected: null,
    };
  },
  // created() {
  //   this.pageSelected = this.curPage;
  // },
  watch: {
    curPage: {
      immediate: true,
      handler() {
        this.pageSelected = this.curPage;
      },
    },
  },
  methods: {
    change(page) {
      this.pageSelected = page;
      this.callback(page);
    },
  },
  computed: {
    filterPageSize() {
      const curPage = this.pageSelected;
      let flag = null;

      if (curPage < 5 && curPage < this.pageSize - 4) {
        flag = 5;
      } else if (curPage > 5 && curPage > this.pageSize - 4) {
        flag = this.pageSize - 4;
      } else {
        flag = curPage;
      }
      flag -= 2;

      const result = [];
      for (let i = 0; i < 5; ++i) {
        result.push(flag + i);
      }

      return result;
    },
  },
};
</script>
<style scoped lang="less">
.page {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  /* background-color:#F5F5F6; */
  color: #3951b3;
  text-overflow: ellipsis;
  font-size: 15px;
  user-select: none;

  &::after,
  ol {
    padding: 0;
  }

  &::after,
  ol li::after {
    content: "";
    display: block;
    clear: both;
  }
  span {
    display: inline-block;
    width: 80px;
    line-height: 36px;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;

    &.hide {
      visibility: hidden;
    }
  }

  .page-number {
    display: inline-block;
    font-size: 0;

    li {
      display: inline-block;
      list-style: none;
      background-color: #fff;
      width: 36px;
      height: 36px;
      border-radius: 6px;
      line-height: 36px;
      cursor: pointer;
      margin: 0 5px;
      font-size: 15px;

      &.active {
        background-color: #4e6ef2;
        color: #fff;
      }

      &.ellipsis {
        background-color: transparent;
        color: #000;
      }
    }
  }

  span:hover,
  ol li::not(.ellipsis):hover {
    background-color: #4e6ef2;
    color: #fff;
  }
}
</style>