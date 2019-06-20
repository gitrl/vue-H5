<template>
    <div id="about">
        <div class="aboutTitle">关于我们</div>
        <div class="about-logo-top">
            <div class="about-logo marginCenter"><img src="../../../../assets/images/passenger/userlogo_icon.png" alt=""/></div>
            <div class="TextC FontS15">牦牛出行<span id="version"></span></div>
        </div>
        <ul class="check-list bgcolorW marginT1 FontS13" >
            <li>公司网址 <span><a href="http://www.maoniuchuxing.com">www.maoniuchuxing.com</a></span></li>
            <li>公众号 <span>牦牛出行</span></li>
            <li><router-link to="userRule"> 牦牛出行用户协议 <span class="colorGray"> > </span></router-link></li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'about'
  }
</script>

<style scoped>
    #about{height: 100%;background-color: #fff;color: #666666;}
    .aboutTitle{padding:1rem 2rem;font-weight: bold;font-size: 1.5rem}
    .about-logo{width:10rem ;}
    .about-logo img{width:10rem ;height:10rem;}
    .about-logo-top{background-color: white;height: 22rem; padding-bottom: 1rem; width: 100%;display: inline-flex;flex-direction: column;justify-content: center;;}
    .about .check-list li a{width: 100%;display: flex;justify-content: space-between;}
    .check-list li{display: flex;justify-content: space-between;padding: 1.2rem 2rem;}
    /*.check-list li:last-child{border-bottom: none;}*/
    .check-list li a{width: 100%;display: inline-block;color: #666666}
    .check-list li a span{float: right;font-size: 1.5rem;color: #666666}
</style>
