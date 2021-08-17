<template>
  <div class="categoryManage">
    <div class="center">
      <div class="category">
        <div class="list">
          <div
            class="item"
            :class="{
              active: index == i,
            }"
            v-for="(item, i) in categoryInfo"
            :key="item.name"
            @click="index = i"
            @dblclick="editing($event, item.name)"
          >
            {{ item.name }}
            <!-- <i class="iconfont close" @click="removeCategory(index)"></i> -->
            <input
              type="text"
              class="edit-box"
              maxlength="5"
              v-show="editBox == item.name"
              @blur="confirm(item.name)"
              v-model="freshCategory"
            />
          </div>
        </div>
        <div class="bottom">
          <input type="text" v-model="newCategory" />
          <button @click="addCategory">添加</button>
        </div>
      </div>
      <div class="sub-category" v-if="subCategoryMap[categoryInfo[index].name]">
        <div class="list">
          <span
            class="item"
            v-for="(item, index) in subCategoryMap[categoryInfo[index].name]"
            :key="item.id"
            @mouseenter="(e) => e.target.classList.add('hover')"
            @mouseleave="(e) => e.target.classList.remove('hover')"
            >{{ item.name
            }}<i class="iconfont close" @click="removeSubCategory(index)"></i
          ></span>
          <p v-if="subCategoryMap[categoryInfo[index].name].length == 0">
            空空如也
          </p>
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
      index: 0,
      newCategory: "",
      newSubCategory: "",
      editBox: "",
      freshCategory: "", //新的freshCartegory
    };
  },
  computed: {
    subCategoryMap() {
      const obj = {};
      this.categoryInfo.forEach((category, index) => {
        obj[category.name] = category.subCategories;
      });
      console.log(obj);
      return obj;
    },
  },
  methods: {
    addCategory() {
    },

    addSubCategory() {
    },

    removeSubCategory(index) {
    },
    editing(e, category) {
      this.freshCategory = category;
      this.editBox = category;
      setImmediate(() => {
        e.target.querySelector("input").focus();
      });
    },
    confirm(oldCategory) {
      this.editBox = "";
      goodsApi.updateCategory(oldCategory, this.freshCategory);
      this.categoryInfo.find((val) => {
        return val.name == oldCategory;
      }).name = this.freshCategory;
    },
  },
  async created() {
    this.categoryInfo = (await goodsApi.getAllCategoryAndSub()).data;
    console.log(this.categoryInfo);
  },
};
</script>
<style lang="less" scoped>
@import url("~@/assets/css/categoryManage.less");
</style>