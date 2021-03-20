<template>
  <div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Check Appointment</h2>
      
    </div>
    <div class="inside">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h2>Result of Check</h2>
            <div id=StoreListForCustomer>
              <br>
              <h2 v-if="result.message === ''">You haven't checked yet</h2>
              <h2 v-if="result.message">{{ result.message}}</h2>
            </div>
          </b-col>
          <b-col>
            <div id="storeInformationForCustomer">
              <h2>Check Appointment</h2>

              <b-form-group id="input-group-1" label="Code" label-for="input1">
                <b-form-input
                  v-model="key_code"
                  required
                ></b-form-input> 
              </b-form-group>
              <b-button v-if="key_code === ''" squared variant="outline-secondary" disabled>Check</b-button>
              <b-button v-if="key_code" squared variant="outline-secondary" @click=checkAppointment(key_code)><strong>Check</strong></b-button>
            </div>

          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";


export default {
  name: 'CustomerStores',
  components: {
    
  },
  data() {

    return {
      result: {
        message: '',
        status: ''
      },

      user_id: null,
      key_code: ''

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
      checkAppointment: async function(key_code) {
          const response = await axios.get("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/checkappointment?user_id="
          +this.user_id + "&code="
          +key_code).catch((error) => {
              this.result.message = error.response.data.message;
              this.result.status = error.response.data.status;
          })
          if (response != null) {
          console.log(this.response)
          this.result.message = response.data.message
          console.log(this.result.message)
          this.result.status = response.data.status
          console.log(this.result.status)
          };
          this.key_code = ''
      }


  },
  beforeMount() {
    this.user_id = this.userMessage.user_id

  },

}

</script>

<style scoped>

.bv-example-row{
  margin: 0;
  max-width: 100%;

}


</style>