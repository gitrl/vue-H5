<template>
    <div id="contact">
        <div class="ModuleLi" style="padding: 0;">
            <h3 class="pad2 FontS13 fontW">联系我们</h3>
            <ul>
                <h4 class="FontS12 contactH4 padB1">推广合作</h4>
                <li>联系人 <span>罗先生</span></li>
                <li>电话<span @click="callAndroid(number)">{{number}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import "../../assets/css/Module.css";
  export default {
    name: 'contact',
    data:function(){
      return {
        number:"17340135711",
      }
    }
  }
</script>

<style scoped>
    #contact{
        height: 100%;
        background-color: #fff;
    }
    .ModuleLi ul li{
        border: none;
        font-size: 1.1rem;
    }
    .ModuleLi ul li span{color: #333333}
    .contactH4{color: #666666}

</style>
