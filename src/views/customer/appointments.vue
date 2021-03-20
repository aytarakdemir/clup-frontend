<template>
  <div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Appointments</h2>
    </div>
    <div class="inside">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h2>Select Appointment</h2>
            <h5 style="font-weight: 200">{{no_appointment}}</h5>
            <div id="appointmentListWrapper">
            </div>
          </b-col>


          <b-col>
            <h2>Appointment Information</h2>
            <h5>Details: {{appointed_store.name}}  - {{appointed_store.location}}: {{integerToTime(chosen_appointment.start_hour)}} - {{integerToTime(chosen_appointment.end_hour)}}</h5>
            <h5>Open days: {{appointed_store.open_days}}</h5>
            <h4>Modify Appointment</h4>


            <b-form-datepicker v-model="date" :min="min" :max="max"></b-form-datepicker>

            <b-form-group id="input-group-3" label="Time Slot:" label-for="input-3">
              <b-form-select
                v-model="selected_time_slot"
                :options="time_slots_form_input"
                required
              ></b-form-select>
            </b-form-group>

            <b-button squared variant="outline-secondary" @click=postModifyAppointment() :disabled="date == null || selected_time_slot == null ">Modify Appointment</b-button>
            <b-button squared variant="danger" @click=deleteAppointment()>Delete Appointment</b-button>



          </b-col>
        </b-row>
      </b-container>






    </div>
  </div>
</template>

<script>


import axios from "axios";
import {mapState} from 'vuex'


