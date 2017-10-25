<template>
	<div class="load">
		<div class="plant">
			<div class="plane"></div>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="scss">
	.load{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #2c333f;
		.plant{
			position: fixed;
			width: 160px;
			height: 138px;
			margin: auto;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: url(../assets/images/plant.png) no-repeat;
			background-size: 160px 138px;
			.plane{
				position: absolute;
				top: -10px;
				width: 30px;
				height: 25px;
				background: url(../assets/images/plane.png) no-repeat;
				background-size: 30px 25px;
				animation: circle 4s infinite linear;
				transform-origin: 90px 80px;
			}
			@keyframes circle{
				to { transform: rotate(1turn); }
			}
		}
	}	
</style>