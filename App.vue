<script>
export default {
	onLaunch: function() {
	},
	onShow: function() {
	},
	onHide: function() {
	}
};
</script>

<style>
@import 'uni.scss';
@import 'style/vant.scss';

page {
  box-sizing: border-box;
  background: #f0f2f5;
  min-height: 100%;
  overflow: hidden;
}

.container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
