<template>
	<div id="app">
		<header class="header">
			<i v-if="!flag" class="iconfont icon-ic_menu" @click="toggle(true)"></i>
			<i v-else="flag" class="iconfont icon-ic_back" @click="back()"></i>
		</header>
		<aside class="aside" :class="{open:open,docked:docked}" @click="toggle()">
			<ul>
				<li class="chose">
					<router-link :to="{path:'/'}">
						<span>首页</span>
						<i class="iconfont icon-ic_star_black"/>
					</router-link>
				</li>
				<li @click="jump()">
					<span>项目地址</span>
					<i class="iconfont icon-github" />
				</li>
			</ul>
			<div class="cover" @touchmove="prevent"></div>
		</aside>
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view class="app-view"></router-view>]
			</keep-alive>
		</transition>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				flag:false,
				timer:'',
				open: false,
				scroller:null,
				docked: false
			}
		},
		mounted(){
			this.scroller = this.$el;
		},
		watch: {
			'$route' (to, from) {
				this.timer = setTimeout(() => {
					if(this.open){
						this.open = false;
						this.docked = false;
					}
					clearTimeout(this.timer);
				}, 300);
			}
		},
		methods: {
			back(n) {
				if (n) {
					this.$router.push({
						path: 'home'
					});
				} else {
					window.history.back()
				}
			},
			toggle() {
				if (!this.open) {
					this.docked = true;
					this.open = true;
				} else {
					this.open = false;
					setTimeout(() => {
						this.docked = false;
					}, 300);
				}
			},
			prevent(event) {
				event.preventDefault()
				event.stopPropagation()
			},
			jump() {
				window.open("https://github.com/walleeeee/daily-zhihu");
			}
		}
	}
</script>

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

	.aside {
		z-index: 11;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		position: fixed;
		visibility: hidden;
		&::-webkit-scrollbar {
			display: none!important;
			width: 0!important;
			height: 0!important;
			-webkit-appearance: none;
			opacity: 0!important;
		}
		ul {
			margin: 0;
			float: left;
			width: 60%;
			height: 100%;
			padding: 1.3rem 0.5rem 0.5rem;
			overflow: auto;
			background: rgba(91, 116, 146, 0.75);
			transform: translate(-100%, 0);
			transition: transform 0.3s ease;
			-webkit-overflow-scrolling: touch;
			&::-webkit-scrollbar {
				display: none!important;
				width: 0!important;
				height: 0!important;
				-webkit-appearance: none;
				opacity: 0!important;
			}
		}
		li {
			cursor: pointer;
			font-size: 0.43rem;
			list-style: none;
			color: #fff;
			margin-top: 20px;
			.iconfont {
				float: right;
				font-size: 0.6rem;
			}
			&.chose {
				color: #FFD300;
			}
		}
		.cover {
			width: 100%;
			height: 100%;
			opacity: 0;
			display: none;
			background: rgba(172, 185, 201, 0.40);
			transition: opacity 0.3s ease;
		}
		&.open {
			ul {
				transform: translate(0);
			}
			.cover {
				opacity: 1;
			}
		}
		&.docked {
			visibility: visible;
			.cover {
				display: block;
			}
		}
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