export default {
  name: 'CustomerAppointments',
  components: {
  },
  data() {
    // Setting the min and max dated for schedules
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const seven_days_later = new Date(today.getTime() + 7*1000*60*60*24);
    const minDate = new Date(today)
    const maxDate = new Date(seven_days_later)

    return{
      appointment: {
        id: [],
        date: [],
        start_hour: [],
        end_hour: [],
        customer: [],
        address: [],
        schedule_id: [],
        store_id: [],
        code: []
      },
      chosen_appointment: {
        id: null,
        date: null,
        start_hour: null,
        end_hour: null,
        customer: null,
        address: null,
        schedule_id: null,
        store_id: null,
        code: null
      },

      store: {
        names: [],
        locations: [],
        open_days: [],
        opening_hours: [],
        closing_hours: [],
        time_slot_lengths: [],
        schedule_ids: []
      },
      appointed_store: {
        name: null,
        location: null,
        open_days: null,
        opening_hour: null,
        closing_hour: null,
        time_slot_length: null,
        schedule_id: null
      },

      //Goes to datepicker
      min: minDate,
      max: maxDate,
      //Returns from datepicker
      date: null,


      no_appointment: "You have no appointments scheduled",

      time_slots: [],
      time_slots_form_input: [],
      selected_time_slot: null,

      user_id: null,
    }
  },


  computed: {
    ...mapState(['userMessage']),

  },

  methods: {
    async getAppointmentListForCustomer(user_id) {
      const response = await axios.get('https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/listappointment?user_id=' + user_id)
      this.appointment.id = response.data.appointment_id.map(x => x)
      this.appointment.date = response.data.date.map(x => x)
      this.appointment.start_hour = response.data.start_hour.map(x => x)
      this.appointment.end_hour = response.data.end_hour.map(x => x)
      this.appointment.customer = response.data.customer.map(x => x)
      this.appointment.address = response.data.address.map(x => x)
      this.appointment.schedule_id = response.data.schedule_id.map(x => x)
      this.appointment.store_id = response.data.store_id.map(x => x)
      this.appointment.code = response.data.code.map(x => x)
      this.createList()
    },

    createList: function() {
      let listContainer = document.getElementById('appointmentListWrapper')
      // Make the list
      let listElement = document.createElement('ul')
      listElement.id = 'appointmentListItemWrapper'
      // Set up a loop that goes through the items in listItems one at a time
      let numberOfListItems = this.appointment.id.length
      let listItem
      let listItemDiv
      let i

      // Add it to the page
      listContainer.appendChild(listElement)

      for (i = 0; i < numberOfListItems; ++i) {
        // Create an item for each one
        listItem = document.createElement('li')
        listItem.classList.add('appointmentListItemLi')

        // Put a div inside li
        listItemDiv = document.createElement('div')
        listItemDiv.classList.add('appointmentListItem')
        listItemDiv.id = i;

        // Fill div
        listItem.appendChild(listItemDiv)
        let list_appo_code = document.createElement('h2')
        listItemDiv.appendChild(list_appo_code)
        let list_appo_address = document.createElement('h4')
        listItemDiv.appendChild(list_appo_address)
        let list_date = document.createElement('p')
        listItemDiv.appendChild(list_date)
        let list_hours = document.createElement('p')
        listItemDiv.appendChild(list_hours)

        // Add the item text
        list_appo_code.innerHTML = "Code: " + this.appointment.code[i]
        list_appo_address.innerHTML = "Location: " + this.appointment.address[i]
        list_date.innerHTML = "Date: " + this.appointment.date[i]
        list_hours.innerHTML = "Timeslot: " + this.appointment.start_hour[i] + ' - ' + this.appointment.end_hour[i]

        this.no_appointment = null



        // Add listItem to the listElement
        listElement.appendChild(listItem)
      }

      let buttonAppointment = document.querySelectorAll(".appointmentListItem");
      let self = this;

      for(let i = 0; i < buttonAppointment.length; i++)
      {
        buttonAppointment[i].addEventListener('click', function() {
          self.chosen_appointment.id = self.appointment.id[i];
          self.chosen_appointment.date = self.appointment.date[i];
          self.chosen_appointment.address = self.appointment.address[i];
          self.chosen_appointment.start_hour = self.timeToInteger(self.appointment.start_hour[i]);
          self.chosen_appointment.end_hour = self.timeToInteger(self.appointment.end_hour[i]);
          self.chosen_appointment.customer = self.appointment.customer[i];
          self.chosen_appointment.schedule_id = self.appointment.schedule_id[i];
          self.chosen_appointment.store_id = self.appointment.store_id[i];
          self.chosen_appointment.code = self.appointment.code[i];

          self.selected_time_slot = null;

          for(let i = 0; i < self.store.schedule_ids.length; i++)
          {
            if(self.store.schedule_ids[i] == self.chosen_appointment.schedule_id)
            {
              self.appointed_store.name = self.store.names[i];
              self.appointed_store.location = self.store.locations[i];
              self.appointed_store.open_days = self.store.open_days[i];
              self.appointed_store.opening_hour = self.timeToInteger(self.store.opening_hours[i]);
              self.appointed_store.closing_hour = self.timeToInteger(self.store.closing_hours[i]);
              self.appointed_store.time_slot_length = self.timeToInteger(self.store.time_slot_lengths[i]);
              self.appointed_store.schedule_id = self.store.schedule_ids[i];
            }
          }


          let ts_len = self.appointed_store.time_slot_length
          let oh = self.appointed_store.opening_hour
          let ch = self.appointed_store.closing_hour

          //Removing elements to prevent appending on the previous one
          self.time_slots.splice(0)
          self.time_slots_form_input.splice(0)


          for (let a = oh; a + ts_len <= ch; a = a + ts_len) {

            let pair = [a, a + ts_len]

            self.time_slots.push(pair)
          }

          for (let b = 0; b < self.time_slots.length; b++)
          {
            self.time_slots_form_input.push(self.integerToTime(self.time_slots[b][0]) + " - " + self.integerToTime(self.time_slots[b][1]))
          }



        })
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


    async getStoreListForCustomer(user_id) {
      const response = await axios.get('https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/liststore?user_id=' + user_id)
      this.store.names = response.data.stores.map(x=>x.name)
      this.store.locations = response.data.stores.map(x=>x.location)
      this.store.open_days = response.data.stores.map(x=>x.open_days)
      this.store.opening_hours = response.data.stores.map(x=>x.opening_hour)
      this.store.closing_hours = response.data.stores.map(x=>x.closing_hour)
      this.store.time_slot_lengths = response.data.stores.map(x=>x.time_slot_length)
      this.store.schedule_ids = response.data.stores.map(x=>x.schedule_id)



    },


    async postModifyAppointment(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/modifyappointment?user_id="
        + this.user_id + "&schedule_id="
        + this.appointed_store.schedule_id + "&date="
        + this.date + "&start_hour="
        + this.selected_time_slot.slice(0, 5) + "&end_hour="
        + this.selected_time_slot.slice(7, 13) + "&appointment_id="
        + this.chosen_appointment.id)
        await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          autoHideDelay: 100
        });
        this.refreshList()


    },

    async deleteAppointment(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/deleteappointment?user_id=" + this.user_id + "&appointment_id=" + this.chosen_appointment.id)
      await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          autoHideDelay: 100
        });
      this.refreshList()
    },

    refreshList: function(){

      let listContainer = document.getElementById('appointmentListItemWrapper')
      listContainer.parentNode.removeChild(listContainer)
      this.getAppointmentListForCustomer(this.user_id)

    }

  },

  beforeMount() {
    this.user_id = this.userMessage.user_id
    this.getAppointmentListForCustomer(this.user_id)
    this.getStoreListForCustomer(this.user_id)

  },

}
</script>



<style scoped>

.bv-example-row {
  margin: 0;
  max-width: 100%;

}



</style>
