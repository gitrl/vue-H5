<template>
    <div class="complaintListNull" >
        <img src="../assets/images/passenger/dataNull.png" alt="" style="width: 14rem;">
        <div class="TextC padR2">{{noDataMsg}}</div>
    </div>
</template>

<script>
  export default {
    name: 'noInformation',
    props:['noDataMsg']
  }
</script>

<style scoped>
    /*暂时信息*/
    .complaintListNull{height: 100%;display: flex;align-items: center;justify-content: center;flex-direction: column;}
    .complaintListNull img{margin: 1rem;}
    .complaintListNull div{color:#828282;font-size: 1.2rem;padding-left: 2rem;}
</style>
