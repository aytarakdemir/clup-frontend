<template>
  <div class="logininside">
    <div class="columns is-desktop is-centered" style="text-align: center">
			<div class="column is-one-quarter" >
				<h1 style="font-weight: 300">Select Register Type</h1>
			</div>
		</div>
    
    <br>
    <div class="columns is-desktop is-centered">
      <div class="column is-one-quarter">
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link is-light">
              <router-link to="/loginpage/customer-register">Customers</router-link>
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light">
              <router-link to="/loginpage/company-register">Company</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  components: {
  }
}
</script>


<style scoped>

.control{
  width: 50%;
}
.button
{
  width: 100%;
}

</style>
