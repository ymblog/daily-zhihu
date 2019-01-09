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
</style>
