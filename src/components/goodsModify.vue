<template>
  <div class="edit" v-if="goods">
    <div class="back" @click="back">返回</div>
    <div class="card">
      <div class="id">ID : {{ goods.id }}</div>
      <qw-form class="form" @submit="submit" :rules="rules">
        <div class="form-left">
          <qw-label label="商品标题" class="item">
            <qw-input v-model="goods.title" prop="title"></qw-input>
          </qw-label>

          <qw-label label="商品描述" class="item">
            <qw-input v-model="goods.desc" prop="desc"></qw-input>
          </qw-label>

          <div class="item">
            <qw-label label="商品类目" class="left">
              <qw-select v-model="goods.category">
                <qw-option
                  v-for="category in categoryList"
                  :key="category"
                  :value="category"
                  >{{ category }}</qw-option
                >
              </qw-select>
            </qw-label>

            <qw-label label="商品子类目" class="right">
              <qw-select v-model="goods.subCategory">
                <qw-option
                  v-for="item in subCategoryList"
                  :key="item.id"
                  :value="item.name"
                  >{{ item.name }}</qw-option
                >
              </qw-select>
            </qw-label>
          </div>
          <div class="item">
            <qw-label label="商品价格" class="left">
              <qw-input
                class="center"
                v-model="goods.price"
                prop="price"
              ></qw-input>
            </qw-label>
            <qw-label label="商品折扣价" class="right">
              <qw-input
                class="center"
                v-model="goods.price_off"
                placeholder="空"
                prop="price_off"
              ></qw-input>
            </qw-label>
          </div>
          <qw-label label="商品标签" class="tags-area">
            <qw-tags-selector
              v-model="goods.tags"
              :tagsList="tagsList"
            ></qw-tags-selector>
          </qw-label>
        </div>
        <div class="form-right">
          <div class="item">
            <qw-label label="商品单位" class="left">
              <qw-input
                class="center"
                v-model="goods.unit"
                prop="unit"
              ></qw-input>
            </qw-label>
            <qw-label label="是否上架" class="right switch">
              <div class="switch">
                <qw-switch v-model="goods.issale"></qw-switch>
              </div>
            </qw-label>
          </div>

          <div class="item">
            <qw-label label="库存量" class="left">
              <qw-input
                class="center"
                v-model="goods.inventory"
                prop="inventory"
              ></qw-input>
            </qw-label>
            <qw-label label="销售量" class="right">
              <qw-input
                class="center"
                v-model="goods.sales"
                prop="sales"
              ></qw-input>
            </qw-label>
          </div>
          <qw-label label="商品图片">
            <div class="image-area">
              <a-carousel arrows :afterChange="updateIndex" class="carousel">
                <template #prevArrow @click="sliding = true">
                  <div
                    class="custom-slick-arrow"
                    :style="{ left: '10px', zIndex: 1 }"
                  >
                    <a-icon type="left-circle" />
                  </div>
                </template>
                <template #nextArrow @click="sliding = true">
                  <div class="custom-slick-arrow" style="right: 10px">
                    <a-icon type="right-circle" />
                  </div>
                </template>
                <div
                  class="carousel-item"
                  v-for="img in goods.images"
                  :key="img.id"
                >
                  <img :src="img.src" alt="" />
                </div>
              </a-carousel>
              <div class="bottom">
                <qw-button
                  label="添加"
                  class="add"
                  type="file"
                  @change="uploadImage"
                  @keypress.native.enter="() => {}"
                ></qw-button>
                <qw-button
                  label="删除"
                  type="button"
                  class="remove"
                  @click="removeImage"
                ></qw-button>
              </div>
            </div>
          </qw-label>
        </div>
        <div class="operate">
          <qw-button type="submit" label="修改" class="btn submit"></qw-button>
          <qw-button
            type="button"
            label="重置"
            class="btn reset"
            @click="resetForm"
          ></qw-button>
        </div>
      </qw-form>
    </div>
  </div>
</template>
<script>
//引入表单组件
import formComponent from "@/components/formComponent";
//导入轮播图组件
import carouselCompinent from "@/components/carouselComponent";

import "@/assets/css/goodsModify.less";

import * as goodsApi from "@/api/goods";
import { getAllCategoryAndSub, getAllTags, uploadImg } from "@/api/goods";
import { getBase64 } from "@/util";
export default {
  components: {
    ...formComponent,
    ...carouselCompinent,
  },
  props: {
    goodsId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      goods: null,
      formCache: null, //用于缓存原始数据，便于重置
      rules: {
        title: [{ require: true, msg: "必须填上标题" }],
      },
      curImgIndex: 0,
      categoryList: [],
      tagsList: [],
      subCategoryList: [],
      categoryMap: null, //类名与其id的映射表
      sliding: false, //轮播图是否处于轮播状态
      // subCategoryMap: null, //子类目与其id的映射表
      // originImgs: [], //用于记录原始图片
      // newImgs: [], //用于记录新添加的图片
      // rmImgs: [], //用于记录删除的图片
    };
  },
  async created() {
    await this.initGoods();
    this.categoryMap = {};
    const result = (await getAllCategoryAndSub()).data;
    for (const category of result) {
      this.categoryList.push(category.name);
      this.categoryMap[category.name] = category.subCategories;
    }
    this.subCategoryList = this.categoryMap[this.goods.category];

    this.subCategoryList = this.categoryMap[this.goods.category];

    const tagsList = await getAllTags();
    this.tagsList = tagsList.data;
  },
  watch: {
    "goods.category": {
      immediate: false,
      handler: async function () {
        if (!this.categoryMap) return;
        this.subCategoryList = this.categoryMap[this.goods.category];
        this.goods.subCategory = this.subCategoryList[0].name;
      },
    },
  },
  methods: {
    async initGoods() {
      const goodsId = this.goodsId;
      console.log("id", goodsId);
      const goodsInfo = (await goodsApi.getGoodsById(goodsId)).data;
      goodsInfo.images = (await goodsApi.getImgSrc(goodsId)).data;
      goodsInfo.tags = (await goodsApi.getTags(goodsId)).data;

      this.goods = goodsInfo;
      console.log(this.goods);
    },
    async uploadImage(el) {
      // getBase64(el).then((base64) => {
      //   //生成base64图片在页面中展示
      //   this.goods.images.push({ src: base64 });
      // });
      /* 上传图片到服务中 */
      const formData = new FormData();
      formData.append("img", el.files[0]);
      formData.append("goodsId", this.goods.id);
      const src = (await uploadImg(formData)).data;
      this.goods.images.push(src);
    },
    removeImage() {
      if (this.sliding) {
        //轮播图处于滑动状态，不移除图片
        return;
      }
      const index = this.goods.images.splice(this.curImgIndex, 1)[0];
      goodsApi.removeImg(index);
    },
    updateIndex(index) {
      this.curImgIndex = index;
      this.sliding = false;
    },
    resetForm() {
      //图片不做重置处理
      this.formCache.images = this.goods.images;

      this.goods = deepClone(this.formCache);
    },
    submit() {
      //向数据中注入子类目更改后的id
      this.goods.subCategoryId = this.subCategoryList.find((val) => {
        return val.name == this.goods.subCategory;
      }).id;
      console.log(this.goods);
      // this.diffImgs();
      this.$emit("submit", this.goods);
    },
    back() {
      this.$emit("back");
    },
  },
};
</script>