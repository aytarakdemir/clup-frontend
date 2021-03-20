<template>

  <div class="loginhome">
    <TopBar />
    <div class="loginWrapper">
      <header>
        <div>
          <b-jumbotron style="text-align: center">
            <template #header>Customer Line-up</template>

            <template #lead>
              An application to optimize shopping habits for the sake of public health.
            </template>

            <hr class="my-4">

            <p>
              Log in or register to create an appointment.
            </p>
            <b-button-group size="lg">
              <b-button squared variant="outline-secondary" to="/loginpage/">Login</b-button>
              <b-button squared variant="outline-secondary" to="/loginpage/register">Sign Up</b-button>
            </b-button-group>
          </b-jumbotron>
        </div>
      </header>

      <router-view />

    </div>


  </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  name: 'loginpage',
  components: {
    TopBar
  }
}
</script>

<style scoped>

.loginLogo {
  font-size: 60px;
}

.loginWrapper{
  margin-top: 30px;
}


</style>
