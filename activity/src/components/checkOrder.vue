<template>
    <div class="container">
        {{message}}
    </div>
</template>
<script>
import {is_weixin} from '@/assets/js/tools'
    export default {
        data() {
            return {
                message: '',
                timer:null
            }
        },
        created() {
            if(this.timer) {
                clearTimeout(this.timer)
            }
            localStorage.removeItem('product');
            localStorage.removeItem('products');
            localStorage.removeItem('subProducts')
            localStorage.removeItem('isBooked');
            localStorage.removeItem('QRCode');
            localStorage.removeItem('LogisticCode')
            localStorage.removeItem('ShipperCode')
            localStorage.removeItem('traces'); 
            localStorage.removeItem('subAlready');
            localStorage.removeItem('canBuyNumber');
            let search = location.search;
            if (!search || search.indexOf('QRCode=') === -1) {
                $toast.showMsg('参数解析失败')
            }
            let params = {
                "key": "12345678"
            };
            let temps = search.slice(1).split('&');
            temps.forEach((param) => {
                if (param.indexOf('QRCode=') > -1) {
                    params.QRCode = param.split('=')[1];
                    localStorage.setItem('QRCode',params.QRCode)
                }
            });
            this.$http.post('/Verification/ORCodeVerification',params).then((res)=>{
                    if(res.data.result[0].code === "0002") {
                        localStorage.setItem('LogisticCode',res.data.result[0].LogisticsMessage.LogisticCode)
                        localStorage.setItem('ShipperCode',res.data.result[0].LogisticsMessage.ShipperCode)
                        localStorage.setItem('traces',JSON.stringify(res.data.result[0].LogisticsMessage.Traces));
                        localStorage.setItem('product',JSON.stringify(res.data.result[0].product));
                    //接口已经预定状态下跳转我的订单页，加参数isBooked值为“1”。
                        this.$router.push({path:'myOrder',query:{'isOrder':'1'}})
                    }else if(res.data.result[0].code === "0000") {
                    //接口未预定状态下，正常跳转。 
                        localStorage.setItem('canBuyNumber',res.data.result[0].count)
                        this.$router.push('list')
                    }else {
                        $toast.showMsg(res.data.result.message);
                        if(is_weixin) {
                            this.timer = setTimeout(()=>{
                                WeixinJSBridge.call('closeWindow');
                            },3000)               
                        }

                    }

            })
        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
 .container {
    height:100%;
    width:100%;
    background:url('../assets/image/bg.png') no-repeat top center;
    background-size:100%;
 }
</style>
