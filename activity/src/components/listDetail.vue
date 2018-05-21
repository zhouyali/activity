<template>
    <div class="container">
        <div class="content pd-botom" ref='content' v-html="detail">
            
         </div>
         <footer class="bottom"></footer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                detail:''
            }
        },
        created() {
            this.detail = this.$route.query.detail;
        },
        methods: {
            trim(str,is_global){
                //di2个参数为g
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g,"");
                if(is_global.toLowerCase()=="g")
                {
                    result = result.replace(/\s/g,"");
                 }
                return result;
            }
        }
    }
</script>
<style lang="scss" scoped>
.content {
    position: relative;
    font-size: px2rem(30px);
    color: #333;
    padding:0 px2rem(80px);
    padding-top: px2rem(150px);
    min-height:100%;
    background:url('../assets/image/bg-top.gif') no-repeat top center;
    background-size:100%;
    &.pd-botom {
        padding-bottom: px2rem(186px);
    }
}
.bottom {
    width:100%;
    height:px2rem(186px);
    position: absolute;
    bottom:0;
    left:0;
    background: url('../assets/image/bg-btm.gif') no-repeat top center;
    background-size:100%;
    z-index:3;
}
</style>
