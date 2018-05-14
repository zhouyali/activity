<template>
    <div class="container">
        <div class="bg-img"></div>
        <div class="title">
            预定商品详情
        </div>
        <div class="info">
            <div class="product-name">
                毛绒挂饰（秋田）
            </div>
            <img class="img" src=""> 
            <span class="tag">产品信息：</span>
            <div>
                <span class="label">材质：</span><span></span><br/>
                <span class="label">填充物：</span><span></span><br/>
                <span class="label">重量：</span><span></span><br/>
            </div>
            <img src="">
            <img src="">
        </div>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                address:'',
                phone:'',
                name:''
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .bg-img {
        height: px2rem(200px);
        width: 100%;
        background: pink;
    }
    .title {
        width: 70%;
        margin: px2rem(10px) auto;
        height: px2rem(70px);
        line-height: px2rem(70px);
        text-align: center;
        font-size: px2rem(30px);
        border: 2px solid green;
        border-radius: px2rem(10px);
    }
    .info {
        padding: px2rem(100px);
    }
    .product-name {
        color: green;
        font-size: px2rem(40px);
    }
    .tag {
        color: green;
        font-size: px2rem(40px);
    }
    img {
        display: block;
        width: px2rem(100px);
        height: px2rem(100px);
        margin: px2rem(20px);
    }
</style>
