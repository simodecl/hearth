<template>
  <div id="app">
    <component :is="layout">
    	<router-view/>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  created() {
    // nothing defined here (when this.$route.path is other than "/")
    console.log(this.$route, this.$route.meta.layout);
  },
  updated() {
    // something defined here whatever the this.$route.path
    console.log(this.$route, this.$route.meta.layout);
  }
};
</script>

<style lang="scss">
// Reset css

html, body {
	height: 100%;
	min-height: 100%;
}

body {
	font-family: Arial, Helvetica, sans-serif;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

// Custom css
@import url('https://fonts.googleapis.com/css?family=Rubik:700');
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
@import "./styles/variables.scss";

#app {
	height: 100%;
	min-height: 100%;
	background-color: $darkgrey;
	color: white;
	font-family: 'Lato', sans-serif;
}

// Changing some vuetify css
.v-overlay {
	display: none !important;
}

.v-ripple__container {
	display: none !important;
}
</style>

