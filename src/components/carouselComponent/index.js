import Vue from "vue";

Vue.prototype.$eventBus = new Vue();    //设置事件总线，方便组件之间的数据传输

import qwCarousel from "./qwCarousel";

import carouselArea from "./carouselArea";

import carouselItem from "./carouselItem";

import carouselControl from "./carouselControl";
export default {
    qwCarousel,
    carouselArea,
    carouselItem,
    carouselControl
};