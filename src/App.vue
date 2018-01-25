<template>
	<div id="app">
		<alert v-if="errors.length" :errors="errors"></alert>
		<transition name="slide-fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import events from '~events'
import Alert from '~components/Alert.vue'

export default {
	name: 'app',
	components: {
		Alert
	},
	data() {
		return {
			errors: []
		}
	},
	created() {
		events.$on('error', (err) => {
			this.errors.push(err)
			console.log(err)
		})
	},
	watch: {
		'$route' (to, from) {
			this.errors = []
		}
	}
}
</script>

<style lang="sass">
	*
		box-sizing: border-box

	body
		background-color: #f5f6f7
		display: flex
		justify-content: center
		padding: 20px 0
		overflow-x: hidden

	#app
		width: 100%
		font-family: Courier, serif

	.slide-fade-enter-active
		transition: all .3s ease

	.slide-fade-leave-active
		transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1)

	.slide-fade-enter, .slide-fade-leave-active
		padding-left: 10px
		opacity: 0
</style>