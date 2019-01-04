<template>
	<header class="header">
		<i v-if="$route.path == '/'" class="iconfont icon-ic_menu" @click="toggle"></i>
		<i v-else class="iconfont icon-ic_back" @click="$router.go(-1)"></i>
	</header>
</template>
<script>
	export default{
		methods:{
			toggle() {
	            this.$emit('show');
	        }
		}
	}
</script>
<style lang="less" scoped>
	.header {
		width: 100%;
		height: 1.5rem;
		z-index: 9;
		padding-left: 5%;
		position: fixed;
		background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.51) 95%);
		.iconfont {
			color: #fff;
			font-size: 0.8rem;
			top: 20%;
			position: relative;
		}
	}
</style>