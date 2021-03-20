<template>
  <div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Schedules</h2>
    </div>
    <div class="inside">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h2>Select store</h2>
            <div id=StoreListForCustomer>
              <br>
              <h2 v-if="this.store.names.length === 0">You don't have any store</h2>
            </div>
          </b-col>
          <b-col>
            <div id="storeInformationForCustomer">
              <h2>Select Schedule Specifications</h2>
              <h4>Selected Store</h4>
              <h5>Store Name: {{chosen_store.name}}</h5>
              <h5>Store Location: {{chosen_store.location}}</h5>

              <b-form-group id="input-group-5" label="Open Days" label-for="input-2">
                <b-form-checkbox-group
                  v-model="chosen_store.open_days"
                  :options="days"
                  required
                ></b-form-checkbox-group>
              </b-form-group>
              <b-form-group id="input-group-5" label="Opening Hour" label-for="input-3">
                <b-form-select
                  v-model="chosen_store.opening_hour"
                  :options="hours"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group id="input-group-5" label="Closing Hour " label-for="input-4">
                <b-form-select
                  v-model="chosen_store.closing_hour"
                  :options="hours"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group id="input-group-5" label="Time Slot Length" label-for="input-5">
                <b-form-select
                  v-model="chosen_store.time_slot_length"
                  :options="time_slot_lengths"
                  required
                ></b-form-select>
              </b-form-group>

              <b-button squared variant="outline-secondary" @click=modifySchedule(user_id)>Modify Schedule</b-button>
            </div>

          </b-col>
        </b-row>
      </b-container>

    </div>
  </div>
</template>

<script>
//import CustomText from '@/components/CustomText'

import axios from "axios";
import { mapState } from "vuex";
//import { mapActions } from "vuex";


export default {
  name: 'CustomerStores',
  components: {
    
  },
  data() {

    return {
      store: {
        names: [],
        locations: [],
        open_days: [],
        opening_hours: [],
        closing_hours: [],
        time_slot_lengths: [],
        schedule_ids: [],
        store_ids: []
      },
      chosen_store: {
        name: null,
        location: null,
        open_days: [],
        opening_hour: null,
        closing_hour: null,
        time_slot_length: null,
        schedule_id: null,
        store_id: null
      },

      user_id: null,

      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
              "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      time_slot_lengths: ["00:10", "00:15", "00:20","00:25", "00:30"],

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
    async getStoreListForStoreowner(user_id) {
      console.log(this.user_id)
      const response = await axios.get('https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/mystores?user_id=' + user_id)
      this.store.names = response.data.stores.map(x=>x.name)
      this.store.locations = response.data.stores.map(x=>x.location)
      this.store.open_days = response.data.stores.map(x=>x.open_days)
      this.store.opening_hours = response.data.stores.map(x=>x.opening_hour)
      this.store.closing_hours = response.data.stores.map(x=>x.closing_hour)
      this.store.time_slot_lengths = response.data.stores.map(x=>x.time_slot_length)
      this.store.schedule_ids = response.data.stores.map(x=>x.schedule_id)
      this.store.store_ids = response.data.stores.map(x=>x.store_id)
      this.createList()
    },


    createList: function(){
      let listContainer = document.getElementById('StoreListForCustomer')
      // Make the list
      let listElement = document.createElement('ul')
      listElement.id = 'StoreListItemWrapper'
      // Set up a loop that goes through the items in listItems one at a time
      let numberOfListItems = this.store.names.length
      let listItem
      let listItemDiv
      let i

      // Add it to the page
      listContainer.appendChild(listElement)

      for (i = 0; i < numberOfListItems; ++i) {
        // Create an item for each one
        listItem = document.createElement('li')
        listItem.classList.add('StoreListItemLi')

        // Put a div inside li
        listItemDiv = document.createElement('div')
        listItemDiv.classList.add('storeListItem')
        listItemDiv.id = i;

        // Fill div
        listItem.appendChild(listItemDiv)
        let list_store_name = document.createElement('h2')
        listItemDiv.appendChild(list_store_name)
        let list_location = document.createElement('p')
        listItemDiv.appendChild(list_location)
        let list_schedule = document.createElement('p')
        listItemDiv.appendChild(list_schedule)
        let list_hours = document.createElement('p')
        listItemDiv.appendChild(list_hours)

        // Add the item text
        list_store_name.innerHTML = this.store.names[i]
        list_location.innerHTML = this.store.locations[i]
        list_schedule.innerHTML = this.store.open_days[i]
        list_hours.innerHTML = this.store.opening_hours[i] + ' - ' + this.store.closing_hours[i]

        // Add listItem to the listElement
        listElement.appendChild(listItem)
      }

      let buttonStore = document.querySelectorAll(".storeListItem");
      let self = this;

      for(let i = 0; i < buttonStore.length; i++)
      {
        buttonStore[i].addEventListener('click', function(){
          self.chosen_store.name = self.store.names[i];
          self.chosen_store.location = self.store.locations[i];
          self.chosen_store.open_days = self.store.open_days[i].split(",");
          self.chosen_store.opening_hour = self.store.opening_hours[i];
          self.chosen_store.closing_hour = self.store.closing_hours[i];
          self.chosen_store.time_slot_length = self.store.time_slot_lengths[i];
          self.chosen_store.schedule_id = self.store.schedule_ids[i];
          self.chosen_store.store_id = self.store.store_ids[i];

        });
      }
    },

    modifySchedule: async function(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/modifyschedule?user_id="
        + this.user_id + "&store_id="
        + this.chosen_store.store_id + "&open_days="
        + this.chosen_store.open_days + "&opening_hour="
        + this.chosen_store.opening_hour + "&closing_hour="
        + this.chosen_store.closing_hour + "&time_slot_length="
        + this.chosen_store.time_slot_length);
        console.log(response.data.message);
        await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          authoHideDelay: 10
        });
        this.refreshList()
    },

    refreshList: function(){

      let listContainer = document.getElementById('StoreListItemWrapper')
      listContainer.parentNode.removeChild(listContainer)
      this.getStoreListForStoreowner(this.user_id)

    }

  },

  beforeMount() {
    this.user_id = this.userMessage.user_id
    this.getStoreListForStoreowner(this.user_id)

  },

}

</script>

<style scoped>

.bv-example-row{
  margin: 0;
  max-width: 100%;

}

</style>
