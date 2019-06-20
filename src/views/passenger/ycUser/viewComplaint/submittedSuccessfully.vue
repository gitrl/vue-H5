<template>
    <div id="submittedSuccessfully">
        <div class="aboutTitle">提交结果</div>
        <div class="pad2 bgcolorW ">
            <div class="TextC success_icon  padT2 padB2">
                <img src="../../../../assets/images/passenger/icon/success_icon.png">
                <h3 class="TextC padT1 FontS15 successText">提交成功</h3> </div>
            <p class="FontS12 lineH2D5 colorGray">　　非常感谢您的反馈！您所描述的问题，我们已经全部记录。稍后我们的客服专家将与您联系，请保持手机处于可接通状态！</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'submittedSuccessfully'
  }
</script>

<style scoped>
    #submittedSuccessfully{
        height: 100%;
        background-color: #fff;
    }
    .successText{
        color:#44A0FE;
    }
    .aboutTitle{padding:1rem 2rem;font-weight: bold;font-size: 1.5rem}
    .success_icon img{width: 6rem; height: 4rem;}
</style>
