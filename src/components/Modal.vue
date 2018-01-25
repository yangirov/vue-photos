<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<button class="modal-close-button" @click="$emit('close')">x</button>
					</div>
					<div class="modal-body">
						<slot name="image"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style lang="sass">
	.modal-mask
		position: absolute
		z-index: 9999
		top: 0
		left: 0
		width: 100vw
		height: 100vmax
		background-color: rgba(0, 0, 0, 0.15)
		transition: all .3s ease

	.modal-wrapper
		width: 700px
		height: 100%
		margin: auto
		padding: 8%

	.modal-container
		padding: 20px
		background-color: #fff
		border-radius: 2px
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2)
		transition: all .3s ease

	.modal-header
		margin-top: 0
		position: relative
		.modal-close-button
			color: #42b983
			position: absolute
			top: -8px
			right: -8px
			font-size: 18px
			font-weight: bold
			background: transparent
			border: none
			font-family: Tahoma
			&:focus, &:hover, &:active
				color: darken(#42b983, 20%)
				outline: none

	.modal-body
		margin: 20px 0
		text-align: center
		img
			width: 100%
</style>