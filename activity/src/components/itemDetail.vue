<template>
    <div class="container">
        <div class="bg-img">
            <div class="info clearfix" :class="{'pd-top':index==0,'pd-bottom':index==1,'ma-top':(index == 1)&& (item.productImg.length=1),'ma-top2':(index == 1)&& (item.productImg.length=2)}" v-for="(item,index) in info">
                <div class="detail-top" v-show="index==1 && item.productImg.length > 1"></div>    
                <div class="product-name pl">
                    {{item.ProductName}}
                </div>
                <img class="img" :src="item.productImg[0].productimgID"> 
                <span class="tag pl">产品信息：</span>
                <div v-html="item.htmldetial" class="detail pl">
                </div>
                <div class="detail-line fr" v-show="index == 1"></div>
                <template v-if="item.productImg.length = 1">
                    <img class="fir-img" v-show='item.productImg[0].sort ==2' src="item.productImg[0].productimgID">
                </template>
                <template v-else-if="item.productImg.length = 2">
                    <img class="fir-img"  v-show='item.productImg[0].sort ==2' src="item.productImg[0].productimgID">
                    <img class="sec-img"  v-show='item.productImg[1].sort ==2' :src="item.productImg[1].productimgID">
                </template>                
            </div>
        </div>
        <footer>
            <div class="btn" @click="submit"></div>
        </footer>
        <!-- <div class="content"> -->
<!--         <footer>
            <div class="btn" @click="submit"></div>
        </footer> -->
        <!-- </div> -->
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info:[]
            }
        },
        created() {
            this.info = JSON.parse(localStorage.getItem('products'))
            console.log(localStorage.getItem('QRCode'),222)
        },
        methods: {
            submit() {
                this.$router.push('subOrder');

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
        position: relative;
    }

    .info {
        .pl {
            padding-left: px2rem(160px); 
        }
        &.pd-top {
            padding-top: px2rem(100px);
        }
        &.ma-top {
            margin-top: px2rem(180px);
        }
        &.ma-top2 {
            margin-top: px2rem(270px);
        }
        .detail-top {
            height:px2rem(158px);
            width:100%;
            background:url('../assets/image/detail-top.png') no-repeat top center;
            background-size: 100%;
        }
        &.pd-bottom {
            .sec-img {
                position:relative;
                z-index:2;
            }
            padding-bottom:px2rem(100px);
        }
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
    .fir-img {
        margin-top:px2rem(160px);
    }
    .nopd-top {
        margin-top:0;
    }
    .detail-line {
        width:px2rem(578px);
        height:px2rem(56px);
        background:url('../assets/image/detail-line.gif') no-repeat right top;
        background-size:100%;
    }
    footer {
        position:absolute;
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
    .detail {
        position: relative;
        z-index:3
    }
</style>
