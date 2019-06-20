<template>
    <div id="newRegster">
        <div class="newReg">
            <div class="newRegTop">
                <div class="newRegLogo"><img src="../../../assets/images/passenger/logo_icon.png" alt=""/></div>
                <div class="wordPic"> <img src="../../../assets/images/passenger/word_pic.png" alt=""/> </div>
            </div>

            <div class='regCoupon'>
                <div class="TextC coloWhite FontS15 padT1">恭喜获得新人注册打车券</div>
                <div class="coupon">
                    <div class="couponName fl">优惠券</div>
                    <div class="fr padT2 padR2 colorg">
                        <h2 class="padB1">一元首乘</h2>
                        <p>最高可优惠15元</p>
                        <p>7天内有效</p>
                    </div>
                </div>
                <div class='phoneNum'><input type="text" placeholder='请输入手机号'/><button>领取</button></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'newRegster'
  }
</script>

<style scoped>
    #newRegster{display: -webkit-box; height: 100%}
    .newReg{height: 100%; background: url("../../../assets/images/passenger/bg_pic.png") no-repeat ; background-size: 100% 100%; background-position: 0 center;}
    .regCoupon{height:50%; width: 100%; background: url('../../../assets/images/passenger/coinbg_pic.png') no-repeat center center; background-size: 100% 100%; margin-top: 3.5rem; padding: 1rem 0;}
    .newRegTop div{text-align: center;}
    .newRegLogo img{width: 22%; margin: 2rem auto; margin-bottom: 0;}
    .wordPic{margin:1rem 0 0;}
    .wordPic img{width:75%;}
    .coupon{  background: url("../../../assets/images/passenger/car_bg.png") no-repeat center center; width:85%; height: 11rem; background-size: 100% 100%; margin: 0 auto; margin-top: 1rem;}
    .coupon p,.coupon h2{text-align: right;}
    .coupon h2{font-size: 1.5rem;}
    .coupon p{font-size: 1.2rem;line-height: 2rem;}
    .phoneNum{display: flex; height: 5rem; width: 100%; justify-content: center; margin-top: 1rem;}
    .phoneNum button{width: 8rem; border: none; font-size:1.8rem; background-color: orange; color: #fff;}
    .phoneNum input{width: 50%; font-size:1.5rem; margin-bottom: 0;padding-left: 1rem;}
    .couponName{width: 1rem; margin-left: 4rem; color: #FF9434; font-size: 1.7rem; font-weight: bold; padding-top: 2rem;}

</style>
