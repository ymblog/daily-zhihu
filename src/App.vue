<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view class="app-view"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>
<style lang="less">
@import "./assets/css/base.less";
@import "./assets/css/layout.less";
@import "./assets/css/sprite.less";
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(50vw, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0.1;
		-webkit-transform: translate(-50vw, 0);
	}

	.app-view {
		z-index: 1;
		width: 100vw;
		height: 100vh;
		overflow: auto;
		position: absolute;
		transition: transform 0.3s ease;
		-webkit-overflow-scrolling: touch;
	}

	.app-view-hidden {
		overflow: hidden;
	}
	@media screen and (min-width: 640px) {
		.app-view {
			width: 640px;
			left: 50%;
			transform: translate(-50%, 0);
		}
		.aside ul {
			width: 350px;
		}
	}
</style>
