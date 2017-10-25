<template>
	<div class="container">
		<div class="main-top">
			<div class="main-top-left">
				<figure v-for="item in mainLeft">
					<span class="img icon-image" @click="modal(item.children)" v-show="item.children"></span>
					<div class="text-con" v-show="item.title">
						<h1>{{item.title.t1}}</h1>
						<h2>{{item.title.t2}}</h2>
						<h3>{{item.title.t3}}</h3>
					</div>
					<img :src="item.ImgSrc">
					<a class="detail" v-show="item.title"><span class="icon-next"></span></a>
				</figure>
			</div>
			<div class="main-top-right">
				<figure v-for="item in mainRight">
					<span class="img icon-image" @click="modal(item.children)" v-show="item.children"></span>
					<div class="text-con" v-show="item.title">
						<h1>{{item.title.t1}}</h1>
						<h2>{{item.title.t2}}</h2>
						<h3>{{item.title.t3}}</h3>
					</div>
					<img :src="item.ImgSrc">
					<a class="detail" v-show="item.title"><span class="icon-next"></span></a>
				</figure>
			</div>
		</div>
		<div class="main-middle">
			<figure v-for="item in mainMiddle">
				<span class="img icon-image" @click="modal(item.children)" v-show="item.children"></span>
				<div class="text-con" v-show="item.title">
					<h1>{{item.title.t1}}</h1>
					<h2>{{item.title.t2}}</h2>
					<h3>{{item.title.t3}}</h3>
				</div>
				<img :src="item.ImgSrc">
				<a class="detail" v-show="item.title"><span class="icon-next"></span></a>
			</figure>
		</div>

		<!-- 瀑布区域 -->
		<div class="waterfall" ref="water">
			<figure class="hook" v-for="item in fall">
				<div class="text-con" v-show="item.title">
					<h1>{{item.title.t1}}</h1>
					<h2>{{item.title.t2}}</h2>
					<h3>{{item.title.t3}}</h3> 
				</div>
				<span class="img icon-image" @click="modal(item.children)" v-show="item.children"></span>
				<img :src="item.ImgSrc">
				<a class="detail" v-show="item.title"><span class="icon-next"></span></a>
			</figure>
		</div>

		<!-- 弹框区域 -->
		<modal :layer="layer" @hide="layer = false" :children="children" ref="modal"></modal>

		<!-- 加载中 -->
		<load v-show="loadDone"></load>
	</div>
</template>

<script>
import modal from './modal.vue'
import load from './loading.vue'
export default {
	data() {
		return {
			fall: [],
			layer: false,
			loadDone: true,
			children: [],
			mainLeft: [],
			mainRight: [],
			mainMiddle: []
		}
	},
	components: {
		modal,load
	},
	computed: {
	},
	methods: {
		// 获取最小值index方法
		minIndex(arr,min) {
			for(var i in arr){
				if(arr[i] == min) return i;
			}
		},
		// 图片弹框
		modal(img) {
			// 显示遮罩层
			this.layer = true;
			this.children = img;
			this.$refs.modal.update();
		},
		_getMain() {
			this.$http.get('main')
			.then((res)=>{
				this.mainLeft = res.data.data.mainleft;
				this.mainRight = res.data.data.mainright;
				this.mainMiddle = res.data.data.mainmiddle;
				this.loadDone = false;
			})
		},
		_getFall() {
			this.$http.get('waterfall')
			.then((res)=>{
				this.fall = res.data.data;
				this._waterInit();
			})
		},
		_waterInit() {
			// 渲染图片
			setTimeout(()=> {
				let figure = document.querySelectorAll(".hook");
				let clientWidth = document.querySelector(".container");
				let rowWidth = figure[0].offsetWidth;
				let rows = Math.floor(clientWidth.offsetWidth / rowWidth);
				// 定义一个数组用于存放块的高度
				let hArr = new Array();
				for(let i = 0;i < rows;i++){
	                if (!hArr[i]) hArr[i] = -20;
	        	}

				for(let i = 0; i < figure.length; i++){
					// 获取数组中最小的值
					let minH = Math.min.apply(null,hArr);
					// 获取最小值的index
					let minI = this.minIndex(hArr,minH);

					let selfHeight = figure[i].offsetHeight;
					figure[i].style.position = "absolute";
					figure[i].style.top = minH + 20 + `px`;
					figure[i].style.left = (rowWidth * minI) +`px`;
					hArr[minI] += figure[i].offsetHeight + 20;
				}
			},170)
		}
	},
	mounted() {
		// 获取头部图片
		this._getMain();

		// 获取瀑布流图片
		this._getFall();

		// 检测窗口大小变化
		window.onresize = ()=>{
			this._waterInit();
		}
	}
}
</script>

<style lang="scss">
	.container{
		max-width: 1190px;
		margin: 60px auto;
		padding: 0 10px;
		.main-top{
			position: relative;
			overflow: hidden;
		}
		.main-top-left{
			width: 50%;
			float: left;
			font-size: 0;
			figure{
				position: relative;
				width: 50%;
				display: inline-block;
				margin-bottom: 20px;
				padding: 0 10px;
				img{
					width: 100%;
				}
				&:last-child{
					width: 100%;
				}
				.img{
					position: absolute;
					top: 30px;
					left: 20px;
					display: block;
					font-size: 40px;
					color: #fff;
					cursor: pointer;
					transition: all 0.4s;
					&:hover{
						color: #3d3d3d;
					}
				}
				.detail{
					position: absolute;
					display: block;
					right: 70px;
					bottom: 45px;
					width: 50px;
					height: 50px;
					font-size: 26px;
					color: #f0f1f3;
					cursor: pointer;
					border-radius: 100%;
					padding: 10px;
					border: 1px solid #fff;
					text-align: center;
					line-height: 36px;
					transition: all 0.4s;
					&:hover{
						background: #fff;
						color: #3d3d3d;
					}
				}
				.text-con{
					position: absolute;
					top: 0;
					left: 0;
					color: #fff;
					padding: 50px 0 0 40px;
					h1{
						font-size: 14px;
						padding-bottom: 30px; 
						font-weight: bold;
					}
					h2{
						font-size: 46px;
						padding-bottom: 20px;
					}
					h3{
						font-size: 18px;
					}
				}
			}
		}
		.main-top-right{
			@extend .main-top-left;
			padding-right: 0;
			figure{
				&:first-child{
					width: 100%;
				}
				&:last-child{
					width: 50%;
				}
			}
		}
		.main-middle{
			@extend .main-top-left;
			width: 100%;
			float: none;
			figure{
				&:first-child{
					margin-right: 0;
				}
				&:last-child{
					margin-left: 0;
				}
			}
		}
		.waterfall{
			position: relative;
			width: 100%;
			@extend .main-top-left;
			figure{
				width: 50%;
				float: left;
				&:last-child{
					width: 50%;
				}
			}
		}
		@media screen and (max-width: 700px) {
			.main-top-left{
				width: 100%;
				figure{
					.text-con{
						padding: 30px 0 0 20px;
						h1{
							padding-bottom: 10px; 
						}
						h2{
							font-size: 24px;
							padding-bottom: 10px;
						}
					}
				}
			}
			.main-top-right{
				width: 100%;
			}
			.waterfall{
				figure{
					width: 100%;
					&:last-child{
						width: 100%;
					}
				}
			}
		}
		@media screen and (max-width: 420px) {
			.main-top-left{
				width: 100%;
				figure{
					width: 100%;
				}
			}
			.main-top-right{
				figure{
					&:last-child{
						width: 100%;
					}
				}
			}
		}
	}

</style>