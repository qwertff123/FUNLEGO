<template>
  <div class="add-box">
    <div class="back" @click="back">返回</div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <template v-if="current == 0">
        <qw-form
          class="base-form"
          @submit="next"
          :rules="rules"
          v-model="form1"
        >
          <qw-label label="商品标题" class="label">
            <qw-input
              class="input"
              v-model="form1.title"
              prop="title"
            ></qw-input>
          </qw-label>
          <qw-label label="商品描述" class="label">
            <qw-input class="input" v-model="form1.desc" prop="desc"></qw-input>
          </qw-label>
          <div class="row">
            <qw-label label="价格" class="label">
              <qw-input
                class="input"
                v-model="form1.price"
                prop="price"
              ></qw-input>
            </qw-label>
            <qw-label label="折扣价" class="label">
              <qw-input
                class="input"
                v-model="form1.price_off"
                prop="price_off"
                placeholder="空"
              ></qw-input>
            </qw-label>
          </div>
          <div class="row">
            <qw-label label="商品库存" class="label">
              <qw-input
                class="input"
                v-model="form1.inventory"
                prop="inventory"
              ></qw-input>
            </qw-label>
            <qw-label label="是否上架" class="label">
              <qw-switch v-model="form1.issale"></qw-switch>
            </qw-label>
          </div>
          <button type="submit" ref="firstBtn"></button>
        </qw-form>
      </template>
      <template v-if="current == 1">
        <qw-form v-model="form2" :rules="rules" @submit="addGoods">
          <div class="row">
            <qw-label label="商品类目" class="label">
              <qw-select
                placeholder="请选择"
                v-model="form2.category"
                prop="category"
              >
                <qw-option
                  v-for="category in categoryList"
                  :key="category"
                  :value="category"
                  >{{ category }}</qw-option
                >
              </qw-select>
            </qw-label>
            <qw-label label="商品子类" class="label">
              <qw-select
                placeholder="请选择"
                v-model="form2.subCategory"
                prop="subCategory"
              >
                <qw-option
                  v-for="subCategory in subCategoryList"
                  :key="subCategory.id"
                  :value="subCategory.name"
                  >{{ subCategory.name }}</qw-option
                >
              </qw-select>
            </qw-label>
          </div>
          <qw-label label="商品标签" class="tags-area">
            <qw-tags-selector
              v-model="form2.tags"
              :tagsList="tagsList"
            ></qw-tags-selector>
          </qw-label>
          <button type="submit" ref="secondBtn"></button>
        </qw-form>
      </template>
      <template v-if="current == 2">
        <div class="image-area">
          <a-carousel arrows dots-class="slick-dots slick-thumb">
            <template #customPaging="props" v-if="images != 0">
              <a>
                <img :src="images[props.i].src" />
              </a>
            </template>
            <div class="container default" v-if="images.length == 0">
              请添加图片
            </div>
            <div v-for="item in images" :key="item.id">
              <img :src="item.src" />
            </div>
          </a-carousel>
          <div class="bottom">
            <qw-button
              label="添加"
              class="add"
              type="file"
              field="img"
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
      </template>
    </div>
    <div class="steps-action">
      <a-button
        v-if="current > 0 && current < 2"
        style="margin-left: 8px"
        @click="prev"
      >
        上一步
      </a-button>
      <a-button
        v-if="current == 0"
        type="primary"
        @click="$refs.firstBtn.click()"
      >
        下一步
      </a-button>
      <!-- <a-button
        v-if="current != 1"
        type="primary"
        @click=""
      >
        下一步
      </a-button> -->
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="back()"
      >
        完成
      </a-button>

      <a-button
        v-if="current == 1"
        type="primary"
        @click="$refs.secondBtn.click()"
        style="margin-left: 8px"
        >提交</a-button
      >
    </div>
  </div>
</template>
<script>
import formComponent from "@/components/formComponent";

import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'

import {
  getAllCategoryAndSub,
  addGoods,
  getAllTags,
  uploadImg,
  removeImg,
} from "@/api/goods";

