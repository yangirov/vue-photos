const baseUri = 'https://api.unsplash.com/'
const title = 'Vue.js'

export default {
	app: {
		title: title,
		name: 'Vue.js and Unsplash API',
		description: 'A small project with Vue.js and Unsplash API.',
		author: 'Emil Yangirov',
		github: {
			username: 'yangirov',
			repo: 'yangirov/vue-photos'
		},
	},
	api: {
		key: 'da231653d5e1b8f99f71921209f04feb3c481c193f1e592f96628bf6edbb8977',
		photos: {
			endpoint: baseUri + 'photos/'
		},
		users: {
			endpoint: baseUri + 'users/'
		}
	}
}