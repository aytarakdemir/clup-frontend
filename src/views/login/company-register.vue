<template>
    <div class="logininside">
		<div class="columns is-desktop is-centered" >
			<div class="column is-one-quarter" >
				<h1>Store Owner Register</h1>
			</div>
		</div>
        <div class="columns is-desktop is-centered">
            <div class="column is-one-quarter">
				<div class="field">
					<label class="label">Name</label>
					<div class="control">
						<input v-model="newCompany.name" class="input" type="text" placeholder="Name">
					</div>
				</div>

				<div class="field">
					<label class="label">Surname</label>
					<div class="control">
						<input v-model="newCompany.surname" class="input" type="text" placeholder="Surname">
					</div>
				</div>

				<div class="field">
					<label class="label">Email</label>
					<div class="control">
						<input v-model="newCompany.email" class="input" type="text" placeholder="Email@example.com">
					</div>
				</div>

				<div class="field">
					<label class="label">Phone</label>
					<div class="control">
						<input v-model="newCompany.phone" class="input" type="text" placeholder="Phone number">
					</div>
				</div>

				<div class="field">
					<label class="label">Username</label>
					<div class="control">
						<input v-model="newCompany.username" class="input" type="text" placeholder="Username">
					</div>
				</div>

				<div class="field">
					<label class="label">Company Name</label>
					<div class="control">
						<input v-model="newCompany.company_name" class="input" type="text" placeholder="Company Name">
					</div>
				</div>

				<div class="field">
					<label class="label">Password</label>
					<div class="control">
						<input v-model="newCompany.password" class="input" type="password" placeholder="Password">
					</div>
				</div>

				<div class="field is-grouped">
					<div class="control">
						<button v-if="newCompany.name === '' || newCompany.surname === '' || newCompany.email === '' ||
									  newCompany.phone === '' || newCompany.username === '' || newCompany.company_name  === '' ||
									  newCompany.password === ''" class="button is-link" disabled>Sign Up</button>
						<button v-if="newCompany.name && newCompany.surname  && newCompany.email && newCompany.phone &&
									  newCompany.username && newCompany.company_name && newCompany.password" variant="succes" class="button is-link" @click="submitNewCompany('success')">Sign Up</button>
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
      newCompany: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        username: '',
        company_name: '',
        password: ''
      }
    };
  },

  computed: {
  },

  methods: {
	...mapActions(['sendNewCompany']),
     async submitNewCompany() {
		try {
			this.sendNewCompany(this.newCompany);
			console.log(this.newCompany);
			setTimeout(() => {
				router.push({name: "Login"})
			}, 1500);
		} catch (error) {
			console.log(this.newCompany)
		}
    }
  }
} 
</script>

<style scoped></style>
