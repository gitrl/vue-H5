<template>
    <div id="contact">
        <div class="ModuleLi" style="padding: 0;">
            <ul>
                <li>联系人 <span>姜先生</span></li>
                <li>电话<span @click="callAndroid(number)">{{number}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import "../../../../assets/css/Module.css";
  export default {
    name: 'contact',
    data:function(){
      return {
        number:"18380120498",
      }
    }
  }
</script>

<style scoped>

</style>
