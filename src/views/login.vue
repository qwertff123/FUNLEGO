<template>
  <div class="page">
    <div class="center">
      <div class="form">
        <qw-form
          @submit="login"
          v-if="status == 'login'"
          :rules="filterObj(rules, ['email', 'password'])"
          v-model="form"
          :key="1"
        >
          <p class="control-title">登录</p>
          <qw-input
            v-model="form.email"
            prop="email"
            placeholder="请输入邮箱"
            :icon="true"
          >
            <i class="iconfont email"></i>
          </qw-input>
          <qw-input
            v-model="form.password"
            prop="password"
            placeholder="请输入密码"
            :icon="true"
          >
            <i class="iconfont password"></i>
          </qw-input>
          <div class="find-password">
            <span @click="status = 'findPassword'">忘记密码?</span>
          </div>

          <div class="bottom">
            <qw-button class="active" type="submit" label="登录"></qw-button>
            <qw-button
              class="normal no-active float-right"
              label="注册"
              type="button"
              @click="status = 'register'"
            ></qw-button>
          </div>
        </qw-form>
        <qw-form
          @submit="register"
          v-else-if="status == 'register'"
          v-model="form"
          :rules="rules"
          :key="2"
        >
          <p class="control-title">注册</p>
          <qw-input
            v-model="form.username"
            placeholder="请输入用户名"
            prop="username"
            :icon="true"
          >
            <i class="iconfont username"></i>
          </qw-input>

          <qw-input
            v-model="form.email"
            placeholder="请输入邮箱"
            prop="email"
            :key="10022"
            :icon="true"
          >
            <i class="iconfont email"></i>
          </qw-input>
          <qw-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            prop="password"
            :icon="true"
          >
            <i class="iconfont password"></i>
          </qw-input>

          <qw-input
            type="password"
            v-model="form.passwordConfirm"
            placeholder="请重新输入密码"
            prop="passwordConfirm"
            :icon="true"
          >
            <i class="iconfont password"></i>
          </qw-input>
          <label class="vertify-code">
            <qw-input
              v-model="form.code"
              placeholder="请输入验证码"
              :icon="true"
            >
              <i class="iconfont code"></i>
            </qw-input>
            <qw-button
              v-model="form.code"
              class="normal"
              label="发送"
              type="button"
              @click="getCode"
            ></qw-button>
          </label>
          <div class="bottom">
            <qw-button
              class="normal no-active"
              type="button"
              label="登录"
              @click="status = 'login'"
            ></qw-button>
            <qw-button
              class="normal active float-right"
              type="submit"
              label="注册"
            ></qw-button>
          </div>
        </qw-form>
        <qw-form
          @submit="findPassword"
          v-else-if="status == 'findPassword'"
          :key="3"
        >
          <p class="control-title">找回密码</p>

          <qw-input v-model="form.email" placeholder="请输入邮箱" :icon="true">
            <i class="iconfont email"></i>
          </qw-input>
          <qw-input
            v-model="form.password"
            placeholder="请输入密码"
            :icon="true"
          >
            <i class="iconfont password"></i>
          </qw-input>

          <qw-input
            v-model="form.passwordConfirm"
            placeholder="请重新输入密码"
            :icon="true"
          >
            <i class="iconfont password"></i>
          </qw-input>
          <div class="vertify-code">
            <qw-input v-model="form.code" placeholder="验证码" :icon="true">
              <i class="iconfont code"></i>
            </qw-input>
            <qw-button
              v-model="form.code"
              class="normal"
              label="发送"
              type="button"
              @click="getCode"
            ></qw-button>
          </div>
          <div class="bottom">
            <qw-button
              class="normal no-active"
              type="button"
              label="返回"
              @click="status = 'login'"
            ></qw-button>
            <qw-button
              class="normal active float-right"
              type="submit"
              label="提交"
            ></qw-button>
          </div>
        </qw-form>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/user";
import formComponent from "@/components/formComponent";
import { filterObj } from "@/util.js";

export default {
  components: {
    ...formComponent,
  },
  data() {
    return {
      status: "login",
      form: {
        username: "",
        email: "",
        password: "1648494263",
        passwordConfirm: "",
        code: "",
      },
      rules: {
        email: [
          { require: true, msg: "需填上邮箱", trigger: ["blur", "input"] },
          {
            validator: (val) => {
              return /[\w+]+@\w+\.\w+/.test(val);
            },
            msg: "请输入正确格式的邮箱",
            trigger: "input",
          },
        ],
        password: [
          { require: true, msg: "需填上密码", trigger: ["blur", "input"] },
        ],
        username: [
          { require: true, msg: "需填上用户名", trigger: ["blur", "input"] },
        ],
        passwordConfirm: [
          { require: true, msg: "请再次确认密码", trigger: ["blur", "input"] },
          {
            validator: (val) => val == this.form.password,
            msg: "两次输入的密码不一致",
            trigger: "input",
          },
        ],
      },
    };
  },
  watch: {
    status() {
      this.form.code = "";
    },
  },
  methods: {
    getCode() {
      api.getCode(this.form.email).then((data) => {
        alert("验证码发送成功");
        console.log(data);
      });
    },
    async login() {
      const { email, password } = this.form;
      const result = await this.$store.dispatch("login", {
        email,
        password,
      });
      if (result.status == "error") {
        console.log(result.msg);
      } else {
        const userInfo = result.data;
        console.log(result);
        //将token存放至localstore中
        window.localStorage.setItem("token", userInfo.token);
        this.$router.push("/");
      }
    },
    register() {
      const { username, email, password, code } = this.form;
      api.register({ username, email, password, code }).then((result) => {
        console.log(result);
        if (result.status == "error") {
          alert(result.msg);
        } else {
          alert("注册成功");
          this.status = "login";
        }
      });
    },
    findPassword() {
      const { email, password, code } = this.form;
      api.findPassword({ email, password, code }).then((data) => {
        console.log(data);
      });
    },
    filterObj,
  },
  mounted() {
    window.vm = this;
  },
};
</script>
<style scoped lang="less">
@import url("~@/assets/css/login.less");
</style>