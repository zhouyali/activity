<template>
	<div class="container">
		<div class="logo">
			
		</div>
		<div class="list" >
			<div class="product clearfix" v-for="(item,index) in list" :key="index">
				<img class="img fl" src="" alt="">
				<div class="info">
<!-- 					<div class="name">名字：{{item.ProductName}}</div>
					<div class="filler">材质：{{item.Filler}}</div>
					<div class="material">种类：{{item.Material}}</div> -->
<!-- 					<div class='detail-box'>
					    <div class="detail-item" v-for="(detail,index) in item.spec" @click="goToDetail"> -->
<!-- 					    	<span class="spec-name">面值</span>	
							<span class="spec-value">{{detail.money}}</span>
							<br/>
							<span class="spec-name">配置</span>	
							<span class="spec-value">{{detail.config}}</span>
							<br/>
							<span class="spec-name">范围</span>	
							<span class="spec-value">{{detail.range}}</span> -->
<!-- 					    </div>
					</div> -->
					<!-- <div class="price">端午价：{{item.price}}元</div> -->
<div style=""><b>面值 150</b></div><div style=""><b>配置 张50元优惠卷</b></div><div style=""><b>范围 全国范围</b></div><div style=""><b><font color="#808000">端午节</font>：<font color="#ffcc00">150元</font></b></div>

					
				</div>
			</div>
		</div>
		<div class="btns">
			<span :class="{'active':activeBtn == 0}" @click="skipTo(0)">我的定单</span>
			<span :class="{'avtive':activeBtn == 1}" @click="skipTo(1)">提交订单</span>
		</div>
		<footer></footer>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// list:[
				// 	{
				// 		id:1,
    //                  	name:'哈根达斯券',
    //                  	img:'',
    //                  	price:'150',
    //                  	spec:[
    //                       {'money':'150',
    //                       'config':'张50元优惠券',
    //                       'range':'全国范围'}
    //                  	]
				// 	},
				// 	{
				// 		id:1,
    //                  	name:'哈根达斯券',
    //                  	img:'',
    //                  	price:'150',
    //                  	spec:[
    //                       {'money':'150',
    //                       'config':'张50元优惠券',
    //                       'range':'全国范围'}
    //                  	]
				// 	},	
				// 	{
				// 		id:1,
    //                  	name:'哈根达斯券',
    //                  	img:'',
    //                  	price:'150',
    //                  	spec:[
    //                       {'money':'150',
    //                       'config':'张50元优惠券',
    //                       'range':'全国范围'}
    //                  	]
				// 	},
				// 	{
				// 		id:1,
    //                  	name:'哈根达斯券',
    //                  	img:'',
    //                  	price:'150',
    //                  	spec:[
    //                       {'money':'150',
    //                       'config':'张50元优惠券',
    //                       'range':'全国范围'}
    //                  	]
				// 	},
				// 	{
				// 		id:1,
    //                  	name:'哈根达斯券',
    //                  	img:'',
    //                  	price:'150',
    //                  	spec:[
    //                       {'money':'150',
    //                       'config':'张50元优惠券',
    //                       'range':'全国范围'}
    //                  	]
				// 	}																											
				// ],
				list:[],
				activeBtn:0
			}
			
		},
        created() {
            this.$http.post('/getProduct/getSinaProduct',{"key":"12345678","ProductID":""}).then((res)=> {
            	if(res.status == 200) {
            		this.list = res.data.result;
            	}
                console.log(res)
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
    .container {
    	position: relative;
    	padding-bottom: px2rem(200px);
    }
	.logo {
		width: 100%;
		height: px2rem(500px);
		background: pink;
	}
	.product {
		margin:0 px2rem(30px);
		padding:px2rem(10px) px2rem(20px);
		border: 1px solid red;
		font-size: px2rem(24px);
		.info {
			margin-left: px2rem(300px);
		}
	}
	.img {
		background: yellow;
		width: px2rem(250px);
		height: px2rem(150px);
	}
	.price {
		color: green;

	}
	.btns {
		position: fixed;
		bottom: px2rem(70px);
		left: 0;
        z-index: 2;
        width: 100%;
        text-align: center;
		span {
			display: inline-block;
			color: #333;
			border: 1px solid #333;
			border-radius: px2rem(10px);
			font-size: px2rem(24px);
			padding: px2rem(10px) px2rem(15px);
			margin: 0 px2rem(20px);
		}
		.active{
			background: green;
			color: #fff;
		}
	}
	footer {
		position: fixed;
		bottom: 0;
		left:0;
		background:pink;
		width: 100%;
		height: px2rem(100px);
        z-index:1;
        background: url('../assets/image/weavebt.jpg') no-repeat center bottom;
        background-size: 100%;
	}
</style>
