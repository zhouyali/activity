<template>
	<div class="container">
		<div class="logo">
		</div>
		<div class="list" v-if="list && list.length > 0">
			<div class="product clearfix" v-for="(item,index) in list" :key="index" @click="skipToDetail(item.imghtmldetial)">
				<img class="img fl" v-if="item.productImg &&item.productImg.length>0&& item.productImg[0].productimgID" :src="item.productImg[0].productimgID" alt="">
                <img class="img fl" v-else src="" alt="">
				<div class="info" v-if="item.htmldetial!==''" v-html="item.htmldetial">			
				</div>
				<span :class="{'checked':checkeds.indexOf(index) > -1}" @click.stop="checkedProduct(item,index)"></span>
			</div>
            <i class="line-l"></i>
            <i class="line-r"></i>
            <footer class="{'fixed':!list || list.length <= 2}">
                <div class="btns">
                    <span :class="{'active':activeBtn == 0}" class="my-order" @click="skipTo(0)"></span>
                    <span :class="{'avtive':activeBtn == 1}" @click="skipTo(1)"></span>
                </div>            
            </footer>   
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
                isBooked:false
			}
			
		},
        created() {
            var backMsg;
            this.$route.query.backMsg?backMsg = this.$route.query.backMsg:backMsg='';
            if(backMsg == 'ok'||(localStorage.getItem('isBooked')&&localStorage.getItem('isBooked') == 'ok')) {
                this.isBooked = true
            }else {
                 this.isBooked = false
            }
            this.getList()
        },
		methods: {
		    getList() {
	            this.$http.post('/getProduct/getSinaProduct',{"key":"12345678","ProductID":""}).then((res)=> {
	            	if(res.status == 200) {
	            		this.list = res.data.result;
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
	            	}else if(this.isBooked){
                        $toast.showMsg('您已预定过商品')
                        return false;
                    }else {
                        this.$router.push({'path':'itemdetail'});
                        localStorage.setItem('products',JSON.stringify(this.products));                       
                    }

				}
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
            	if (this.checkeds.length >= 2) {
            		$toast.showMsg('只能选择两个商品');
            		return false;
            	}
            	this.checkeds.push(index);
            	this.products.push(item);         	
            	
            }
		}
	}
</script>
<style lang="scss" scoped>
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
		margin:0 auto;
        background:url('../assets/image/card.gif') no-repeat top center;
        background-size: 100%;
        position:relative;
        overflow: hidden;
		.info {
            padding-top: px2rem(40px);
            padding-left: px2rem(450px);
		}
		span {
			display:block;
			position: absolute;
			width:px2rem(36px);
			height:px2rem(36px);
			border-radius:50%;
			border:2px solid #78c25e;
			left: px2rem(20px);
			top:50%;
			margin-top:px2rem(-18px);
		}
		.checked {
			background: #78C25E !important;
		}
	}
	.img {
		background: yellow;
		width: px2rem(320px);
		height: px2rem(169px);
        border-radius: px2rem(15px);
        margin: px2rem(22px) 0 px2rem(22px) px2rem(70px);
	}
	.price {
		color: green;

	}
    .list {
        position: relative;
        padding-bottom: px2rem(113px);
        -webkit-overflow-scrolling: touch;
    }
    footer {
        position: absolute;
        bottom: 0;
        left:0;
        width: 100%;
        height: px2rem(113px);
        z-index:1;
        background: url('../assets/image/list-bottom.gif') no-repeat center bottom;
        background-size: 100%;
        &.fixed  {
            position: fixed;
            bottom: 0;
            left:0; 
        }
    }    
	.btns {
		position: absolute;
		bottom: px2rem(70px);
		left: 0;
        z-index: 2;
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
		}
        .my-order {
            background:url('../assets/image/myorder.gif') no-repeat center center;
            background-size: 100%;
            margin-right: px2rem(50px);
        }
	}
</style>
