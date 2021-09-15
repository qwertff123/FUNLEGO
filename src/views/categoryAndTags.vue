<template>
  <div class="category-tags">
    <div class="top">
      <div class="checkout-box">
        <span @click="isTag = false" :class="{ active: !isTag }">类名</span>
        <span @click="isTag = true" :class="{ active: isTag }">标签</span>
        <!-- <span class="bottom"></span> -->
      </div>
    </div>
    <div class="content">
      <div class="category" v-if="!isTag">
        <div class="search">
          <input
            type="text"
            class="search"
            placeholder="关键字（类名或子类名）"
          />
        </div>
        <ul class="list">
          <li
            v-for="category in categoryList"
            :key="category.id"
            @click="editCategory(category)"
          >
            <div class="image">
              <img :src="category.img.src" alt="" />
            </div>
            {{ category.name }}
          </li>
        </ul>
        <div class="add-icon" @click="addCategory"></div>
      </div>
      <div class="mask" v-if="isEdit || isAdd">
        <qw-form
          class="category-edit"
          @submit="categorySubmit"
          :rules="rules"
          v-model="form"
        >
          <i
            class="iconfont close"
            @click="
              isEdit = false;
              isAdd = false;
            "
          ></i>
          <div class="category-e">
            <div class="image">
              <img :src="form.img.src" v-if="form.img.src" />
              <div v-else>请选择图片</div>
              <qw-button
                type="file"
                field="img"
                class="replace-img"
                @change="uploadImage"
                prop="img"
              ></qw-button>
            </div>

            <qw-label label="类名">
              <qw-input type="text" v-model="form.name" prop="name"></qw-input>
            </qw-label>
          </div>
          <div class="subCategory-e">
            <div class="add-tool">
              <qw-input
                placeholder="请输入子类名"
                v-model="subCategory"
                prop="sub_categories"
              ></qw-input>
              <button type="button" class="btn add" @click="addSubCategory">
                添加
              </button>
            </div>
            <div class="subCategory-list">
              <span
                class="tag"
                v-for="(item, index) in form.sub_categories"
                :key="item.id"
                >{{ item.name
                }}<i
                  class="iconfont qw-close"
                  @click="removeSubCategory(item, index)"
                ></i
              ></span>
            </div>
          </div>
          <button type="submit" class="btn submit" v-if="isEdit">修改</button>
          <button type="submit" class="btn submit" v-else>提交</button>
        </qw-form>
      </div>
      <div class="tag" v-if="isTag">
        <tag-box></tag-box>
      </div>
    </div>
  </div>
</template>
<script>
// import "@/assets/css/categoryAndTags.css";
import formComponent from "@/components/formComponent";

import tagBox from "@/components/tagBox";

import {
  updateCategory,
  uploadImg,
  getAllCategory,
  removeSubCategory,
  addCategory,
} from "@/api/goods";


export default {
  components: {
    ...formComponent,
    tagBox,
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        img: {
          id: "",
          src: "",
        },
        sub_categories: [],
        newSubCategories: [], //记录新的子类名字
      },
      rules: {
        name: [{ require: true, msg: "必须填写类目", trigger: "input" }],
        sub_categories: [
          {
            validator: (val) => {
              return !!val.length;
            },
            msg: "必须添加至少一个子类",
            trigger: "change",
          },
        ],
        img: [
          {
            validator: (val) => {
              return !!val.src;
            },
            msg: "必须选中一张图片",
          },
        ],
      },
      subCategory: "",
      // subcategories: [],
      // rmSubcategoryIds : [],
      // newSubCategories : [],
      categoryList: [],
      isEdit: false, //是否处于类信息编辑状态
      isAdd: false, //是否处于类信息添加状态
      isTag: false, //是否处于标签修改状态
    };
  },
  async created() {
    this.categoryList = (await getAllCategory()).data;
  },
  methods: {
    addSubCategory() {
      if (!this.subCategory) {
        return;
      }
      if (
        this.form.sub_categories.some((val) => val.name == this.subCategory)
      ) {
        this.$message.error("重复标签名，添加失败！！");
        this.subCategory = "";
        return;
      }
      this.form.sub_categories.push({ name: this.subCategory });
      this.form.newSubCategories.push(this.subCategory);
      this.subCategory = "";
    },
    async removeSubCategory(subCategory, index) {
      if (subCategory.id) {
        //有id则说明时本来就有的子类
        const result = await removeSubCategory(subCategory.id);
        if (result.status == "error") {
          this.$message.error("子类已被占用，无法删除");
          return;
        }
        this.$message.success(`已移除《${subCategory.name}》`);
      } else {
        const index = this.form.newSubCategories.indexOf(subCategory.name);
        this.form.newSubCategories.splice(index, 1);
      }
      this.form.sub_categories.splice(index, 1)[0];
    },
    async categorySubmit() {
      if (this.isEdit) {
        //编辑
        const category = (await updateCategory(this.form.id, this.form)).data;
        this.$message.success("修改成功");
        const target = this.categoryList.find((val) => val.id == this.form.id);
        Object.assign(target, category);
        this.isEdit = false;
      } else {
        //添加
        const category = (await addCategory(this.form)).data;
        this.$message.success("添加成功");
        this.categoryList.push(category);
        this.isAdd = false;
      }
    },
    async uploadImage(formData) {
      console.log(formData);
      const img = (await uploadImg(formData)).data;
      this.form.img = img;
    },
    editCategory(category) {
      Object.assign(this.form, category);
      this.isEdit = true;
    },
    addCategory() {
      this.form = {
        name: "",
        img: {
          id: "",
          src: "",
        },
        sub_categories: [],
        newSubCategories: [], //记录新的子类名字
      };
      this.isAdd = true;
    },
  },
};
</script>
<!-- 注意！！！

