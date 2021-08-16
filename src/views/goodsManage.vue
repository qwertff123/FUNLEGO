<template>
  <div class="goods-manage">
    <!-- <div class="table-filter"> -->
    <qw-form class="table-filter">
      <qw-label label="商品关键字" class="condition-box">
        <input type="text" v-model="condition.keyword" placeholder="无条件" />
      </qw-label>
      <qw-label label="商品类别" class="condition-box">
        <qw-select placeholder="请选择相应种类" v-model="condition.category">
          <qw-option v-for="item in categoryList" :value="item" :key="item">{{
            item
          }}</qw-option>
        </qw-select>
      </qw-label>
      <!-- <qw-label label="商品子类" class="condition-box">
        <qw-select placeholder="请选择子类" v-model="category">
          <qw-option v-for="item in categoryList" :value="item" :key="item">{{
            item
          }}</qw-option>
        </qw-select>
      </qw-label> -->
      <div class="operation">
        <button class="search-btn" @click="search">查询</button>
        <button class="reset-btn" @click="reset">重置</button>
      </div>
    </qw-form>
    <!-- </div> -->
    <div class="info-box">
      <div class="table">
        <div class="top">
          <span class="title">商品信息预览列表</span>
          <div class="right">
            <i class="iconfont add-goods" @click="isAdd = true"></i>
          </div>
        </div>
        <qw-table :table-data="goodsList" @selected="showInfo">
          <qw-table-column prop="id" label="id" />
          <qw-table-column prop="title" label="标题" />
          <qw-table-column prop="price" label="价格" />
          <qw-table-column prop="sales" label="销售量" />
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

      <!-- 商品详情卡片 -->
      <goods-card
        v-if="isShowInfo"
        :goodsId="goodsId"
        @back="isShowInfo = !isShowInfo"
      ></goods-card>

      <goods-modify
        :goodsId="goodsId"
        v-if="isEdit"
        @back="isEdit = !isEdit"
        @submit="updateGoods"
      ></goods-modify>
      <goods-create v-if="isAdd" @back="isAdd = !isAdd"></goods-create>
      <!-- <goods-modify @submit="addGoods" v-if="isAdd" :onback="() => (isAdd = !isAdd)">
      </goods-modify> -->
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
import * as goodsApi from "@/api/goods";

//导入商品信息卡片组件
import goodsCard from "@/components/goodsCard.vue";

//导入商品编辑卡片组件
import goodsModify from "@/components/goodsModify.vue";

import goodsCreate from "@/components/goodsCreate.vue";

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
    goodsCard,
    goodsModify,
    goodsCreate
  },
  data() {
    return {
      pageSize: 0, //当前总页数
      curPage: 1, //当前页数
      maxAmount: 5, //单页最大展示的数据数量
      goodsList: [], //商品信息
      goodsId: null, //选中编辑商品的Id
      //需要展示在详细信息页面的与键值对应的标题（需要与服务端请求回来的数据要相匹配）
      isShowInfo: false, //是否展示商品的详细信息
      isEdit: false, //是否编辑商品信息
      isAdd: false, //是否处于添加商品信息
      // categoryInfo: {}, //得到所有类目信息
      //筛选条件
      condition: {
        keyword: "",
        category: "",
      },
      //当前已定的筛选条件，即已点击查询之后，所记录的筛选条件，用于为分页展示数据
      curCondition: {},
      categoryList: "",
      category: "",
    };
  },
  methods: {
    //用于初始化所需要的数据
    async initData() {
      const result = await goodsApi.getGoodsList(this.curPage, this.maxAmount);
      this.goodsList = result.data.rows;
      this.pageSize = Math.ceil(result.data.count / this.maxAmount);

      this.categoryList = (await goodsApi.getAllCategory()).data;
    },
    /**
     * 换页时调用的回掉函数
     */
    async cbChangePage(num) {
      this.curPage = num;
      /* 当换页时即时更新tbody中的数据 */
      // const result = await goodsApi.getGoodsList(this.curPage,this.maxAmount);
      const result = await goodsApi.getFilterGoods(
        this.curCondition,
        this.maxAmount,
        this.curPage
      );
      this.goodsList = result.data.rows;
    },
    async edit(data) {
      this.goodsId = data.id;
      this.isEdit = true;
    },
    remove(data) {
      if (confirm("确认要删除吗")) {
        goodsApi.removeGoods(data.id).then(() => {
          this.initData();
        });
      }
    },

    /**
     * 点击单行时触发的事件处理函数
     */
    async showInfo(data) {
      this.goodsId = data.id;
      this.isShowInfo = true;
    },
    
    /**
     * 修改商品信息至服务端
     */
    async updateGoods(goods) {
      console.log(goods);
      await goodsApi.updateGoods(goods);
      const result = await goodsApi.getFilterGoods(
        this.curCondition,
        this.maxAmount,
        this.curPage
      );
      this.goodsList = result.data.rows;
      console.log(this.goodsList);
      this.isEdit = !this.isEdit;
    },

    //添加-----添加商品，将商品数据发送至服务端
    async addGoods() {
      
    },
    //添加-------移除商品图片
    addRemoveImage() {
      if (confirm("确定要删除该图片吗")) {
        this.formAddGoods.images.splice(this.curImgIndex, 1);
      }
    },

    /**
     * 根据筛选条件查询商品
     */
    async search() {
      this.curPage = 1;
      console.log(this.condition)
      const result = await goodsApi.getFilterGoods(
        this.condition,
        this.maxAmount,
        this.curPage
      );
      console.log(result.data)
      const { count, rows } = result.data;
      this.pageSize = Math.ceil(count / this.maxAmount);
      this.goodsList = rows;
      this.pageSize = Math.ceil(result.data.count / this.maxAmount);
      this.curCondition = { ...this.condition };
    },
    /**
     * 重置筛选条件
     */
    async reset() {
      this.curPage = 1;
      const result = await goodsApi.getGoodsList(this.curPage, this.maxAmount);
      const { count, rows } = result.data;
      this.pageSize = Math.ceil(count / this.maxAmount);
      this.goodsList = rows;
      this.pageSize = Math.ceil(result.data.count / this.maxAmount);
      this.curCondition = {};
      for (const key in this.condition) {
        this.condition[key] = "";
      }
    },
  },
  created() {
    window.vm = this;
    this.initData();
  },
};
</script>
<style scoped lang="less">
/* 对于利用@import url()来导入css文件时，需要注意利用@代表src文件目录时，
需要在其前面添加上~符号以能够被webpack所能够解析 */
@import url("~@/assets/css/goodsManage.less");
</style>