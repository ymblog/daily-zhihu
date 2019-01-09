<template>
<div class="infinite-scroll" v-show="loading">
	<span class="lt-loading"><i></i></span>
	<span class="infinite-scroll-text">{{loadingText}}</span>
</div>
</template>

<script>
import scroll from '@/assets/js/scroll';
export default {
	name: 'infinite-scroll',
	mixins: [scroll],
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		busy:{
			type: Boolean,
			default: false
		},
		isNoMore:{
			type: Boolean,
			default: false
		},
		loadingText: {
			type: String,
			default: '正在加载...'
		}
	},
	methods: {
		onScroll() {
			if (this.busy || this.isNoMore){
				return false;
			}
			const scroller = this.scroller;
			const isWindow = scroller === window;
			const doc = isWindow ? (document.body.scrollTop ? document.body : document.documentElement) : scroller;
			const scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : scroller.scrollHeight;
			let height = scrollHeight - doc.scrollTop - 5;
			let contHeight = isWindow ? window.innerHeight : scroller.offsetHeight;
			//滑动距离大于内容高度触发加载事件
			if (height <= contHeight) {
				this.$emit('load');
			}
		}
	}
}
</script>

<style lang="less" scoped>
.infinite-scroll {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 8px;
	line-height: 36px;
	width: 100%;
}

.infinite-scroll-text {
	margin-left: 16px;
	font-size: 16px;
	color:#5B7492;
}
</style>
