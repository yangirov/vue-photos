<template>
	<div class="alert">
		<ul >
			<li v-for="error of errors">
				{{error.name}} : {{error.message}}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Alert',
	props: [ 'errors' ]
}
</script>

<style lang="sass">
	.alert
		width: 100%
		background-color: #333
		border-radius: 5px
		padding: 10px
		color: #fff
		h1
			margin: 0
			padding: 0
</style>