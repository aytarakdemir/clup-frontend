<template>
  <div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Stores</h2>
      <div class="btn-toolbar mb-3" role="toolbar" arial-label="Toolbar with button groups">
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary ">
            <router-link to="/storeowner/addStore">Add Store</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/listStore">List Store</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/searchStore">Search Store</router-link>
          </button>
        </div>
      </div>
    </div>
    <div class="inside">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h2>Add new store</h2>
            <div id="storeInformationForCustomer">

              <b-form-group id="input-group-5" label="Location" label-for="input1">
                <b-form-input
                  v-model="location"
                  required
                ></b-form-input> 
              </b-form-group>
              <b-form-group id="input-group-5" label="Capacity" label-for="input1">
                <b-form-input
                  v-model="capacity"
                  required
                ></b-form-input> 
              </b-form-group>
              <b-form-group id="input-group-5" label="Open Days" label-for="input-2">
                <b-form-checkbox-group
                  v-model="open_days"
                  :options="days"
                  required
                ></b-form-checkbox-group>
              </b-form-group>
              <b-form-group id="input-group-5" label="Opening Hour" label-for="input-3">
                <b-form-select
                  v-model="opening_hour"
                  :options="hours"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group id="input-group-5" label="Closing Hour " label-for="input-4">
                <b-form-select
                  v-model="closing_hour"
                  :options="hours"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group id="input-group-5" label="Time Slot Length" label-for="input-5">
                <b-form-select
                  v-model="time_slot_length"
                  :options="time_slot_lengths"
                  required
                ></b-form-select>
              </b-form-group>

              <b-button v-if="location === '' || capacity === '' || open_days === [] || opening_hour === '' || 
                              closing_hour === '' || time_slot_length === ''" 
                            squared variant="outline-secondary" disabled>Save Store</b-button>
              <b-button v-if="location && capacity && open_days && opening_hour && closing_hour && time_slot_length" 
                            squared variant="outline-secondary" @click=addStore(user_id)><strong>Save Store</strong></b-button>
              <b-button squared variant="danger" @click=cancel()>Cancel</b-button>
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

      user_id: null,

      //Goes to time slot form
      location: '',
      capacity: '',
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
              "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      time_slot_lengths: ["00:10", "00:15", "00:20","00:25", "00:30"],
      opening_hour: '',
      closing_hour: '',
      open_days: [],
      time_slot_length: ''

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
    addStore: async function(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/addstore?user_id="
        + this.user_id + "&location="
        + this.location + "&capacity="
        + this.capacity + "&open_days="
        + this.open_days + "&opening_hour="
        + this.opening_hour + "&closing_hour="
        + this.closing_hour + "&time_slot_length="
        + this.time_slot_length);
        console.log(response.data.message);
        await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          authoHideDelay: 10
        });
        this.location = '',
        this.capacity = '',
        this.opening_hour = '',
        this.closing_hour = '',
        this.open_days = [],
        this.time_slot_length = ''
    },

    cancel: function(){
      this.location = '',
      this.capacity = '',
      this.opening_hour = '',
      this.closing_hour = '',
      this.open_days = [],
      this.time_slot_length = ''
    }
  },

  beforeMount() {
    this.user_id = this.userMessage.user_id

  },

}

</script>

<style scoped>


</style>