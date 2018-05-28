<template>
	<div class="container self">
        <div class="mask" :class="{'showMask':isShow}">
            <div class="mask-content">
                您可以预订&nbsp{{this.canBuyNumber}}&nbsp个礼品哦！
                <span class="go-choice" @click="gotoChoose">继续选择</span>
                <span class="go-book" @click="gotoBook">直接预订</span>
            </div>
        </div>
		<div class="logo">
		</div>
		<div class="list" id="list" v-if="list && list.length > 0">
			<div class="product clearfix" v-for="(item,index) in list" :key="index" @click="skipToDetail(item.imghtmldetial)">
                <div class="imgBox fl">
    				<img class="" v-if="item.productImg &&item.productImg.length>0&& item.productImg[0].productimgID" :src="item.productImg[0].productimgID" alt="">
                    <img class="" v-else src="" alt="">
                </div>
				<div class="info" id="info" v-if="item.htmldetial!==''" v-html="item.htmldetial">			
				</div>
				<span class="span" :class="{'checked':checkeds.indexOf(index) > -1}" @click.stop="checkedProduct(item,index)"><i></i></span>
			</div>
            <div class="footer-box">
                <footer :class="{'fixed':!list || list.length < 2}">
           
                </footer> 
                <div class="btns">
                    <span :class="{'active':activeBtn == 0}" class="my-order" @click="skipTo(0)"></span>
                    <span :class="{'avtive':activeBtn == 1}" @click="skipTo(1)"></span>
                </div> 
            </div>  
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list:[],
				activeBtn:0,
				checkeds: [],
				products:[],
                isBooked:false,
                canBuyNumber:Number,
                isShow:false
			}
		},
        mounted() {
            localStorage.removeItem('products')
            var backMsg;
            this.$route.query.backMsg?backMsg = this.$route.query.backMsg:backMsg='';
            let subAlready = localStorage.getItem('subAlready');
            if(backMsg == 'ok'||(localStorage.getItem('isBooked')&&localStorage.getItem('isBooked') == 'ok')||subAlready=='ok') {
                this.isBooked = true
            }else {
                 this.isBooked = false
            }
            this.canBuyNumber = localStorage.getItem('canBuyNumber')
            this.getList()
            setTimeout(()=>{
                this.showText()
            },0)
        },
		methods: {
		    getList() {
	            this.$http.post('/getProduct/getSinaProduct',{"key":"12345678","ProductID":""}).then((res)=> {
	            	if(res.status == 200) {
	            		this.list = res.data.result;
                        setTimeout(()=>{
                            this.showText()
                        },0)
	            	}else {
	            		$toast.showMsg(res.data.result.message)
	            	}
	            })
		    },
            skipToDetail(detail){
                if(detail) {
                    this.$router.push({path:'listDetail',query:{'detail':detail}})
                }else {
                    $toast.showMsg('暂无详情')
                }
                
            },
			skipTo(n) {
				if(n == 0) {
                    if(this.isBooked) {
                        this.$router.push({path:'myOrder',query:{'backToMsg':'ok'}});
                    }else {
                        this.$router.push({path:'myOrder'})
                    }
				}else {
					if (this.checkeds.length < 1) {
	            		$toast.showMsg('请选择商品')
	            		return false;
	            	}else if((this.checkeds.length < this.canBuyNumber)&&!this.isBooked){
                        this.isShow = true
                        return false;
                    }else if(this.isBooked){
                        $toast.showMsg('您已预定过商品')
                        return false;
                    }else {
                        this.$router.push({'path':'itemdetail'});
                        localStorage.setItem('products',JSON.stringify(this.products));                       
                    }

				}
			},
            gotoBook() {
                this.$router.push({'path':'itemdetail'});
                localStorage.setItem('products',JSON.stringify(this.products)); 
                this.isShow = false;
            },
            gotoChoose() {
               this.isShow = false;
            },
            goToDetail() {
                this.$router.push('itemdetail')
            },
            checkedProduct(item,index) {
            	let temp = this.checkeds.indexOf(index);
            	if (temp > -1) {
            		this.checkeds.splice(temp, 1);
            		return false;
            	}
            	if (this.checkeds.length >= this.canBuyNumber) {
            		$toast.showMsg('只能选择'+this.canBuyNumber+'个商品哦');
            		return false;
            	}
            	this.checkeds.push(index);
            	this.products.push(item);        	
            	
            },
            showText() {
                let content = document.getElementById('list');
                let resTexts = document.querySelectorAll('#list .info font');
                let texts;
                texts = Array.prototype.slice.call(resTexts,0);
                for(var i=0;i<resTexts.length;i++) {
                    resTexts[i].style.size = '';
                    resTexts[i].className = 'selfStyle';
                    // resTexts[i].style.color = 'red';
                    // console.log(resTexts[i], resTexts[i].style.fontSize ,resTexts[i].style.color)
                }      
            }
		}
	}
