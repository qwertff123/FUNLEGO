/*下拉与上拉的动画*/

//其中的down方法运用在下拉之前（对应着transition组件中的beforeenter），
//up方法运用到上拉之前（对应着transition组件中的before-leave）
export default class Slide {
    /**
     * @param {*} duration 动画时间
     */
    constructor(duration) {
        //用于储存元素的原始高度
        this.height = null;
        this.duration = duration / 1000;
    }
    //传入需要动画的元素
    down(el) {
        if (!this.height) {
            //先让元素展示出来
            el.style.display = "block";
            //获取元素的原始高度并保存起来
            this.height = getComputedStyle(el).height;
        }
        el.style.height = 0;
        el.style.opacity = 0;
        el.style.transition = "all " + this.duration + "s";
        //在下一帧才更改属性以确保transition能生效
        requestAnimationFrame(() => {
            el.style.height = this.height;
            el.style.opacity = 1;
        });
    }
    //传入需要动画的元素
    up(el) {
        el.style.height = 0;
        el.style.opacity = 0;
    }
}