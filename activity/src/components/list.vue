<template>
	<div class="container">
		<div class="logo">
		</div>
		<div class="list" >
			<div class="product clearfix" v-for="(item,index) in list" :key="index">
				<img class="img fl" :src="item.productImg[0].productimgID" alt="">
				<div class="info" v-html="item.htmldetial">			
				</div>
			</div>
            <i class="line-l"></i>
            <i class="line-r"></i>
            <footer>
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
			}
			
		},
        created() {
            this.$http.post('/getProduct/getSinaProduct',{"key":"12345678","ProductID":""}).then((res)=> {
            	if(res.status == 200) {
            		this.list = res.data.result;
            	}
            })
        },
		methods: {
			skipTo(n) {
				if(n == 0) {
					this.$router.push('myOrder')
				}else {
					this.$router.push('subOrder')
				}
			},
            goToDetail() {
                this.$router.push('itemdetail')
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
		.info {
            padding-top: px2rem(40px);
            padding-left: px2rem(450px);
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
