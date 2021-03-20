<template>
  <div class="logininside">
      <div class="columns is-desktop is-centered">
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label">Username or email</label>
              <div class="control">
                <input v-model="user.username_or_email" class="input" type="text" required="required" placeholder="Username or email" >
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model="user.password" class="input" type="password" required="required" placeholder="Password">
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button v-if="user.username_or_email === '' || user.password === ''" variant="succes" class="button is-link" disabled>Log In</button>
                <button v-if="user.username_or_email && user.password" variant="succes" class="button is-link" @click="submitUser('success')">Log In</button>
              </div>
              <div class="control">
                <button class="button is-link is-light">Cancel</button>
              </div>
              <div style="margin-top: 7px">
              <router-link to="/loginpage/forgot">I forgot my password.</router-link>
              </div>


            </div>
		      </div>
	    </div>
   </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import router from "@/router"

export default {
  name: 'Login',
  components: {
  },

  data() {
    return {
      user: {
          username_or_email: '',
          password: '',
      }
    };
  },

  computed: {
    ...mapState(['userMessage'])

  },

  methods: {
      ...mapActions(['loginUser']),
      async submitUser() {
          await this.loginUser(this.user)
          console.log(this.userMessage.user_id)
          console.log(this.userMessage.message)

          if (this.userMessage.message == "User login is successful!") {
            router.push({name: "Customer"})
            this.$store.state.isLogged = true
            this.$store.state.isCustomer = true
          } else if (this.userMessage.message == "Company login is successful!") {
            router.push({name: "Owner"})
            this.$store.state.isLogged = true
            this.$store.state.isStoreOwner = true
          } else if (this.userMessage.user_id == 0) {
            router.push({name: "Admin"})
            this.$store.state.isLogged = true
            this.$store.state.isAdmin = true
          } else {
            router.push({name: "Login"})
          }
    }
  }

}
</script>


<style scoped>
.label{
  font-weight: 400;
}

</style>
