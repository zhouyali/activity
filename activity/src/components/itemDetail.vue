<template>
    <div class="container">
        <div class="bg-img">
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
            </div>
        </div>
        <div class="content">
            <img src="">
            <img class="sec-img" src="">
            <footer>
                <div class="btn" @click="submit"></div>
            </footer>
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
            submit() {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .bg-img {
        height: px2rem(793px);
        width: 100%;
        background: url('../assets/image/book-detail.gif') no-repeat center top;
        background-size: 100%;
        padding-top:px2rem(150px);
        padding-left: px2rem(70px);
    }

    .info {
        padding: px2rem(100px);
    }
    .product-name {
        color: green;
        font-size: px2rem(26px);
    }
    .tag {
        color: green;
        font-size: px2rem(26px);
    }
    img {
        display: block;
        width: px2rem(329px);
        height: px2rem(192px);
        margin: px2rem(20px) auto;
    }
    .content {
        padding-top:px2rem(540px);
        position: relative;
        img {
            position: absolute;
            /*margin: px2rem(30px) auto;*/
            top:0;
            left:50%;
            margin-left: px2rem(-164px);
            z-index:2;
        }
        .sec-img {
            top:px2rem(180px);
        }
    }
    footer {
        position:fixed;
        width: 100%;
        height:px2rem(316px);
        background:url('../assets/image/myorder-bottom.gif') no-repeat center bottom;
        background-size: 100%;
        bottom: 0;
        z-index:1;
    } 
    .btn {
        width: px2rem(224px);
        height:px2rem(56px);
        background: url('../assets/image/book-btn.gif');
        background-size: 100%;
        position: absolute;
        bottom: px2rem(40px);
        left: 50%;
        margin-left: px2rem(-112px);
    }

</style>
