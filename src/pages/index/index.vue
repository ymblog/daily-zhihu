<template>
<div>
	<swipe swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
		<div @click="go(top.id)" v-for="top in tops" class="swiper-slide" slot="swiper-con">
			<img :src="top.image">
			<div></div>
			<h3>{{top.title}}</h3>
		</div>
	</swipe>
	<router-link class="list-con" :to="{name:'article', params:{id:item.id}}"  v-for="item in list">
		<img :src="item.images[0]" />
		<p>{{item.title}}</p>
	</router-link>
	<!-- 滑动加载更多组件 -->
	<go-top :scroller="scroller"></go-top>
	<infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
</div>
</template>
<script>
import swipe from '@/components/swipe/swipe.vue';
import infiniteScroll from '@/components/infiniteScroll';
import goTop from '@/components/goTop';
export default {
	mounted() {
		this.getList(1);
		this.scroller = this.$el;
		let swiper = this.$refs.swiper;
		if (swiper.dom) {
			this.swiper = swiper.dom;
		}
	},
	components:{
		infiniteScroll,
		swipe,
		goTop
	},
	activated() {
		if (this.swiper) {
			this.swiper.startAutoplay();
		}
	},
	deactivated() {
		this.loop = false;
		if (this.swiper) {
			this.swiper.stopAutoplay();
		}
	},
	data() {
		return {
			loading: false,
			count: 1,
			scroller: null,
			list: [],
			swiper: "",
			tops: []
		}
	},
	methods: {
		getList(value) {
			if(value){
				this.$ajax({
					url: '/4/news/latest',
		            method: 'GET'
				}).then(data => {
					this.list = data.stories;
					this.tops = data.top_stories;
				});
			}else{
				this.$ajax({
					url: '/4/news/before/' + this.getDate(this.count),
		            method: 'GET'
				}).then(data => {
					this.list = data.stories;
				});
			}
		},
		loadMore() {
			let vue = this;
			this.loading = true;
			vue.count--;
			vue.getList();
		},
		getDate(Count) {
			var dd = new Date();
			dd.setDate(dd.getDate() + Count); //获取AddDayCount天后的日期
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1; //获取当前月份的日期
			m = m >= 10 ? m : "0" + m
			var d = dd.getDate();
			d = d >= 10 ? d : "0" + d;
			return y + "" + m + "" + d;
		}
	}
}
</script>
<style lang="less">
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;

.app-view {
    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        height: 8rem;
        overflow: hidden;
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
</style>
