<template>
	<div class="container">
		<div class="logo">
			
		</div>
		<div class="list" >
			<div class="product clearfix" v-for="(item,index) in list" :key="index">
				<img class="img fl" src="" alt="">
				<div class="info">
					<div class="name">{{item.name}}</div>
					<div class='detail-box'>
					    <div class="detail-item" v-for="(detail,index) in item.spec">
					    	<span class="spec-name">面值</span>	
							<span class="spec-value">{{detail.money}}</span>
							<br/>
							<span class="spec-name">配置</span>	
							<span class="spec-value">{{detail.config}}</span>
							<br/>
							<span class="spec-name">范围</span>	
							<span class="spec-value">{{detail.range}}</span>
					    </div>
					</div>
					<div class="price">端午价：{{item.price}}元</div>
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
				list:[
					{
						id:1,
                     	name:'哈根达斯券',
                     	img:'',
                     	price:'150',
                     	spec:[
                          {'money':'150',
                          'config':'张50元优惠券',
                          'range':'全国范围'}
                     	]
					},
					{
						id:1,
                     	name:'哈根达斯券',
                     	img:'',
                     	price:'150',
                     	spec:[
                          {'money':'150',
                          'config':'张50元优惠券',
                          'range':'全国范围'}
                     	]
					},	
					{
						id:1,
                     	name:'哈根达斯券',
                     	img:'',
                     	price:'150',
                     	spec:[
                          {'money':'150',
                          'config':'张50元优惠券',
                          'range':'全国范围'}
                     	]
					},
					{
						id:1,
                     	name:'哈根达斯券',
                     	img:'',
                     	price:'150',
                     	spec:[
                          {'money':'150',
                          'config':'张50元优惠券',
                          'range':'全国范围'}
                     	]
					},
					{
						id:1,
                     	name:'哈根达斯券',
                     	img:'',
                     	price:'150',
                     	spec:[
                          {'money':'150',
                          'config':'张50元优惠券',
                          'range':'全国范围'}
                     	]
					}																											
				],
				activeBtn:0
			}
			
		},
		methods: {
			skipTo(n) {
				if(n == 0) {
					this.$router.push('myOrder')
				}else {
					this.$router.push('subOrder')
				}
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
	}
</style>