用于引入的是css文件，但编写的是less文件，因此当更新less文件时，都需要执行
npx lessc "D:\web\web\DuYi-18\简历项目\FUNLEGO商品管理系统\FUNLEGO--B端\app\src\assets\css\categoryAndTags.less" "D:\web\web\DuYi-18\简历项目\FUNLEGO商品管理系统\FUNLEGO--B端\app\src\assets\css\categoryAndTags.css" 
将less文件编译成css文件
 -->
 <!--
  <style src="@/assets/css/categoryAndTags.css" scoped>
</style>
 -->

 <style scoped lang="less">
.category-tags {
  width: 100%;
  height: 90%;
  background-color: white;

  .top {
    padding: 25px 0;
    text-align: center;
    font-size: 14px;
    background-color: transparent;

    .checkout-box {
      display: inline-block;
      position: relative;
      width: 120px;
      background-color: transparent;
      z-index: 100;

      span {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        border: 1px solid #665eff;
        background-color: transparent;
        cursor: pointer;

        &.active {
          color: white;
          background-color: #665eff;
        }

        &.bottom {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 30px;
          background-color: #665eff;
          z-index: -1;
        }
      }
    }
  }

  .content {
    width: 80%;
    height: 400px;
    margin: 0 auto;
    user-select: none;
    position: relative;
    border: 1px dashed #665eff;

    .category {
      .add-icon {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: url("../assets/add.png") center/cover no-repeat;
      }
      .search {
        height: 40px;
        width: 100%;
        background-color: #eee;
        outline: none;
        border: none;
        box-sizing: border-box;
        padding-left: 10px;
        margin-bottom: 20px;
      }

      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;

        li {
          width: 160px;
          height: 60px;
          flex: 0 0 auto;
          margin-left: 18px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          border-radius: 15px;
          background-color: rgba(102, 94, 255, 0.2);
          cursor: pointer;

          &:hover {
            box-shadow: 0px 0px 5px 1px rgba(100, 92, 255, 0.4);
          }

          .image {
            width: 45px;
            height: 45px;
            border: 2px solid #eee;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 10px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(207, 211, 222, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      .category-edit {
        width: 80%;
        background-color: white;
        text-align: center;
        border-radius: 15px;
        padding-bottom: 10px;
        position: relative;
        .close {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 16px;
          border-radius: 50%;
          transition: all 0.1s;
          &:hover {
            background-color: #e54f50;
            color: white;
          }
          &::after {
            content: "\e6c9";
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
          }
        }

        .btn {
          font-size: 14px;
          padding: 5px 10px;
          background-color: #3acde1;
          color: white;
          font-weight: bolder;
        }
        .category-e {
          width: 100%;
          // height: 100px;
          display: flex;
          align-items: center;

          .qw-label {
            width: 200px;
            height: 40px;
            display: flex;
            align-items: center;
            margin-left: 50px;
            font-weight: bolder;
            .qw-input {
              width: 100%;
              height: 100%;
              font-size: 16px;
              text-align: center;
            }
          }
          .image {
            width: 120px;
            height: 120px;
            border: 1px solid #eee;
            margin: 15px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .replace-img {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 100%;
              background-color: transparent;
            }
            &:hover .replace-img {
              background: rgba(255, 255, 255, 0.6)
                url("../assets/imgReplace.png") center/40px 40px no-repeat;
            }
          }
        }
        .subCategory-e {
          width: 100%;
          height: 150px;
          margin-bottom: 10px;
          .add-tool {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            .qw-input {
              height: 40px;
              width: 30%;
              border: none;
              background-color: #eee;
            }
          }
          .subCategory-list {
            margin: 10px auto;
            border: 1px dashed #eee;
            padding: 10px;
            box-sizing: border-box;
            width: 80%;
            height: 70%;
            .tag {
              display: inline-block;
              height: 25px;
              line-height: 25px;
              padding-left: 5px;
              font-size: 12px;
              background-color: rgb(52, 151, 253);
              color: white;
              box-sizing: border-box;
              border-radius: 5px;
              margin-right: 10px;
              margin-top: 10px;
              vertical-align: middle;
              width:auto;
              i {
                display: inline-block;
                height: 20px;
                width: 20px;
                line-height: 20px;
                text-align: center;
                margin-left: 3px;
                vertical-align: middle;
                cursor: pointer;
                &:hover {
                  color: rgb(229, 79, 80);
                }
              }
            }
          }
        }
      }
    }
    .tag {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

