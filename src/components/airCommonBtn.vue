<template>
    <div class="airCommonBtn">{{airBtnText}}</div>
</template>

<script>
  export default {
    name: 'airCommonBtn',
    props: {//定义传值的类型
      airBtnText: "",
    }
  }
</script>

<style scoped>
    .airCommonBtn{
        background: -webkit-linear-gradient(90deg,#407FFD, #44A0FE); /* Safari 5.1 to 6.0 */
        background: -o-linear-gradient(90deg,#407FFD, #44A0FE); /* Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(90deg,#407FFD, #44A0FE); /* Firefox 3.6 to 15 */
        background: linear-gradient(90deg,#407FFD, #44A0FE);
        letter-spacing:2px;height: 4rem;border-radius: 2rem;line-height: 4rem;font-size: 1.5rem;text-align: center;color: #ffffff;}
</style>
