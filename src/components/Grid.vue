<template>
	<section class="grid">
		<pagination 
			:current="currentPage" 
			:total="totalPhotos" 
			:per-page="perPage" 
			@page-changed="getAllPhotos">
		</pagination>

		<div class="grid__item card" v-for="photo in photos">
			<div class="card__body">
				<img :src="photo.urls.small" alt="">
			</div>
			<div class="card__footer media">
				<img :src="photo.user.profile_image.small" alt="" class="media__obj">
				<div class="media__body">
					<router-link 
						:app-id="api.key"
						:to="{ name: 'user', params: { username: photo.user.username } }">
						{{ photo.user.name }}
					</router-link>	
			</div>
		</div>
	</div>
</section>

</template>

<script>
import events from '~events'
import config from '~config'
import axios from 'axios'
import Pagination from '~components/Pagination.vue'
import Alert from '~components/Alert.vue'

export default {
	name: 'Grid',
	components: {
		Pagination,
		Alert
	},
	data() {
		return {
			title: 'Photos',
			photos: [],
			totalPhotos: 0,
			perPage: 9,
			currentPage: 1
		}
	},
	computed: {
		api() {
			return config.api
		},
		app() {
			return config.app
		}
	},
	methods: {
		getAllPhotos: function(page) {
			var options = {
				params: {
					client_id: this.api.key,
					page: page,
					per_page: this.perPage
				}
			}

			axios.get(this.api.photos.endpoint, options)
				.then(response => {
					this.photos = response.data
					this.totalPhotos = parseInt(response.headers['x-total'])
					this.currentPage = page
				})
				.catch(e => {
					events.$emit('error', e) 
				})
		}
	},
	created: function() {
		if (this.$route.params.id)
			this.getAllPhotos(parseInt(this.$route.params.id))
		else
			this.getAllPhotos(this.currentPage)
	}
}
</script>

<style lang="sass">
	.grid
		width: 100%
		max-width: 1280px
		display: flex
		justify-content: space-between
		flex-wrap: wrap
		margin: 0 auto

	.grid__item
		width: 30%
		flex-grow: 1
		flex-shrink: 1
		margin: 0 20px 40px

	.card
		background-color: #fff
		overflow: hidden
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2)
		border-radius: 2px
		line-height: 0
		cursor: pointer
		&:hover
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2)

	.card__body
		width: 100%
		height: 215px
		overflow: hidden
		background-color: #eee
		img
			width: 100%
			height: 100%
			object-fit: cover

	.card__footer
		width: 100%
		padding: 10px 15px

	.media__obj
		width: 32px
		height: 32px
		border-radius: 50%
		background-color: #d8d8d8
		margin-right: 15px
		float: left

	.media__body
		width: 100%
		height: 32px
		line-height: 32px
		a
			font-family: Courier, serif
			font-size: 15px
			color: #999
			&:hover
				text-decoration: none
</style>