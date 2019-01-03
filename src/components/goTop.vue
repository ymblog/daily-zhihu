<!-- 回到顶部组件 -->
<template>
	<div class="circle" @click="goTop()" v-show="isShowTop">
		<i class="iconfont icon-ic_top"></i>
	</div>
</template>
<script>
	import Scroll from './scroll'
	export default{
		name:'go-top',
		mixins: [Scroll],
		data(){
			return{
				isShowTop:false
			}
		},
		methods:{
			onScroll(){
				const isWindow = this.scroller === window;
				const scrollTop = isWindow ? this.scroller.scrollY : this.scroller.scrollTop;
            	this.isShowTop = scrollTop > 100 ? true : false;
			},
			goTop(){
			   	const isWindow = this.scroller === window;
				let scrollTop = isWindow ? this.scroller.scrollY : this.scroller.scrollTop;
				const doc = document.body.scrollTop? document.body : document.documentElement;
			    let top = () => {
			        scrollTop = scrollTop + (0 - scrollTop) / 2;
			        if (scrollTop < 1) {
			            this.scroller.scrollTop = 0;
			            return false;
			        }
			        this.scroller.scrollTop = scrollTop;
			        stop = requestAnimationFrame(top);    
			    };
			    top();
			}
		}
	}
</script>
<style lang="less">
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