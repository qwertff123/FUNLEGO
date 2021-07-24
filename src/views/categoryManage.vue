<template>
  <div class="categoryManage">
    <div class="center">
      <div class="category">
        <div class="list">
          <div
            class="item"
            :class="{ active: categoryIndex == index }"
            v-for="(category, index) in categoryInfo"
            :key="category.id"
            @click="categoryIndex = index"
          >
            {{ category.name
            }}<i class="iconfont close" @click="removeCategory(index)"></i>
          </div>
        </div>
        <div class="bottom">
          <input type="text" v-model="newCategory" />
          <button @click="addCategory">添加</button>
        </div>
      </div>
      <div class="sub-category" v-if="subCategoryMap[categoryIndex]">
        <div class="list">
          <span
            class="item"
            v-for="(item, index) in subCategoryMap[categoryIndex]"
            :key="item"
            @mouseenter="(e) => e.target.classList.add('hover')"
            @mouseleave="(e) => e.target.classList.remove('hover')"
            >{{ item
            }}<i class="iconfont close" @click="removeSubCategory(index)"></i
          ></span>
          <p v-if="subCategoryMap[categoryIndex].length == 0">空空如也</p>
        </div>
        <div class="bottom">
          <input type="text" v-model="newSubCategory" />
          <button @click="addSubCategory">添加</button>
        </div>
      </div>
      <div class="image"></div>
    </div>
  </div>
</template>
<script>
import * as goodsApi from "@/api/goods";
export default {
  data() {
    return {
      categoryInfo: [],
      //   subCategoryMap: null,
      categoryIndex: 0,
      newCategory: "",
      newSubCategory: "",
    };
  },
  computed: {
    subCategoryMap() {
      const obj = {};
      this.categoryInfo.forEach((category, index) => {
        obj[index] = category.c_items;
      });
      return obj;
    },
  },
  methods: {
    addCategory() {
      if (!this.newCategory) {
        return;
      }
      goodsApi
        .addCategory({
          appkey: "qwertff_1618500498552",
          id: Math.round(Math.random() * 1000000),
          name: this.newCategory,
        })
        .then((data) => {
          this.categoryInfo.push(data.data.data);
          this.newCategory = "";
        });
    },

    removeCategory(index) {
      goodsApi
        .removeCategory({
          id: this.categoryInfo[index].id,
          appkey: "qwertff_1618500498552",
        })
        .then(() => {
          this.categoryInfo.splice(index, 1);
        });
    },

    addSubCategory() {
      const target = this.categoryInfo[this.categoryIndex];
      target.c_items.push(this.newSubCategory);
      goodsApi
        .editSubCategory({
          name: target.name,
          id: target.id,
          appkey: "qwertff_1618500498552",
          c_items: target.c_items,
        })
        .then((data) => {
          console.log(data);
          this.newSubCategory = "";
        });
    },

    removeSubCategory(index) {
      const target = this.categoryInfo[this.categoryIndex];
      target.c_items.splice(index,1);
      goodsApi
        .editSubCategory({
          name: target.name,
          id: target.id,
          appkey: "qwertff_1618500498552",
          c_items: target.c_items,
        })
        .then((data) => {
          console.log(data);
        });
    },
  },
  created() {
    goodsApi.getCategoryInfo("qwertff_1618500498552").then((data) => {
      this.categoryInfo = data.data.data;
      console.log(this.categoryInfo);
    });
  },
};
</script>
<style lang="less" scoped>
@import url("~@/assets/css/categoryManage.less");
</style>