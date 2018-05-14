<template>
    <div class="container">
        <div class="bg-img"></div>
        <div class="title">
            您所预定的礼品
        </div>
        <div class="product-images">
            <img src="" alt="">
            <img src="" alt="">
        </div>
        <form>
            <fieldset class="input-group">
                <div class="header">订单号及快递单号查询</div>
                <div class="input-box">
                  <label>地址：</label>
                  <input type="text" v-model='address' placeholder="请输入有效地址" required>
                   <!-- @blur='onCheckPhone' -->
                </div>
                <router-link to='/'>
                    <div class="btn">返回首页</div> 
                </router-link>                           
            </fieldset>
        </form> 
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
    .product-images {
        img {
            display: inline-block;
            width: px2rem(250px);
            height: px2rem(150px);
            border: 1px solid pink;
        }
        margin: px2rem(20px) auto;
        text-align: center;
    }
    .input-group {
        .header {
            background: green;
            color: #fff;
            text-align: center;
            width: 80%;
            margin: 0 auto;
            height: px2rem(55px);
            line-height: px2rem(55px);
            font-size: px2rem(30px);
        }
        .input-box {
            position: relative;
            overflow: hidden;
            margin: px2rem(10px) auto;
            background: green;
            text-align: right;
            width: 80%;
            height: px2rem(65px);
            line-height: px2rem(60px);  
            label {
                color: #fff;
            }   
            input {
                background: #fff;
                height:px2rem(55px);
                width: 65%;
                margin-right: px2rem(20px);
                border-radius: px2rem(8px);
            }   
        }
        .btn {
            padding: px2rem(10px) px2rem(30px);
            background-color: green;
            color: #fff;
            width: 50%;
            margin: px2rem(20px) auto;
            text-align: center;
            border-radius: px2rem(10px);
        }
    }
</style>
