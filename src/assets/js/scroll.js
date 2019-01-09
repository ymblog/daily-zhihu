export default {
	props: {
		scroller: {
			type: [ HTMLDocument, Element, Window ],
			default: () => {return window},
			required:false
		}
	},
	mounted() {
		this.bindScroll()
	},
	methods: {
		bindScroll() {
			if ( !this.scroller ){
				return false;
			}
			this.handleScroll = ( e ) => {
				if ( this.onScroll ) this.onScroll() //滑动屏幕回调函数
			}
			this.scroller.addEventListener('scroll', this.throttle(this.handleScroll,500,1000));
		},
		unbindScroll( scroller ) {
			scroller = scroller || this.scroller;
			if ( this.handleScroll ) scroller.removeEventListener( 'scroll',this.throttle(this.handleScroll,500,1000));
		},
		//滚动节流
	 	throttle(func, wait, mustRun) {
		    let timeout,
		        startTime = new Date();
		    return function() {
		        var context = this,
		            args = arguments,
		            curTime = new Date();
		        clearTimeout(timeout);
		        // 如果达到了规定的触发时间间隔，触发 handler
		        if(curTime - startTime >= mustRun){
		            func.apply(context,args);
		            startTime = curTime;
		        // 没达到触发间隔，重新设定定时器
		        }else{
		            timeout = setTimeout(func, wait);
		        }
		    }
		}
	},
	beforeDestroy() {
		this.unbindScroll()
	},
	watch: {
		scroller( scroller, oldScroller ) {
			if ( scroller === oldScroller ){
				return false;
			}
			this.unbindScroll( oldScroller )
			this.bindScroll( scroller )
		}
	}
}
