<template>
    <div class="container">
        <div class="bg-img">
        </div>
        <div class="img-box clearfix" :class="{'center':imgR==''}">
            <div class="product-images" :class="{' fl':imgR!==''}">
                <img :src="imgL" alt="">
            </div>
            <div class="product-images fr" v-show="imgR!==''">
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
                                            
                </fieldset>
            </form> 
        </div> 
        <footer>
            <div class="btn" @click="backTo"></div>  
        </footer>       
    </div>
</template>
<script>
    export default {
        data() {
            return {
                code:'',
                info:[],
                imgL:'',
                imgR:'',
                traces:[]
            }
        },
        created() {
            var backToMsg = this.$route.query.backToMsg;
            if((this.$route.query&&this.$route.query.isOrder=='1')||backToMsg=='ok') {
                this.info = JSON.parse(localStorage.getItem('product'))
                console.log(this.info)
                if(this.info.length ==2) {
                    this.imgL =this.info[0].productimg;
                    this.imgR=this.info[1].productimg;
                }else {
                    this.imgL =this.info[0].productimg;
                    this.imgR='';                    
                }
                console.log(localStorage.getItem('LogisticCode'),'090909')
                if(localStorage.getItem('LogisticCode') == "null") {
                     console.log(localStorage.getItem('LogisticCode'),'1234')
                     this.code = '订单号尚未上传'
                }else {
                    this.code =  localStorage.getItem('LogisticCode');
                }
                this.traces = JSON.parse(localStorage.getItem('traces'));
                if(!this.traces || this.traces.length <= 0) {
                    var d =  new Date();
                    var date = d.toLocaleDateString();
                    var time=d.toLocaleTimeString();
                    this.traces = [{'AcceptTime':d.toLocaleString(),'AcceptStation':'暂无物流'}];    
                }              
                localStorage.setItem('isBooked','ok')

            }else if(localStorage.getItem('subProducts')||backToMsg=='ok') {
                this.info = JSON.parse(localStorage.getItem('subProducts'));
                this.code = '我们会尽快为您发货'; 
                if(this.info.length ==2) {
                    this.imgL =this.info[0].productImg[0].productimgID;
                    this.imgR=this.info[1].productImg[0].productimgID;                 
                }else {
                    this.imgL =this.info[0].productImg[0].productimgID;
                }
                localStorage.setItem('isBooked','ok')
            }else {
                $toast.showMsg('请先预定礼物')
            }

        },
        methods: {
            backTo() {
                if(localStorage.getItem('isBooked')=='ok'||this.$route.query.isOrder=='1') {
                    this.$router.push({path:'list',query:{'backMsg':'ok'}})
                }else {
                     this.$router.push({path:'list'})
                }
            }
            
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding-bottom: px2rem(320px);
        -webkit-overflow-scrolling:touch;
    }
    .bg-img {
        height: px2rem(388px);
        width: 100%;
        background: url('../assets/image/myorder-top.gif') no-repeat top center;
        background-size: 100%;
    }
    .center {
        text-align: center;
    }
    .img-box {
        padding:0 px2rem(36px);
    }
    .station {
        padding:px2rem(20px) px2rem(60px);
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
/*    .content {
        padding-bottom:px2rem(316px);
        position: relative;
    }*/
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
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }   
        }

    }
    footer {
        position:fixed;
        width: 100%;
        height:px2rem(316px);
        background:url('../assets/image/myorder-bottom.gif') no-repeat center center;
        background-size: 100%;
        bottom: 0;
        .btn {
            width: px2rem(493px);
            height:px2rem(56px);
            background:url('../assets/image/back.gif') no-repeat center center;
            background-size: 100%;
            margin: px2rem(50px) auto;
        }        
    }
</style>
