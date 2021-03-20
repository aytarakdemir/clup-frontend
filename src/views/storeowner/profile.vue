<template>
  <div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Profile</h2>
    </div>
    <div class="inside">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h2>Store Owner Profile</h2>
            <div id="storeInformationForCustomer">

              <b-form-group id="input-group-5" label="Name" label-for="input1">
                <b-form-input
                  v-model="user_info.name"
                  :options="user_info.name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-5" label="Surname" label-for="input2">
                <b-form-input
                  v-model="user_info.surname"
                  :options="user_info.surname"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-5" label="phone" label-for="input3">
                <b-form-input
                  v-model="user_info.phone"
                  :options="user_info.phone"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-5" label="Email" label-for="input4">
                <b-form-input
                  v-model="user_info.email"
                  :options="user_info.email"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-5" label="Username" label-for="input5">
                <b-form-input
                  v-model="user_info.username"
                  :options="user_info.username"
                  required
                ></b-form-input>
              </b-form-group>


              <b-button squared variant="outline-secondary" @click=updateProfile(user_id)>Update Profile</b-button>

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
        user_info: {
            name: null,
            surname: null,
            phone: null,
            email: null,
            username: null
        },

        user_id: null,

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
    async getUser(user_id) {
        const response = await axios.get("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/myaccountinfo?user_id="+user_id)
        this.user_info.name = response.data.user_info.map(x=>x.name)[0]
        this.user_info.surname = response.data.user_info.map(x=>x.surname)[0]
        this.user_info.phone = response.data.user_info.map(x=>x.phone)[0]
        this.user_info.email = response.data.user_info.map(x=>x.email)[0]
        this.user_info.username = response.data.user_info.map(x=>x.username)[0]


    },
    updateProfile: async function(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/editmyaccount?user_id="
        + this.user_id + "&name="
        + this.user_info.name + "&surname="
        + this.user_info.surname + "&phone="
        + this.user_info.phone + "&email="
        + this.user_info.email + "&username="
        + this.user_info.username);
        console.log(response.data.message);
        await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          authoHideDelay: 10
        });

    }

  },

  beforeMount() {
    this.user_id = this.userMessage.user_id
    this.getUser(this.user_id)

  },

}

</script>

<style scoped>


</style>