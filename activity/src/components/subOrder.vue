<template>
    <div class="container">
        <div class="bg-img">
        </div>
        <div class="img-box clearfix">
            <div class="product-images fl">
                <img src="" alt="">
                
            </div>
            <div class="product-images fr">
                <img src="" alt="">
                
            </div> 
        </div>
        <div class="content">     
            <form>
                <fieldset class="input-group">
                    <div class="right-icon"></div>
                    <div class="header">请填写您的收货信息：
                    </div>
                    <div class="input-box">
                      <label>地址：</label>
                      <input type="text" v-model='address' placeholder="" required>
                    </div>
                    <div class="input-box">
                      <label>手机号：</label>
                      <input type="text" v-model='phone' placeholder="" required>
                    </div>
                    <div class="input-box">
                      <label>收件人姓名：</label>
                      <input type="text" v-model='name' placeholder="" required>
                    </div>                                
                    <div class="btn" @click="submit"></div>                           
                </fieldset>
            </form> 
            <footer>
                    
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
                let params = {
                    "key": "12345678",
                    "Product": [{
                        "ProductID": "20099AAF-9717-4594-B180-9F521C0B83FB",
                        "count": "2",
                        "address": "北京回龙观",
                        "phone": "13199444516",
                        "ReceiveName": "潘浩",
                        "QRCode": "E5EC0168-9BA3-4F9B-B47E-F118F85F5B27"
                    }]
                }
                this.$http.post('/ExchangedGood/SubmitProduct',params).then((res)=> {
                    if(res.status == 200) {
                        console.log(res)
                    }
                })                 
            }           
            
        }
    }
</script>
<style lang="scss" scoped>
    .bg-img {
        height: px2rem(388px);
        width: 100%;
        background: url('../assets/image/myorder-top.gif') no-repeat top center;
        background-size: 100%;
    }

    .img-box {
        padding:0 px2rem(36px);
    }
    .product-images {
        display: inline-block;
        width: px2rem(329px);
        height: px2rem(192px);
        margin: px2rem(20px) auto;
        background:url('../assets/image/img-box.gif') no-repeat top center;
        background-size: 100%;
    }
    .right-icon {
        position: absolute;
        top:px2rem(-10px);
        right:0%;
        width:px2rem(160px);
        height:px2rem(43px);
        background: url('../assets/image/right.gif') no-repeat right center;
        background-size:100%;
    }    
    .input-group {
        position: relative;
        .header {
            color: #fff;
            text-align: center;
            width: 85%;
            margin: px2rem(17px) auto 0;
            height: px2rem(60px);
            line-height: px2rem(60px);
            font-size: px2rem(24px);
            background-color: #78C25E;
            position: relative;
            z-index:1;
            
        }
        .input-box {
            position: relative;
            overflow: hidden;
            margin: px2rem(37px) auto;
            background: #78C25E;
            text-align: right;
            width: 85%;
            height: px2rem(60px);
            line-height: px2rem(60px);  

            label {
                color: #fff;
            }   
            input {
                background: #fff;
                height:px2rem(45px);
                width: 65%;
                margin-right: px2rem(20px);
                border-radius: px2rem(8px);
                font-size: px2rem(24px);
                text-align: center;
            }   
        }
        .btn {
            width: px2rem(490px);
            height:px2rem(56px);
            background:url('../assets/image/sure.gif') no-repeat center center;
            background-size: 100%;
            position: absolute;
            bottom:px2rem(-120px);
            left:50%;
            margin-left: px2rem(-245px);
            z-index:2;
        }
    }
    footer {
        position:fixed;
        width: 100%;
        height:px2rem(316px);
        background:url('../assets/image/myorder-bottom.gif') no-repeat center center;
        background-size: 100%;
        bottom: 0;
        z-index:1;
    }
</style>
