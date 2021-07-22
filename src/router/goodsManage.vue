<template>
  <div class="goods-manage">
    <div class="table-filter">
      <label>
        商品名称
        <input type="text" />
      </label>
      <label>
        商品ID
        <input type="text" />
      </label>
      <div class="operation">
        <button class="search-btn">查询</button>
        <button class="reset-btn">重置</button>
      </div>
    </div>
    <div class="info-box">
      <div class="table">
        <div class="top">
          <span class="title">商品信息预览列表</span>
          <div class="right">
            <i
              class="iconfont add-goods"
              @click="
                () => {
                  isAdd = true;
                  for (const key in formAddGoods) {
                    formAddGoods[key] = '';
                  }
                }
              "
            ></i>
          </div>
        </div>
        <qw-table :table-data="tableData" @selected="showInfo">
          <qw-table-column prop="id" label="id" />
          <qw-table-column prop="title" label="标题" />
          <qw-table-column prop="price" label="价格" />
          <qw-table-column prop="sale" label="销售量" />
          <qw-table-column prop="inventory" label="库存量" />
          <qw-table-column label="操作" #default="{ rowData }">
            <div class="operate">
              <qw-button
                class="edit-btn"
                label="修改"
                eventConfig="stop"
                type="button"
                @click="edit(rowData)"
                >修改</qw-button
              >
              <qw-button
                class="remove-btn"
                label="删除"
                eventConfig="stop"
                type="button"
                @click="remove(rowData)"
                >删除</qw-button
              >
            </div>
          </qw-table-column>
        </qw-table>
      </div>
      <div class="changepage">
        <change-page
          :pageSize="pageSize"
          :curPage="curPage"
          :callback="cbChangePage"
        ></change-page>
      </div>
      <div class="info" v-show="isShowInfo">
        <div class="back" @click="isShowInfo = !isShowInfo">返回</div>
        <div class="card" v-if="goodsDetail">
          <div class="id">ID : {{ goodsDetail.id }}</div>
          <div class="top">
            <div class="img">
              <img :src="goodsDetail.images[0]" alt="" />
            </div>
            <div class="base-info">
              <div
                class="item"
                :class="{ long: item.type == 'long' }"
                v-for="item in renderGoodsInfo"
                :key="item.id"
              >
                <span class="title">{{ item.title }}</span>
                <span class="content" v-if="!item.badage">
                  {{ item.content || "无" }}
                </span>
                <span class="content" v-else>
                  <i class="badge" v-for="icon in item.content" :key="icon">{{
                    icon
                  }}</i>
                </span>
              </div>
              <div class="item status" v-if="goodsDetail">
                <span class="content">
                  <span class="content">
                    <i class="badge success" v-if="goodsDetail.status"
                      >已上架</i
                    >
                    <i class="badge error" v-else>未上架</i>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="sale-info"></div>
        </div>
      </div>
      <div class="edit" v-if="isEdit">
        <div class="back" @click="isEdit = false">返回</div>
        <div class="card">
          <div class="id">ID : {{ goodsDetail.id }}</div>
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
                      :key="category.id"
                      :value="category.id"
                      >{{ category.name }}</qw-option
                    >
                  </qw-select>
                </qw-label>

                <qw-label label="商品子类目" class="right">
                  <qw-select
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
                  </qw-select>
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
                  <qw-input class="center" v-model="form.sale"></qw-input>
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
              <qw-button
                type="submit"
                label="修改"
                class="btn submit"
              ></qw-button>
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
      <div class="edit add" v-if="isAdd">
        <div class="back" @click="isAdd = false">返回</div>
        <div class="card">
          <qw-form class="form" @submit="addGoods">
            <div class="form-left">
              <qw-label label="商品标题" class="item">
                <qw-input
                  v-model="formAddGoods.title"
                  placeholder="请输入商品标题"
                ></qw-input>
              </qw-label>

              <qw-label label="商品描述" class="item">
                <qw-input
                  v-model="formAddGoods.desc"
                  placeholder="请输入商品描述"
                ></qw-input>
              </qw-label>

              <div class="item">
                <qw-label label="商品类目" class="left">
                  <qw-select
                    v-model="formAddGoods.category"
                    placeholder="请选择"
                  >
                    <qw-option
                      v-for="category in categoryList"
                      :key="category.id"
                      :value="category.id"
                      >{{ category.name }}</qw-option
                    >
                  </qw-select>
                </qw-label>

                <qw-label label="商品子类目" class="right">
                  <qw-select
                    v-model="formAddGoods.c_item"
                    placeholder="请选择"
                    :watch="c_items_list"
                  >
                    <qw-option
                      v-for="item in c_items_list"
                      :key="item"
                      :value="item"
                      >{{ item }}</qw-option
                    >
                  </qw-select>
                </qw-label>
              </div>
              <div class="item">
                <qw-label label="商品价格" class="left">
                  <qw-input
                    class="center"
                    v-model="formAddGoods.price"
                    placeholder="请输入价格"
                  ></qw-input>
                </qw-label>
                <qw-label label="商品折扣价" class="right">
                  <qw-input
                    class="center"
                    v-model="formAddGoods.price_off"
                    placeholder="请输入折扣价"
                  ></qw-input>
                </qw-label>
              </div>
              <qw-label label="商品标签" class="tags-area">
                <qw-tags-list
                  v-model="formAddGoods.tags"
                  placeholder="请输入标签名"
                ></qw-tags-list>
              </qw-label>
            </div>
            <div class="form-right">
              <div class="item">
                <qw-label label="商品单位" class="left">
                  <qw-input
                    class="center"
                    v-model="formAddGoods.unit"
                    placeholder="请输入单位"
                  ></qw-input>
                </qw-label>
                <qw-label label="是否上架" class="right switch">
                  <div class="switch">
                    <qw-switch v-model="formAddGoods.status"></qw-switch>
                  </div>
                </qw-label>
              </div>

              <div class="item">
                <qw-label label="库存量" class="left">
                  <qw-input
                    class="center"
                    v-model="formAddGoods.inventory"
                    placeholder="请输入库存量"
                  ></qw-input>
                </qw-label>
                <qw-label label="销售量" class="right">
                  <qw-input
                    class="center"
                    v-model="formAddGoods.sale"
                    placeholder="请输入销售量"
                  ></qw-input>
                </qw-label>
              </div>
              <qw-label label="商品图片" class="">
                <div class="image-area">
                  <qw-carousel class="carousel">
                    <carousel-control move="prev" class="control"
                      >《</carousel-control
                    >
                    <carousel-area
                      class="carousel-area"
                      item-width="200"
                      :watch="formAddGoods.images"
                      v-model="curImgIndex"
                      placeholder="请添加商品图片"
                    >
                      <carousel-item
                        v-for="img in formAddGoods.images"
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
                      @change="addUploadImage"
                    ></qw-button>
                    <qw-button
                      label="删除"
                      type="button"
                      class="remove"
                      @click="addRemoveImage"
                    ></qw-button>
                  </div>
                </div>
              </qw-label>
            </div>
            <div class="operate">
              <qw-button
                type="submit"
                label="添加"
                class="btn submit"
              ></qw-button>
            </div>
          </qw-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引入表格组件
