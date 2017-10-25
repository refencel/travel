<template>
	<div class="modal">
		<div class="layer" v-show="layer" @click="$emit('hide')"></div>
		<transition name="fadeDown">
			<swiper :options="swiperOption" v-show="layer" ref="swiper">
			    <swiper-slide v-for="(slide,key) in children" :key="key"><img :src="slide.childImg"></swiper-slide>
			    <div class="swiper-button-prev icon-left" slot="button-prev"></div>
		        <div class="swiper-button-next icon-right" slot="button-next"></div>
			</swiper>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			layer: {
				type: Boolean,
				default: false
			},
			children: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				swiperOption: {
					setWrapperSize: true,
					nextButton: '.swiper-button-next',
	          		prevButton: '.swiper-button-prev',
					observeParents: true
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.swiper.swiper;
			}
		},
		methods: {
			update() {
				this.swiper.slideTo(0, 1000, false);
				this.swiper.onResize();
			}
		},
		mounted() {
			this.update();
		}
	}
</script>

<style lang="scss">
	.layer{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.7);
		z-index: 2;
	}
	.swiper-container{
		position: fixed !important;
		width: 1000px;
		top: 50%;
		left: 50%;
		border-radius: 4px;
		z-index: 3 !important;
		opacity: 1;
		transform: translate(-50%,-50%);
		.swiper-slide{
			width: 100%;
			height: 100%;
			img{
				display: block;
				width: 100%;
			}
		}
		.swiper-button-prev{
			width: 60px;
			height: 60px;
			text-align: center;
			line-height: 60px;
		    color: #fff;
		    font-size: 44px;
		    background-image: none;
		    margin-top: -30px;
		    border-radius: 100%;
		    background: rgba(0,0,0,0.3);
		    padding-right: 4px;
		    transition: all .4s linear;
		    &:hover{
				background: rgba(0,0,0,0.8);
		    }
		}
		.swiper-button-next{
			@extend .swiper-button-prev;
			padding-left: 6px;
		}
	}
	.fadeDown-enter-active{
		animation: fadeDown .6s;
	}
	.fadeDown-leave-active{
		animation: fadeDown .2s reverse;
	}
	@keyframes fadeDown{
		0% {
			opacity: 0;
			transform: translate(-50%,-100%);
		}
		100% {
			opacity: 1;
			transform: translate(-50%,-50%);
		}
	}
	@media only screen and (min-width: 1100px) {
		.swiper-container{
			width: 1000px;
		}
	}
	@media screen and (max-width: 1100px) {
		.swiper-container{
			width: 90%;
		}
	}
	@media screen and (max-width: 600px) {
		.swiper-container{
			.swiper-button-prev{
				width: 40px;
				height: 40px;
				font-size: 24px;
				line-height: 40px;
			}
			.swiper-button-next{
				width: 40px;
				height: 40px;
				font-size: 24px;
				line-height: 40px;
			}
		}
	}
</style>