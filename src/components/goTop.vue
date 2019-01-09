<!-- 回到顶部组件 -->
<template>
	<div class="circle" @click="goTop()" v-show="isShowTop">
		<i class="iconfont icon-ic_top"></i>
	</div>
</template>
<script>
	import scroll from '@/assets/js/scroll';
	export default{
		name:'go-top',
		mixins: [scroll],
		data(){
			return{
				isShowTop:false
			}
		},
		methods:{
			onScroll(){
				const doc = document.body.scrollTop ? document.body : document.documentElement;
            	this.isShowTop = doc.scrollTop > 100 ? true : false;
			},
			goTop(){
				const doc = document.body.scrollTop ? document.body : document.documentElement;
				let scrollTop = doc.scrollTop;
			    const top = () => {
			    	//设置平滑滚动
			        scrollTop = scrollTop + (0 - scrollTop) / 2;
			        if (scrollTop < 1) {
			            doc.scrollTop = 0;
			            return false;
			        }
			        doc.scrollTop = scrollTop;
			        requestAnimationFrame(top);    
			    };
			    top();
			}
		}
	}
</script>
<style lang="less" scoped>
	.circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.80);
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
		right: 5%;
		bottom: 5vw;
		position: fixed;
		z-index: 10;
		i {
			top: 50%;
			left: 50%;
			font-size: 0.6rem;
			color: #ACB9C9;
			transform: translate(-50%, -50%);
			position: absolute;
		}
	}
</style>