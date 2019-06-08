<template>
  <div id="app">
    <component :is="layout">
    	<router-view></router-view>
		</component>
  </div>
</template>

<script>
const default_layout = "default"
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout"
    }
  },
  mounted () {
    window.onSpotifyWebPlaybackSDKReady = () => {}
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

#app {
  width: 100vw;
  min-height: 100vh;
	background-color: $darkgrey;
	color: white;
	font-family: 'Lato', sans-serif;
}

</style>

