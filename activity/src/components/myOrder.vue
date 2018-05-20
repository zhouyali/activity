<template>
    <div class="container">
        <div class="bg-img">
        </div>
        <div class="img-box clearfix">
            <div class="product-images fl">
                <img :src="imgL" alt="">
            </div>
            <div class="product-images fr">
                <img :src="imgR" alt="">
            </div> 
        </div> 
        <div class="content">     
            <form>
                <fieldset class="input-group">
                    <div class="header">订单号及快递单号查询
                        <div class="right-icon"></div>
                    </div>
                    <div class="input-box">
                      <label>快递信息：</label>
                      <input type="text" :value="code" placeholder="" required>
                    </div>
                    <div class="station" v-for="(item,index) in traces">{{item.AcceptTime}}<span>{{item.AcceptStation}}</span></div>
                    <router-link to='/'>
                        <div class="btn"></div> 
                    </router-link>                           
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
                code:'2121212121212121',
                info:'',
                imgL:'',
                imgR:'',
                traces:[]
            }
        },
        created() {
            if(localStorage.getItem('products')) {
                this.info = JSON.parse(localStorage.getItem('products'))
            }
            this.info?this.imgL = this.info[0].productImg[4].productimgID:localStorage.getItem('product')[0].productimg;
            this.info? this.imgR = this.info[1].productImg[4].productimgID:localStorage.getItem('product')[1].productimg;
            this.code = localStorage.getItem('LogisticCode');
            this.traces = JSON.parse(localStorage.getItem('traces'));
        },
        methods: {
            getLog() {
                // let params={
                //     "RequestData": {
                //         "OrderCode": "",
                //         "ShipperCode": 'SF',//localStorage.getItem('ShipperCode'),
                //         "LogisticCode": '118650888018',//localStorage.getItem('LogisticCode'),
                //     },  
                //     "EBusinessID": "1344159",
                //     "RequestType":"1002",
                //     "AppKey":"891eed32-9790-40be-891a-756513e25c50",
                //     "dataSign":"OGY0Y2JhOGQ0YjRlNzc0ZTM5MWM4MzYzMDVjMTA0ODk=",
                //     "DataType":"2"
                // }
                // this.traces = localStorage.getItem('traces');
                // this.$http.post('/Ebusiness/EbusinessOrderHandle.aspx',params).then(()=>{

                // })
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
    .station {
        padding:px2rem(20px) px2rem(50px);
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
            background:red;
            border-radius:px2rem(8px);          
        }
    }
    .content {
        padding-bottom:px2rem(316px);
        position: relative;
    }
    .right-icon {
        position: absolute;
        top:px2rem(-43px);
        right:-9%;
        width:px2rem(160px);
        height:px2rem(43px);
        background: url('../assets/image/right.gif') no-repeat right center;
        background-size:100%;
    }    
    .input-group {
        .header {
            color: #fff;
            text-align: center;
            width: 85%;
            margin: px2rem(43px) auto 0;
            height: px2rem(60px);
            line-height: px2rem(60px);
            font-size: px2rem(24px);
            background-color: #78C25E;
            position: relative;
        }
        .input-box {
            position: relative;
            overflow: hidden;
            margin: px2rem(50px) auto px2rem(70px);
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
            width: px2rem(493px);
            height:px2rem(56px);
            background:url('../assets/image/back.gif') no-repeat center center;
            background-size: 100%;
            margin: 0 auto;
        }
    }
    footer {
        position:fixed;
        width: 100%;
        height:px2rem(316px);
        background:url('../assets/image/myorder-bottom.gif') no-repeat center center;
        background-size: 100%;
        bottom: 0;
    }
</style>