// import carouselCompinent from "@/components/carouselComponent";
export default {
  components: {
    ...formComponent,
    // ...carouselCompinent,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "商品信息",
        },
        {
          title: "类别与标签",
        },
        {
          title: "商品图片",
        },
      ],
      form1: {
        title: "123",
        desc: "123",
        price: "123",
        price_off: null,
        unit: "个",
        issale: true,
        images: [],
        inventory: "123",
        sales: 0,
      },
      form2: {
        category: "",
        tags: [],
        subCategory: "",
      },
      images: [],
      curImgIndex: 0, //记录轮播图片的索引
      rules: {
        title: [{ require: true, msg: "标题不能为空", trigger: "input" }],
        desc: [{ require: true, msg: "描述不能为空", trigger: "input" }],
        category: [
          { require: true, msg: "必须选择一个类目", trigger: "change" },
        ],
        subCategory: [
          {
            require: true,
            msg: "必须选择一个类目",
            trigger: "change",
          },
        ],
        price: [
          { require: true, msg: "需填写价格", trigger: "input" },
          {
            validator(val) {
              return (+val).toString() != "NaN";
            },
            msg: "必须为数字",
            trigger: "input",
          },
        ],
        inventory: [
          { require: true, msg: "需填写库存量", trigger: "input" },
          {
            validator(val) {
              return (+val).toString() != "NaN";
            },
            msg: "必须为数字",
            trigger: "input",
          },
        ],
      },
      categoryMap: {},
      categoryList: [],
      subCategoryList: [],
      tagsList: null,
    };
  },
  async created() {
    window.test = this;
    const result = (await getAllCategoryAndSub()).data;
    for (const category of result) {
      this.categoryList.push(category.name);
      this.categoryMap[category.name] = category.subCategories;
    }
    console.log(this.categoryMap);
    this.subCategoryList = this.categoryMap[this.form2.category];
    this.tagsList = (await getAllTags()).data;

    console.log(this.$carousel);
  },
  watch: {
    "form2.category"() {
      console.log(this.form2.category);
      this.subCategoryList = this.categoryMap[this.form2.category];
      this.form2.subCategory = this.subCategoryList[0].name;
    },
  },
  methods: {
    async addGoods() {
      const form = { ...this.form1, ...this.form2 };
      form.subCategoryId = this.subCategoryList.find((val) => {
        return val.name == this.form2.subCategory;
      }).id;
      console.log(form);
      const result = await addGoods(form);
      if (result.status == "success") {
        this.$message.success("基本信息添加完毕");
        this.goodsId = result.data;
        console.log(this.goodsId);
        this.next();
      }
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    back() {
      this.$emit("back");
    },
    async uploadImage(formData) {
      /* 上传图片到服务中 */
      formData.append("goodsId", this.goodsId);
      const src = (await uploadImg(formData)).data;
      const filename = src.src.replace(/.*\//g, "");
      this.$message.success(`${filename} 添加成功`);
      this.images.push(src);
    },
    async removeImage() {
      const filename = this.images[this.curImgIndex].src.replace(/.*\//g, "");
      const index = this.images.splice(this.curImgIndex, 1)[0];
      await removeImg(index);
      this.$message.success(`${filename} 移除成功`);
    },
  },
};
</script>
<style lang="less">
.add-box {
  .back {
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgb(88, 115, 255);
    color: white;
    cursor: pointer;

    &:active {
      opacity: 0.6;
    }
  }
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    // background-color: #ffc8c8;
    min-height: 200px;
    display: flex;
    justify-content: center;

    // text-align: center;
    // padding-top: 80px;
    .row {
      display: flex;
      width: 400px;
      margin-bottom: 10px;
      .label {
        padding-right: 10px;
        flex: 1 1 auto;
      }
    }
    .base-form {
      .label {
        // height:auto;
        height: 40px;
        display: flex;
        align-items: center;
        font-weight: bolder;
        // line-height: 40px;
        // width:300px;
        // width: 80%;
        // vertical-align: middle;
        .input {
          // width: 200px;
          // width:100%;
          height: 100%;
          padding: 0;
          // margin-bottom: 10px;
          text-align: center;
        }
      }
      .submit-btn {
        width: 60px;
        margin: 15px auto;
      }
    }

    .image-area {
      .ant-carousel {
        width: 600px;
        height: 380px;
      }
      .container {
        &.default {
          line-height: 300px;
          text-align: center;
          background-color: #fff;
        }
      }
      .bottom {
        margin: 10px;
        display: flex;
        height: 30px;
        width: 100%;
        justify-content: center;
        .add,
        .remove {
          margin: 0 10px;
          width: 60px;
        }

        .remove {
          background-color: rgb(229, 79, 80);
          color: white;
        }
      }
    }
  }
  .steps-action {
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }
}

.ant-carousel .slick-dots {
  height: auto;
}

.ant-carousel .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 100%;
  max-height: 320px;
}
.ant-carousel .slick-thumb {
  bottom: -45px;
}
.ant-carousel .slick-thumb li {
  width: 60px;
  height: 45px;
  background-color: #fff;
}
.ant-carousel .slick-thumb li img {
  // width: 100%;
  // height: 100%;
  max-height: 45px;
  filter: grayscale(100%);
}
.ant-carousel .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
