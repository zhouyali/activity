<template>
    <div class="container">
        <div class="bg-img">
        </div>
        <div class="info-wrap">
            <div class="info clearfix" :class="{'pd-top':index==0,'pd-bottom':index==1,'ma-top':(index == 1)&& (item.productImg.length=1)}" v-for="(item,index) in info">
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
<!--                 <template v-else-if="item.productImg.length = 2">
                    <img class="fir-img"  v-show='item.productImg[0].sort ==2' src="item.productImg[0].productimgID">
                    <img class="sec-img"  v-show='item.productImg[1].sort ==2' :src="item.productImg[1].productimgID">
                </template>   -->              
            </div>
            <footer :class="{'fixed':info.length <=1}">
                <span class="btn forwards" @click="submit"></span>
                <span class="btn back" @click="goToBack"></span>
            </footer>            
        </div>
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

            },
            goToBack() {
                 this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        position: relative;
        min-height:100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
    }
    .bg-img {
        height: px2rem(793px);
        width: 100%;
        background: url('../assets/image/book-detail.gif') no-repeat center top;
        background-size: 100%;
        /*padding-top:px2rem(150px);*/
        position: absolute;
        z-index:1;
    }
    .info-wrap {
        height: auto;
        overflow: auto;
        width:100%;
        min-height:100%;
        position: relative;
        top:px2rem(150px);
        z-index:2;
        padding-bottom: px2rem(316px);
    }
    .info {
        .pl {
            padding-left: px2rem(160px); 
        }
        &.pd-top {
            padding-top: px2rem(100px);
        }
        &.ma-top {
            margin-top: px2rem(150px);
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
        left:0;
        text-align: center;
        z-index:2;
    } 
    .fixed {
        position: fixed;
        bottom:0;
        left:0;
    }
    .btn {
        display:inline-block;
        width: px2rem(224px);
        height:px2rem(56px);
        
        background-size: 100%;
        position: absolute;
        bottom: px2rem(40px);
        
    }
    .forwards {
        background: url('../assets/image/book-btn.gif') no-repeat center center;
        background-size: 100%;
        right: 19%;
    }
    .back {
        background:url('../assets/image/back.jpg')
        no-repeat center center;
        background-size: 100%;
        left:19%;

    }
    .detail {
        position: relative;
        z-index:3
    }
</style>
