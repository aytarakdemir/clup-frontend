<template>
    <div class="logininside">
		<div class="columns is-desktop is-centered" >
			<div class="column is-one-quarter" >
				<h1>Customer Register</h1>
			</div>
		</div>
		<br>
		<div class="columns is-desktop is-centered">
			<div class="column is-one-quarter">
				<div class="field">
					<label class="label">Name</label>
					<div class="control">
						<input v-model="newCustomer.name" class="input" type="text" placeholder="Name" required="required">
					</div>
				</div>

				<div class="field">
					<label class="label">Surname</label>
					<div class="control">
						<input v-model="newCustomer.surname" class="input" type="text" placeholder="Surname">
					</div>
				</div>

				<div class="field">
					<label class="label">Email</label>
					<div class="control">
						<input v-model="newCustomer.email" class="input" type="text" placeholder="Email@example.com">
					</div>
				</div>

				<div class="field">
					<label class="label">Phone</label>
					<div class="control">
						<input v-model="newCustomer.phone" class="input" type="text" placeholder="Phone number">
					</div>
				</div>

				<div class="field">
					<label class="label">Username</label>
					<div class="control">
						<input v-model="newCustomer.username" class="input" type="text" placeholder="Username">
					</div>
				</div>

				<div class="field">
					<label class="label">Password</label>
					<div class="control">
						<input v-model="newCustomer.password" class="input" type="password" placeholder="Password">
					</div>
				</div>

				<div class="field is-grouped">
					<div class="control">
						<button v-if="newCustomer.name === '' || newCustomer.surname === '' || newCustomer.email === '' ||
									  newCustomer.phone === '' || newCustomer.username === '' || newCustomer.password === ''"
									  class="button is-link" disabled>Sign Up</button>
						<button v-if="newCustomer.name && newCustomer.surname && newCustomer.email && newCustomer.phone &&
									  newCustomer.username && newCustomer.password" variant="succes" class="button is-link" @click="submitNewCustomer('success')">Sign Up</button>
					</div>
					<div class="control">
						<button class="button is-link is-light">Cancel</button>
					</div>
				</div>
			</div>
		</div>
		<br><br>
    </div>
            

</template>

<script>
import {mapActions} from 'vuex'
import router from "@/router"

export default {
  name: 'Register',
  components: {
  },

  data() {
    return {
		newCustomer: {
			name: '',
			surname: '',
			email: '',
			phone: '',
			username: '',
			password: ''
      }
    };
  },

  computed: {
    disableIfOneOfFieldsIsEmpty () {
		return Object.values(this.newCustomer).some(
			value => value == null || (Array.isArray(value) && value.length() === 0)
      )
    }
  },

  methods: {
	  ...mapActions(['sendNewCustomer']),
      async submitNewCustomer() {
		  try {
		  	this.sendNewCustomer(this.newCustomer);
			  console.log(this.newCustomer);
			  setTimeout(() => {
				  router.push({name: "Login"})
			  }, 1500);
		  } catch (error) {
			  console.log(this.newCustomer)
		  }
    }
  }
} 
</script>

<style scoped></style>
