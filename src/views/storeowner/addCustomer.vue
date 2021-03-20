
<template>
  <div class="middleWrapper">
    <div class="insideHeaderWrapper">
     <h2 class="insideHeader">Add Customers</h2>
      <div class="btn-toolbar mb-3" role="toolbar" arial-label="Toolbar with button groups">
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary ">
            <router-link to="/storeowner/addCustomer">Add Customer</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/listCustomer">List Customer</router-link>
          </button>
        </div>
      </div>
    </div>
    <div class="inside">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h2>Select store</h2>
            <h5 style="font-weight: 200">{{no_stores}}</h5>
            <div id=StoreListForCustomer>
            </div>
          </b-col>
          <b-col>

            <div id="storeInformationForCustomer">
              <h2>Select time</h2>
              <h4>Selected Store: {{chosen_store.name}} - {{chosen_store.location}}</h4>

            <b-form-datepicker v-model="date" :min="min" :max="max"></b-form-datepicker>


            <b-form-group id="input-group-3" label="Time Slot:" label-for="input-3">
              <b-form-select
                v-model="selected_time_slot"
                :options="time_slots_form_input"
                required
              ></b-form-select>
            </b-form-group>



            <b-button squared variant="outline-secondary" @click=postNewCustomer(user_id) :disabled="date == null || selected_time_slot == null ">Submit</b-button>
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
    // Setting the min and max dated for schedules
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const seven_days_later = new Date(today.getTime() + 7*1000*60*60*24);
    const minDate = new Date(today)
    const maxDate = new Date(seven_days_later)


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
        open_days: null,
        opening_hour: null,
        closing_hour: null,
        time_slot_length: null,
        schedule_id: null,
        store_id: null
      },

      user_id: 4,

      no_stores: "There are no stores listed",

      //Goes to datepicker
      min: minDate,
      max: maxDate,
      //Returns from datepicker
      date: null,

      //Goes to time slot form
      time_slots: [],
      time_slots_form_input: [],
      //Returns from time slot form
      selected_time_slot: null

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
    async getStoreListForCustomer(user_id) {
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
      listElement.classList.add('StoreListItemWrapper')
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

        this.no_stores = null

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
          self.chosen_store.open_days = self.store.open_days[i];
          self.chosen_store.opening_hour = self.timeToInteger(self.store.opening_hours[i]);
          self.chosen_store.closing_hour = self.timeToInteger(self.store.closing_hours[i]);
          self.chosen_store.time_slot_length = self.timeToInteger(self.store.time_slot_lengths[i]);
          self.chosen_store.schedule_id = self.store.schedule_ids[i];
          self.chosen_store.store_id = self.store.store_ids[i];

          self.selected_time_slot = null;


          let ts_len = self.chosen_store.time_slot_length
          let oh = self.chosen_store.opening_hour
          let ch = self.chosen_store.closing_hour

          //Removing elements to prevent appending on the previous one
          self.time_slots.splice(0)
          self.time_slots_form_input.splice(0)


          console.log(ts_len)
          console.log(self.chosen_store.opening_hour)
          console.log(self.chosen_store.closing_hour)


          for (let a = oh; a + ts_len <= ch; a = a + ts_len) {

            let pair = [a, a + ts_len]
            console.log(pair)
            self.time_slots.push(pair)
          }

          for (let b = 0; b < self.time_slots.length; b++)
          {
            self.time_slots_form_input.push(self.integerToTime(self.time_slots[b][0]) + " - " + self.integerToTime(self.time_slots[b][1]))
          }


          //self.time_slots_form_input.concat(self.time_slots)

          console.log(self.time_slots)
          console.log(self.time_slots_form_input)
          console.log(self.selected_time_slot)

        });
      }
    },


    timeToInteger:function(strTime){
       let minutes = ((Number(strTime[0]) * 10 + Number(strTime[1])) * 60) + (Number(strTime[3]) * 10) + Number(strTime[4])
       return minutes
    },


    integerToTime:function(intTime){
      let strTime = ""
      let hours = Math.floor(intTime / 60)
      let minutes = intTime % 60
      if (minutes < 10) {
        strTime = hours + ":0" + minutes
      }
      else
      {
        strTime = hours + ":" + minutes
      }
      return strTime
    },

    postNewCustomer: async function(user_id){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/addcustomer?user_id="
                  + user_id + "&store_id="
                  + this.chosen_store.store_id + "&date="
                  + this.date + "&start_hour="
                  + this.selected_time_slot.slice(0,5) + "&end_hour="
                  + this.selected_time_slot.slice(7,13));
        console.log(response.data.message);
        await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          authoHideDelay: 20
        });
    }

  },

  beforeMount() {
    this.user_id = this.userMessage.user_id
    this.getStoreListForCustomer(this.user_id)

  },

}


</script>

<style scoped>

.bv-example-row{
  margin: 0;
  max-width: 100%;

}


</style>