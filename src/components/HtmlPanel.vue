<template>
    <div style="height: 100%">
    <div style="height: 100%;background: #ff0000" v-html="html"></div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        // 使用时请使用 :url.sync=""传值
        props: {
            url: {
                required: true
            }
        },
        data () {
            return {
                loading: false,
                html: ''
            }
        },
        watch: {
            url (value) {
                this.load(value)
            }
        },
        mounted () {
            this.load(this.url)
        },
        methods: {
            load (url) {
                console.log(url)
                if (url && url.length > 0) {
                    // 加载中
                    this.loading = true;
                    let param = {
                        accept: 'text/html, text/plain'
                    };
                    //this.html = url;


                    this.$server.get(url, null,null).then((response) => {
                        console.log(response)
                        console.log(response.data)
                        // this.loading = false
                        // 处理HTML显示
                        this.html = response

                    }).catch(() => {
                       // console.log(response)
                        // this.loading = false
                        this.html = '加载失败'
                    })
                }
            }
        }
    }
</script>