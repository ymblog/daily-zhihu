<template>
<div class="con">
    <lt-header></lt-header>
	<div v-if="data.image" class="con-img">
		<img :src="data.image" />
		<div class="con-img-mask"></div>
		<h2>{{data.title}}</h2>
	</div>
    <div v-else class="skeleton-box">
        <div class="skeleton-banner"></div>
        <ul v-for="i in 3">
            <li v-for="i in 6"></li>
        </ul>
    </div>
    <div class="con-answer" v-html="data.body"></div>
</div>
</template>
<script>
import ltHeader from '@/components/header.vue';
export default {
    data() {
        return {
            data: "",//数据
            article:{}//数据存储,下次使用本地存储
        }
    },
    components:{
        ltHeader
    },
	activated: function() {
		const id = this.$route.params.id;
        const doc = document.body.scrollTop ? document.body : document.documentElement
        doc.scrollTop = 0;
        //避免多次读取一样的id的详情数据
		if (this.article.hasOwnProperty(id)) {
			this.data = this.article[id];
		} else {
            this.$ajax({
                url: '/4/news/' + id,
                method: 'GET'
            }).then((data) =>{
                this.article[id] = data;
                this.data = data;
            });
		}
	},
	deactivated: function() {
		this.data = "";
	}
}
</script>
<style lang="less" scoped>
@red: #FC4482;
@yellow: #FFD300;
@blue: #5B7492;
@gray: #acb9c8;
@bg : #eee;
.skeleton-banner{
    height:450px;
    background:@bg;
}
.skeleton-box{
    width:100%;
    box-sizing:border-box;
    ul{
        margin: 30px;
    }
    li{
        margin-bottom:25px;
        height:35px;
        background:@bg;
        &:first-child{
            margin-left: 2em;
        }
    }
}
img {
    width: 100%;
}
.page-content {
    text-align: center;
}
.con {
    color: #666;
    height: 100vh;
    .con-img {
        height: 6rem;
        overflow: hidden;
        position: relative;
        img {
            top: 50%;
            width: 100%;
            position: relative;
            transform: translate(0,-50%);
        }
        h2 {
            width: 60%;
            margin: 0;
            padding: 0;
            right: 5%;
            bottom: 1rem;
            text-align: right;
            font-size: 0.45rem;
            color: rgba(255,255,255,.9);
            position: absolute;
            text-shadow: 0 0 5px rgba(0,0,0,.5);
        }
        &-mask {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(91,116,146,0.50);
            position: absolute;
        }
    }
    .con-answer {
        padding: 5%;
        position: relative;
        h2,
        li,
        p {
            text-align: justify!important;
        }
        h2 {
            color: @blue;
            position: relative;
            z-index: 1;
			font-size: .54rem;
        }
        a {
            color: @yellow;
            word-break: break-word;
        }
        .headline-title {
            color: @blue;
        }
        .meta {
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .avatar {
                vertical-align: middle;
                display: inline-block;
                width: 0.6rem;
                margin-right: 0.1rem;
            }
            span {
                color: #666;
            }
            .author {
                color: @red;
                display: inline-table;
            }
        }
        .content {
            font-size: 28px;
            line-height:1.7;
        }
        .question {
            blockquote {
                text-align: justify;
                position: relative;
                &::before {
                    content: '';
                    left: -.5rem;
                    display: block;
                    height: 100%;
                    border-left: 0.1rem solid @yellow;
                    position: absolute;
                }
            }
            &:first-child {
                padding-top: 0;
            }
            &:last-child {
                padding-bottom: 0;
                &::before {
                    display: none;
                }
            }
            ul {
                padding-left: 0.3rem;
                li {
                    text-align: left;
                }
            }
        }
        .content-image {
            width: inherit;
            max-width: 100%;
            margin: 15px auto;
            display: block;
        }
        .view-more {
            text-align: center;
            margin-bottom: 0.5rem;
            a {
                z-index: 1;
                position: relative;
            }
        }
    }
}
</style>
