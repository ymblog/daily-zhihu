<template>
<div>
    <lt-header @show="toggle">
    </lt-header>
    <aside class="aside" :class="{open:open,docked:docked}" @click="toggle">
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
    <template>
        <swipe v-if="tops.length > 0" swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
            <div @click="go(top.id)" v-for="top in tops" class="swiper-slide" slot="swiper-con">
                <img :src="top.image">
                <div></div>
                <h3>{{top.title}}</h3>
            </div>
        </swipe>
        <div v-else class="skeleton-swiper"></div>
        <template v-if="list.length > 0">
            <router-link class="list-con" :to="{name:'article', params:{id:item.id}}"  v-for="item in list">
                <img :src="item.images[0]" />
                <p>{{item.title}}</p>
            </router-link>
        </template>
        <template v-else>
            <div v-for="i in 6" class="skeleton-list">
                <div class="skeleton-item">
                    <div class="skeleton-box"></div>
                    <div class="skeleton-line"></div>
                </div>
            </div>
        </template>
    </template>
	<infinite-scroll :loading="loading" @load="loadMore" :busy="busy" :isNoMore="isNoMore"/>
    <!-- 滑动加载更多组件 -->
    <go-top></go-top>
</div>
</template>
<script>
import swipe from '@/components/swipe/swipe.vue';
import ltHeader from '@/components/header.vue';
import infiniteScroll from '@/components/infiniteScroll';
import goTop from '@/components/goTop';
export default {
	mounted() {
		this.getList(1);
		this.scroller = window;
	},
	activated() {
		if (this.swiper) {
			this.swiper.startAutoplay();
		}
	},
	deactivated() {
		if (this.swiper) {
			this.swiper.stopAutoplay();
		}
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
    data() {
        return {
            loading: false,
            count: 1,
            list: [],
            swiper: "",
            timer:'',
            open: false,
            docked: false,
            tops: [],
            isNoMore:false,
            busy:false
        }
    },
    components:{
        infiniteScroll,
        swipe,
        goTop,
        ltHeader
    },
	methods: {
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
		getList(value) {
			if(value){
				this.$ajax({
					url: '/4/news/latest',
		            method: 'GET'
				}).then(data => {
					this.list = data.stories;
					this.tops = data.top_stories;
                    this.loading = true;
                    this.busy = false;
				});
			}else{
				this.$ajax({
					url: '/4/news/before/' + this.getDate(this.count),
		            method: 'GET'
				}).then(data => {
					this.list = data.stories;
                    this.busy = false;
				});
			}
		},
		loadMore() {
			let vue = this;
			vue.count--;
            this.busy = true;
			vue.getList();
		},
		getDate(Count) {
			var dd = new Date();
			dd.setDate(dd.getDate() + Count);
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1; //获取当前月份的日期
			m = m >= 10 ? m : "0" + m
			var d = dd.getDate();
			d = d >= 10 ? d : "0" + d;
			return y + "" + m + "" + d;
		},
        jump(){
            window.open('https://github.com/ymblog/daily-zhihu');
        }
	}
}
</script>
<style lang="less">
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;
@bg : #eee;
.swiper-container{
    height:8rem;
}
.skeleton-swiper{
    height: 8rem;
    margin-bottom: 15px;
    background: @bg;
}
.skeleton-item{
    display:flex;
    padding: .3rem;
    margin-bottom: .4rem;
}
.skeleton-box{
    width: 2rem;
    margin-right: .4rem;
    height: 2rem;
    background: @bg;
}
.skeleton-line{
    height:.4rem;
    align-self:center;
    flex:1;
    background: @bg;
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
.app-view {
    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        height: 8rem;
        position: relative;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 1rem;
        width: 95%;
        text-align: right;
    }
    .list:nth-child(2) {
        margin-bottom: 0;
        padding-top: 0;
        .list-time {
            top: -.8rem;
        }
    }
}
.swiper-slide {
    div {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-color: @blue;
    }
    img {
        top: 50%;
        position: relative;
        transform: translate(0, -50%);
    }
    h3 {
        width: 70%;
        color: #fff;
        margin: 0;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 2.6rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        &:before {
            content: "";
            width: 3rem;
            bottom: -.6rem;
            right: 0;
            display: block;
            position: absolute;
            border: 2px solid @yellow;
        }
    }
}
.list {
    width: 90%;
    z-index: 1;
    position: relative;
    padding-top: 0.8rem;
    margin: .8rem auto 0;
    &-time {
        top: 0;
        margin: 0;
        color: #fff;
        padding: 0 1rem;
        font-size: 0.4rem;
        line-height: 0.8rem;
        letter-spacing: 0.1rem;
        border-radius: 0.4rem;
        text-align: center;
        background-color: @yellow;
        transform: translate(0,-50%);
        position: absolute;
        box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
    }
    &-con {
	cursor: pointer;
        display: flex;
        padding: 0.3rem;
        margin-bottom: 0.4rem;
        border-radius: 0.15rem;
        align-items: center;
        background-color: #fff;
        box-shadow: 0 3px 10px 0 rgba(91,115,146,0.15);
        img {
            width: 2rem;
            margin-right: 0.4rem;
        }
        p {
            color: @blue;
            font-size: 0.4rem;
            text-align: justify;
            margin: 0;
        }
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
</style>
