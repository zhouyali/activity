<template>
    <div class="container">
        {{message}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: ''
            }
        },
        created() {
            localStorage.removeItem('products');
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
            console.log(params)
            this.$http.post('/Verification/ORCodeVerification',params).then((res)=>{
                    if(res.data.result[0].code == '0002') {
                        localStorage.setItem('LogisticCode',res.data.result[0].LogisticsMessage.LogisticCode)
                        localStorage.setItem('ShipperCode',res.data.result[0].LogisticsMessage.ShipperCode)
                        localStorage.setItem('traces',JSON.stringify(res.data.result[0].LogisticsMessage.Traces));
                        localStorage.setItem('product',res.data.result[0].product)
                        this.$router.push('myOrder')
                    }else if(res.data.result[0].code == '0000') {
                        this.$router.push('list')
                    }else {
                        $toast.showMsg(res.data.result.message);
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