</script>
<style lang="scss">
.self {
    .selfStyle {
        font-size: px2rem(24px) !important;
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
    &.container{
       -webkit-overflow-scrolling:touch;
    }
	.logo {
		width: 100%;
		height: px2rem(804px);
		background: url('../assets/image/top.gif') no-repeat top center;
        background-size: 100% auto;
	}
	.product {
        width:px2rem(690px);
        height:px2rem(220px);
        box-shadow: px2rem(5px) px2rem(5px) px2rem(5px) #E7E7E6;
		margin:0 auto px2rem(20px);
        background:url('../assets/image/card.gif') no-repeat top center;
        background-size: 100%;
        position:relative;
        z-index:1;
        overflow: hidden;
		.info {
            height:px2rem(200px);
            padding-top: px2rem(40px) ;
            padding-left: px2rem(450px);
            padding-right: px2rem(45px);
		}
    span {
            box-sizing:border-box;
            display:block;
            position: absolute;
            width:px2rem(48px);
            height:px2rem(48px);
            border-radius:50%;
            left: px2rem(20px);
            top:50%;
            margin-top:px2rem(-18px);
            color:#78C25E;
            border:px2rem(3px) solid currentColor;
            background-clip:content-box;
            transition:.3s;
            padding:px2rem(6px);
        }

        span.checked {
            background-color: currentColor;
        }
	}
    .imgBox{
       position:relative;
       overflow: hidden;
        width: px2rem(320px);
        height: px2rem(169px);  
        border-radius: px2rem(15px);
        margin: px2rem(22px) 0 px2rem(22px) px2rem(90px);
    }
    .imgBox>img:first-child{
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       min-height:100%;
       max-height:150%;
       min-width:100%;
       max-width:150%;
    }    
	.price {
		color: green;

	}
    .list {
        position: relative;
        padding-bottom: px2rem(113px);
        -webkit-overflow-scrolling: touch;
    }
    .footer-box {
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        height: px2rem(113px);
        z-index:1;
        &.fixed  {
            position: fixed;
            bottom: 0;
            left:0; 
        }
    }
    footer {
        position: absolute;
        bottom: 0;
        left:0;
        width:100%;
      /*  动画
        left:-1000%;
        width: 1000%;*/
        height: px2rem(113px);
        z-index:2;
        background: url('../assets/image/list-bottom.gif') repeat-x center bottom;
        background-size: auto 100%;
        // &.fixed  {
        //     position: fixed;
        //     bottom: 0;
        //     left:0; 
        // }

        /*animation: weave 50s linear infinite;*/
    }  
    @keyframes weave {
        0% {left:-800%}
        50% {left:-600%}
        100% {left:-400%}
    } 
	.btns {
		position: absolute;
		bottom: px2rem(50px);
		left: 0;
        z-index: 3;
        width: 100%;
        text-align: center;
		span {
			display: inline-block;
			width:px2rem(186px);
            height:px2rem(67px);
            line-height: px2rem(70px);
            text-align: center;
            background:url('../assets/image/submit.gif') no-repeat center center;
            background-size: 100%;
            border-radius: px2rem(50px);
		}
        .my-order {
            background:url('../assets/image/myorder.gif') no-repeat center center;
            background-size: 100%;
            margin-right: px2rem(50px);
        }
	}
}
</style>
