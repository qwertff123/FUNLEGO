<template>
  <div class="edit">
    <div class="back" @click="onback">返回</div>
    <div class="card">
      <div class="id" v-if="goods">ID : {{ goods.id }}</div>
      <qw-form class="form" @submit="submit">
        <div class="form-left">
          <qw-label label="商品标题" class="item">
            <qw-input v-model="form.title"></qw-input>
          </qw-label>

          <qw-label label="商品描述" class="item">
            <qw-input v-model="form.desc"></qw-input>
          </qw-label>

          <div class="item">
            <qw-label label="商品类目" class="left">
              <qw-select v-model="form.category">
                <qw-option
                  v-for="category in categoryList"
                  :key="category"
                  :value="category"
                  >{{ category }}</qw-option
                >
              </qw-select>
            </qw-label>

            <qw-label label="商品子类目" class="right">
              <!-- <qw-select
                v-model="form.c_item"
                placeholder="请选择"
                :watch="c_items_list"
              >
                <qw-option
                  v-for="item in c_items_list"
                  :key="item"
                  :value="item"
                  >{{ item }}</qw-option
                >
              </qw-select> -->
            </qw-label>
          </div>
          <div class="item">
            <qw-label label="商品价格" class="left">
              <qw-input class="center" v-model="form.price"></qw-input>
            </qw-label>
            <qw-label label="商品折扣价" class="right">
              <qw-input
                class="center"
                v-model="form.price_off"
                placeholder="请输入"
              ></qw-input>
            </qw-label>
          </div>
          <qw-label label="商品标签" class="tags-area">
            <qw-tags-list
              v-model="form.tags"
              placeholder="请输入标签名"
            ></qw-tags-list>
          </qw-label>
        </div>
        <div class="form-right">
          <div class="item">
            <qw-label label="商品单位" class="left">
              <qw-input class="center" v-model="form.unit"></qw-input>
            </qw-label>
            <qw-label label="是否上架" class="right switch">
              <div class="switch">
                <qw-switch v-model="form.status"></qw-switch>
              </div>
            </qw-label>
          </div>

          <div class="item">
            <qw-label label="库存量" class="left">
              <qw-input class="center" v-model="form.inventory"></qw-input>
            </qw-label>
            <qw-label label="销售量" class="right">
              <qw-input class="center" v-model="form.sales"></qw-input>
            </qw-label>
          </div>
          <qw-label label="商品图片" class="">
            <div class="image-area">
              <qw-carousel class="carousel">
                <carousel-control move="prev" class="control"
                  >《</carousel-control
                >
                <carousel-area
                  item-width="200"
                  :watch="form.images"
                  v-model="curImgIndex"
                >
                  <carousel-item
                    v-for="img in form.images"
                    :key="img"
                    class="carousel-item"
                  >
                    <img :src="img" alt="" />
                  </carousel-item>
                </carousel-area>
                <carousel-control move="next" class="control">
                  》</carousel-control
                >
              </qw-carousel>

              <div class="bottom">
                <qw-button
                  label="添加"
                  class="add"
                  type="file"
                  @change="uploadImage"
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

import { getAllCategory } from "@/api/goods";
import {getBase64 } from "@/util"
export default {
  components: {
    ...formComponent,
    ...carouselCompinent,
  },
  props: {
    goods: {
      type: Object,
    },
    onback: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  data() {
    return {
      form: {
        title: "",
        desc: "",
        category: "",
        // c_items: "",
        tags: [],
        price: "",
        price_off: "",
        unit: "",
        issale: "",
        images: [],
        inventory: "",
        sales: "",
      },
      curImgIndex: 0,
      categoryList: ["1", "2"],
    };
  },
  mounted() {
    Object.assign(this.form, this.goods);
    console.log(this.form);
    getAllCategory().then((result) => {
      this.categoryList = result.data;
      console.log(this.categoryList);
    });
  },
  methods: {
    uploadImage(el) {
      getBase64(el).then((base64) => {
        this.form.images.push(base64);
      });
    },
    removeImage() {
        this.form.images.splice(this.curImgIndex,1);
    },
    resetForm() {},
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
<style scoped lang="less">
.edit {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

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
  .center {
    text-align: center;
    padding-left: 0;
  }
  .card {
    flex: 1 1 auto;
    width: 100%;
    border: 1px solid rgba(101, 94, 255, 0.6);
    box-shadow: 0 0 8px 1px rgba(101, 94, 255, 0.6);
    border-radius: 15px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;

    .id {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      font-size: 20px;
      background-color: rgb(206, 210, 221);
      border-radius: 5px;
      padding: 0 20px;
      font-weight: bolder;
      color: white;
    }

    .form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .form-left {
        flex: 0 0 48%;
      }

      .form-right {
        flex: 0 0 48%;
      }

      .item {
        display: flex;
        margin: 15px 0;
        height: 35px;
        justify-content: space-between;

        .qw-input {
          flex: 1 1 auto;
          text-align: center;
        }
        .left,
        .right {
          flex: 0 0 45%;
        }

        .switch {
          margin-left: 20px;
          display: flex;
          align-items: center;
        }
      }

      .tags-area {
        margin: 15px 0;
        height: auto;
      }

      .image-area {
        display: flex;
        height: 250px;
        flex-wrap: wrap;
        border: 1px solid black;

        .carousel {
          height: 180px;
          width: 100%;
          border: 1px solid black;
          display: flex;

          .carousel-area {
            height: 100%;
            width: 200px;

            .carousel-item {
              width: 300px;
              height: 100%;
            }

            img {
              width: 100%;
              height: 100%;
            }
          }

          .control {
            flex: 1 1 auto;
          }
        }

        .bottom {
          margin: 0 10px;
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

      .operate {
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-evenly;

        .btn {
          width: 100px;
          height: 30px;

          text &.submit {
            background-color: rgb(102, 94, 255);
          }

          &.reset {
            background-color: transparent;
            color: #78849e;
            border: 1px solid #78849e;
          }
        }
      }
    }
  }
}
</style>