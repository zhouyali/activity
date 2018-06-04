<template>
    <div class="container">
        <div class="mask" :class="{'showMask':isShow}">
            <div class="mask-content">
                您可以预订&nbsp{{this.canBuyNumber}}&nbsp个礼品哦！
                <span class="go-choice" @click="gotoChoose">重新选择</span>
                <span class="go-book" @click="gotoBook">直接预订</span>
            </div>
        </div>
        <div class="bg-img">
        </div>
        <div class="img-box clearfix" :class="{'center':info.length <=1}">
        <template v-if="info && info.length >=2">
            <div class="product-images fl">
                <img :src="info[0].productImg[0].productimgID" alt="">
            </div>
            <div class="product-images fr">
                <img :src="info[1].productImg[0].productimgID" alt="">
                <img style="display:block;width:100%;" alt="">
            </div> 
        </template>
        <template v-if="info && info.length <=1">
            <div class="product-images">
                <img :src="info[0].productImg[0].productimgID" alt="">
            </div>
        </template>        
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
                      <input type="tel" maxlength="11" v-model='phone' placeholder="" required>
                    </div>
                    <div class="input-box">
                      <label>收件人姓名：</label>
                      <input type="text" v-model='name' placeholder="" required>
                    </div>                                
                    <div class="btn" @click="submit"></div>                           
                </fieldset>
            </form> 
            <footer>
                  <span class="btn back" @click="goToBack"></span>  
            </footer>
        </div> 
    </div>
</template>
<script>
import {is_weixin} from '@/assets/js/tools'
    export default {
        data() {
            return {
                address:'',
                phone:'',
                name:'',
                info:'',
                QRCode:'',
                timer:null,
                canBuyNumber:Number,
                isShow:false
            }
        },
        created() {
            if(this.timer) {
                clearTimeout(this.timer)
            }
            this.info = JSON.parse(localStorage.getItem('products'))
            this.QRCode = localStorage.getItem('QRCode')
            this.canBuyNumber = localStorage.getItem('canBuyNumber')
        },
        methods: {
            submit() {
                if(this.name && this.address && this.phone) {
                    if( !/^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.phone)) {
                        $toast.showMsg('请输入正确手机号');
                        return false
                    }
                    if(this.info.length < this.canBuyNumber) {
                        this.isShow = true;
                    }else if(this.info.length ==2){
                        let params = {
                            "key": "12345678",
                            "Product": [{
                                "ProductID": this.info[0].ProductID,
                                "count":1,
                                "address": this.address,
                                "phone": this.phone,
                                "ReceiveName": this.name,
                                "QRCode":this.QRCode
                            },{
                                "ProductID": this.info[1].ProductID,
                                "count": 1,
                                "address": this.address,
                                "phone": this.phone,
                                "ReceiveName": this.name,
                                "QRCode":this.QRCode
                                                           
                            }]
                        } 
                        this.getApi(params)
                    }else if(this.info.length == 1) {
                        let params = {
                            "key": "12345678",
                            "Product": [{
                                "ProductID": this.info[0].ProductID,
                                "count": 1,
                                "address": this.address,
                                "phone": this.phone,
                                "ReceiveName": this.name,
                                "QRCode": this.QRCode
                            }] 
                        } 
                        this.getApi(params);
                    }
                }else {
                    $toast.showMsg('请填写收货信息')
                }
                
            },
            getApi(params) {
                  this.$http.post('/ExchangedGood/SubmitProduct',params).then((res)=> {
                      if(res.data.result.code == '0000') {
                            localStorage.setItem('subProducts',JSON.stringify(this.info))
                            this.$router.push('myOrder');
                            $toast.showMsg('提交成功！');
                            localStorage.removeItem('products');
                            localStorage.setItem('subAlready','ok')
                            if(is_weixin) {
                                this.timer = setTimeout(()=>{
                                    WeixinJSBridge.call('closeWindow');
                                },2000)               
                            }
                      }else {
                            $toast.showMsg(res.data.result.message);
                      }
                  }) 
            },
            goToBack() {
                 this.$router.go(-1);
            },
            gotoBook() {
                let params = {
                    "key": "12345678",
                    "Product": [{
                        "ProductID": this.info[0].ProductID,
                        "count": this.info.length,
                        "address": this.address,
                        "phone": this.phone,
                        "ReceiveName": this.name,
                        "QRCode": this.QRCode
                    }] 
                } 
                this.getApi(params);
                this.isShow = false;
            },
            gotoChoose() {
               this.isShow = false;
               this.$router.push('list')
            }     
            
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        -webkit-overflow-scrolling: touch;
    }
    .mask {
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:4;
        background:rgba(0,0,0,.5);
        display: none;
        .mask-content {
            position: absolute;
            top:40%;
            left:50%;
            margin-left:-40%;
            width: 80%;
            height:px2rem(300px);
            background-color: #fff;
            text-align: center;
            font-size: px2rem(35px);
            border-radius: px2rem(20px);
            padding-top:px2rem(80px);
            span {
                display: inline-block;
                border-radius: px2rem(20px);
                padding:px2rem(10px) px2rem(30px);
                background:#28C768;
                position: absolute;
                bottom:px2rem(30px);
                color: #fff;
                font-size: px2rem(30px);
            }
            .go-choice {
                left:10%;
            }
            .go-book {
                right:10%;
            }
        }

    }
    .showMask {
        display: block;
    }    
    .bg-img {
        height: px2rem(388px);
        width: 100%;
        background: url('../assets/image/myorder-top.gif') no-repeat top center;
        background-size: 100%;
    }

    .img-box {
        padding:0 px2rem(36px);
    }
    .center {
        text-align: center;
    }
    .product-images {
        display: inline-block;
        width: px2rem(329px);
        height: px2rem(192px);
        margin: px2rem(20px) auto;
        background:url('../assets/image/img-box.gif') no-repeat top center;
        background-size: 100%;
        img {
            display:block;
            width: px2rem(260px);
            height: px2rem(140px);  
            margin:px2rem(23px) px2rem(35px);
            border-radius:px2rem(8px);          
        }
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
    .content {
        position: relative;
    }
    footer {
        width: 100%;
        height:px2rem(316px);
        background:url('../assets/image/myorder-bottom.gif') no-repeat center center;
        background-size: 100%;
        // position: relative;
        // z-index:1;
    }
    .btn {
        display:inline-block;
        width: px2rem(224px);
        height:px2rem(56px);
        background-size: 100%;
        position: absolute;
        bottom: px2rem(40px);
        background:url('../assets/image/back.jpg')
        no-repeat center center;
        background-size: 100%;
        left:50%;  
        margin-left:px2rem(-112px);
        // z-index:2;      
        
    }

</style>
