<template>
  <div class="logininside">
      <div class="columns is-desktop is-centered">
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="user.email" class="input" type="text" required="required" placeholder="Email" >
              </div>
            </div>


            <div class="field is-grouped">
              <div class="control">
                <button v-if="user.email === ''" variant="succes" class="button is-link" disabled>Send me a new password</button>
                <button v-if="user.email" variant="succes" class="button is-link" @click="forgetPass()">Send me a new password</button>
              </div>

            </div>
		      </div>
	    </div>
   </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Forgot',
  components: {
  },

  data() {
    return {
      user: {
          email: '',

      }
    };
  },

  computed: {

  },

  methods: {
    async forgetPass(){
      let response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/forgotpassword?email=" + this.user.email)
      await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          autoHideDelay: 100
        });
    }


  }

}
</script>


<style scoped>
.label{
  font-weight: 400;
}

</style>
