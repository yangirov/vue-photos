<template>
	<div class="user-page">
		<router-link :to="{ name: 'home' }" class="back-link">Назад</router-link>

		<div class="title">
			<div>
				<img :src="profile_photo" :alt="user.name" class="user-photo">
			</div>
			<div>
				<h1>{{ user.name }}</h1>
				<a v-if="user.portfolio_url" :href="user.portfolio_url" target="_blank">Портфолио</a>
			</div>
		</div>

		<div v-if="user.bio" class="bio">
			<p>{{ user.bio }}</p>
		</div>
		
		<div class="grid">
			<pagination 
				:current="currentPage" 
				:total="totalPhotos" 
				:per-page="perPage" 
				@page-changed="getUserPhotos"
			></pagination>

			<div class="grid__item card" v-for="photo in photos">
				<div class="card__body">
					<a :href="'#' + photo.id" 
							@click="openPopup(photo.id)">
						<img :src="photo.urls.small" 
								:alt="photo.description">
					</a>
				</div>

				<modal :id="photo.id" v-show="showModal" @close="closePopup(photo.id)">
					<img 
						:src="photo.urls.full"
						:alt="photo.description"
						slot="image">
				</modal>
			</div>
		</div>
	</div>
</template>

<script>
import events from '~events'
import config from '~config'
import axios from 'axios'
import Pagination from '~components/Pagination.vue'
import Modal from '~components/Modal.vue'

export default {
	name: 'UserPage',
	components: {
		Pagination,
		Modal
	},
	data() {
		return {
			username: this.$route.params.username,
			user: {},
			showModal: false,
			profile_photo: '',
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
		openPopup: function(id) {
			document.getElementById(id).style.display = "block"
		},
		closePopup: function(id) {
			document.getElementById(id).style.display = "none"
			window.history.pushState("", document.title, window.location.pathname);
		},
		getUserInfo: function() {
			var options = {
				params: {
					client_id: this.api.key,
					per_page: this.perPage
				}
			}

			axios.get(this.api.users.endpoint + this.username, options)
				.then(response => {
					this.user = response.data
					this.profile_photo = response.data.profile_image.medium
				})
				.catch(e => {
					console.log(e)
				})
		},
		getUserPhotos: function(page) {
			var options = {
				params: {
					client_id: this.api.key,
					page: page,
					per_page: this.perPage
				}
			}

			axios.get(this.api.users.endpoint + this.username + '/photos', options)
				.then(response => {
					this.photos = response.data
					this.totalPhotos = parseInt(response.headers['x-total'])
					this.currentPage = page
				})
				.catch(e => {
					console.log(e)
				})
		}
	},
	created: function() {
		this.getUserInfo()
		this.getUserPhotos()
	}
}
</script>

<style lang="sass">
	.user-page
		margin: 0 30px
		a
			font-size: 15px
			color: #999
			&:hover
				text-decoration: none
		.title
			max-width: 1280px
			display: flex
			flex-direction: row
			justify-content: start
			align-items: center
			margin: 5px 0
			h1
				margin: 0
			.user-photo
				border-radius: 50%
				margin-right: 10px
	.grid
		margin: 50px auto
		flex-wrap: wrap-reverse
	.bio
		width: 50%
	.back-link
		display: block
		margin-bottom: 20px
</style>