// import tableCmp from "../table";
import tableComponent from "@/components/tableComponent";

//引入表单组件
import formComponent from "@/components/formComponent";

//导入换页组件
import changePage from "@/components/changePage";

//导入轮播图组件
import carouselCompinent from "@/components/carouselComponent";

//导入工具库
import { deepClone, getBase64 } from "@/util";

//导入与商品有关的接口
import * as api from "@/api/goods";

export default {
  components: {
    // tableCmp,
    changePage,

    //向组件实例上注入表单组件
    ...formComponent,
    //向实例上注入轮播图组件
    ...carouselCompinent,

    //引入表格组件
    ...tableComponent,
  },
  data() {
    return {
      pageSize: 0, //当前总页数
      curPage: 1, //当前页数(从0开始)
      maxAmount: 5, //单页最大展示的数据数量
      goodsList: null, //商品信息
      goodsDetail: null, //单个商品的详细信息
      //需要展示在详细信息页面的与键值对应的标题（需要与服务端请求回来的数据要相匹配）
      showInfoKeys: {
        title: {
          title: "标题",
          type: "long",
        },
        desc: {
          title: "描述",
          type: "long",
        },
        category: "类别",
        c_item: "子类别",
        tags: {
          title: "标签",
          badage: true,
        },
        price: "价格",
        price_off: "折扣价",
      },
      isShowInfo: false, //是否展示商品的详细信息
      isEdit: false, //是否编辑商品信息
      isAdd: false, //是否处于添加商品信息
      renderGoodsInfo: {}, //用作渲染详细页的数据
      categoryInfo: {}, //得到所有类目信息
      //用于form双向数据绑定的数据
      form: {},
      //用于初次进入修改界面的所有数据，方便后续的重置
      formCache: {},
      //用于添加商品的表单
      formAddGoods: {
        title: "",
        desc: "",
        category: "",
        c_items: "",
        tags: "",
        price: "",
        price_off: "",
        unit: "",
        status: "",
        images: "",
        inventory: "",
      },
      //用于记录所有的category,只得到所有类目对应的id及其名字的信息
      categoryList: [],
      //根据category记录所属子类
      c_items_list: [],
      //tag
      tag: "",
      //当前展示的图片的索引
      curImgIndex: 0,
      tableData: [],
    };
  },
  methods: {
    //用于初始化所需要的数据
    initData() {
      api.getGoodsList("qwertff_1618500498552").then((data) => {
        if (data.status != "success") {
          throw new Error(data.msg);
        }
        this.goodsList = data.data.data;
        this.pageSize = Math.ceil(data.data.total / this.maxAmount);
        //   console.log(this.goodsList.data.slice(0, 4));
        this.tableData = this.goodsListSlice();
      });
    },
    /**
     * 换页时调用的回掉函数
     */
    cbChangePage(num) {
      this.curPage = num;
    },
    /**
     * 用于通过当前的页码与单页最大展示的数据数量，截取展示相应的数据
     */
    goodsListSlice() {
      const goodsList = this.goodsList;
      const start = (this.curPage - 1) * this.maxAmount;
      let end = this.curPage * this.maxAmount;
      end = end > this.goodsList.length ? this.goodsList.length : end;
      const result = [];
      for (let i = start; i < end; ++i) {
        result.push(goodsList[i]);
      }
      // return this.getTbody(result);
      return result;
    },

    edit(data) {
      api
        .getGoodsDetail({
          id: data.id,
          appkey: "qwertff_1618500498552",
        })
        .then((data) => {
          this.goodsDetail = data.data;
          console.log(this.goodsDetail);
          /* eslint-disable no-unused-vars */

          this.form = this.goodsDetail;
          //保存初始的form表单数据
          this.formCache = deepClone(this.form);

          this.renderGoodsInfo = this.getRenderGoodsInfo();
          this.isEdit = true;
          console.log(this.isEdit);
        });
    },
    remove(data) {
      if (confirm("确认要删除吗")) {
        api.removeGoods(data.id).then(() => {
          this.initData();
        });
      }
    },

    showInfo(data) {
      api
        .getGoodsDetail({
          id: data.id,
          appkey: "qwertff_1618500498552",
        })
        .then((data) => {
          this.goodsDetail = data.data;
          this.renderGoodsInfo = this.getRenderGoodsInfo();
          this.isShowInfo = true;
        });
    },

    /**
     * 用于获取详细页所需要渲染的页面
     */
    getRenderGoodsInfo() {
      const showInfoKeys = this.showInfoKeys;
      const goodsDetail = this.goodsDetail;
      const result = [];
      for (const key in showInfoKeys) {
        const obj = {};
        //如果有配置对象
        if (typeof showInfoKeys[key] == "object") {
          const options = showInfoKeys[key];
          obj.title = options.title;
          obj.type = options.type ? options.type : "short";
          obj.badage = options.badage || false;
          obj.content = goodsDetail[key];
        } else {
          obj.title = showInfoKeys[key];
          obj.content = goodsDetail[key];
        }
        result.push(obj);
      }
      return result;
    },
    //修改----提交修改结果至服务端
    submit() {
      this.form.updateTime = Date();
      api
        .editGoods({
          appkey: "qwertff_1618500498552",
          ...this.form,
        })
        .then(() => {
          return api.getGoodsList("qwertff_1618500498552");
        })
        .then((data) => {
          if (data.status != "success") {
            throw new Error(data.msg);
          }
          this.goodsList = data.data.data;
          this.pageSize = Math.ceil(data.data.total / this.maxAmount);
          //   console.log(this.goodsList.data.slice(0, 4));
          this.tableData = this.goodsListSlice();
          alert("修改成功");

          this.isEdit = false;
        });
    },
    //修改----添加图片
    //参数1：用于上传文件的表单元素
    //参数2:用于收集图片的数组
    uploadImage(el) {
      getBase64(el).then((base64) => {
        this.form.images.push(base64);
      });
    },
    //修改----删除当前所展示的图片
    removeImage() {
      if (confirm("确定要删除该图片吗")) {
        this.form.images.splice(this.curImgIndex, 1);
      }
    },
    //修改----重置当前表单数据
    resetForm() {
      this.form = deepClone(this.formCache);
    },

    //添加-----添加商品，将商品数据发送至服务端
    addGoods() {
      api
        .addGoods({
          appkey: "qwertff_1618500498552",
          ...this.formAddGoods,
        })
        .then((result) => {
          if (result.status == "fail") {
            alert(result.msg);
          }
          alert("添加成功");
          this.isAdd = false;
          this.initData();
        });
    },
    //添加------添加商品图片
    addUploadImage(el) {
      if (!this.formAddGoods.images) {
        this.formAddGoods.images = [];
      }
      getBase64(el).then((base64) => {
        this.formAddGoods.images.push(base64);
      });
    },
    //添加-------移除商品图片
    addRemoveImage() {
      if (confirm("确定要删除该图片吗")) {
        this.formAddGoods.images.splice(this.curImgIndex, 1);
      }
    },
  },
  watch: {
    /* 当换页时即时更新tbody中的数据 */
    curPage() {
      this.tableData = this.goodsListSlice();
    },

    "form.category"() {
      const category_id = this.form.category;
      this.c_items_list = this.categoryInfo.find(
        (val) => val.id == category_id
      ).c_items;
    },
    "formAddGoods.category"() {
      const category_id = this.formAddGoods.category;
      if (!category_id) {
        return;
      }
      this.c_items_list = this.categoryInfo.find(
        (val) => val.id == category_id
      ).c_items;
    },
  },
  created() {
    window.vm = this;
    this.initData();
    api.getCategoryInfo("qwertff_1618500498552").then((data) => {
      this.categoryInfo = data.data.data;
      this.categoryList = this.categoryInfo.map((val) => {
        return {
          name: val.name,
          id: val.id,
        };
      });
    });
  },
};
</script>
<style scoped lang="less">
/* 对于利用@import url()来导入css文件时，需要注意利用@代表src文件目录时，
需要在其前面添加上~符号以能够被webpack所能够解析 */
@import url("~@/assets/css/goodsManage.less");
</style>