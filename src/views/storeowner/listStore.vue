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
            <h2>Select store</h2>
            <!--
            <b-row>
              <b-col>
                <b-form-group id="input-group-5" label="" label-for="input1">
                  <b-form-input
                    v-model="location"
                    required
                  ></b-form-input> 
                </b-form-group>
              </b-col>
              <b-col>
                <b-button v-if="location === ''" squared variant="outline-secondary" disabled>Search</b-button>
                <b-button v-if="location" squared variant="outline-secondary" @click=searchstore()><strong>Search</strong></b-button>
              </b-col>
            </b-row>
            -->
            <div id=StoreListForCustomer>
              <br>
              <h2 v-if="this.store.names.length === 0">You don't have any store</h2>
            </div>
          </b-col>
          <b-col>
            <div id="storeInformationForCustomer">
              <h2>Select Store Specifications</h2>
              <h4>Selected Store</h4>
              <h5>Store Name: {{chosen_store.name}}</h5>
              <h5>Store Location: {{chosen_store.location}}</h5>

              <b-form-group id="input-group-5" label="Capacity" label-for="input1">
                <b-form-input
                  v-model="capacity"
                  required
                ></b-form-input> 
              </b-form-group>
              <b-button v-if="capacity === ''" squared variant="outline-secondary" disabled>Modify Store</b-button>
              <b-button v-if="capacity" squared variant="outline-secondary" @click=modifyStore(user_id)><strong>Modify Store</strong></b-button>
              <b-button v-if="chosen_store.name === null" squared variant="danger" disabled>Delete Store</b-button>
              <b-button v-if="chosen_store.name" squared variant="danger" @click=deleteStore()>Delete Store</b-button>
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
      store: {
        names: [],
        locations: [],
        open_days: [],
        opening_hours: [],
        closing_hours: [],
        time_slot_lengths: [],
        schedule_ids: [],
        store_ids: [],
        my_stores: []
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
      search_store: {
        names: [],
        locations: [],
        open_days: [],
        opening_hours: [],
        closing_hours: [],
        time_slot_lengths: [],
        schedule_ids: [],
        store_ids: [],
        my_stores: []
      },

      user_id: null,
      location: '',

      capacity: '',
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
              "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      time_slot_lengths: ["00:10", "00:15", "00:20","00:25", "00:30"],
      opening_hour: null,
      closing_hour: null,
      open_days: [],
      time_slot_length: null
    
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
      let i
      for (i = 0; i < this.store.names.length; i++) {
        this.store.my_stores[i] = "True"
      }
      console.log(this.store.my_stores)
      //this.store.my_stores = response.data.stores.map(x=>x.my_store)
      this.createList()
    },

    async searchStore(location) {
      console.log(this.user_id)
      const response = await axios.get('https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/searchstore?user_id='
      + this.user_id + '&query='
      +location)
      this.names = []
      this.locations = []
      this.open_days = []
      this.opening_hours = []
      this.closing_hours = []
      this.time_slot_lengths = []
      this.schedul_ids = []
      this.my_stores = []
      this.search_store.names = response.data.stores.map(x=>x.name)
      this.search_store.locations = response.data.stores.map(x=>x.location)
      this.search_store.open_days = response.data.stores.map(x=>x.open_days)
      this.search_store.opening_hours = response.data.stores.map(x=>x.opening_hour)
      this.search_store.closing_hours = response.data.stores.map(x=>x.closing_hour)
      this.search_store.time_slot_lengths = response.data.stores.map(x=>x.time_slot_length)
      this.search_store.schedule_ids = response.data.stores.map(x=>x.schedule_id)
      this.search_store.my_stores = response.data.stores.map(x=>x.my_store)
      console.log(this.search_store.my_stores)
      console.log(this.search_store.my_stores.length)
      let m
      m = 0
      for (let k = 0; k < this.search_store.my_stores.length; ++k) {
        console.log(this.search_store.my_stores[k]);
        if (this.search_store.my_stores[k] == "True") {
          console.log("hello");
          this.names[m] = this.search_store.names[k];
          this.locations[m] = this.search_store.locations[k];
          this.open_days[m] = this.search_store.open_days[k];
          this.opening_hours[m] = this.search_store.opening_hours[k];
          this.closing_hours[m] = this.search_store.closing_hours[k];
          this.time_slot_lengths[m] = this.search_store.time_slot_lengths[k];
          this.schedule_ids[m] = this.search_store.schedule_ids[k];
          this.my_stores[m] = this.search_store.my_stores[k];
          m = m + 1;
        }
      }
      console.log(this.names[0])
      let i
      let j
      j = 0
      console.log(this.store.names.length)
      for (i = 0; i < this.store.names.length; ++i) {
        if (this.store.locations[i] == location && this.store.my_stores[i] == "True") {
          console.log(j)
          this.search_store.store_ids[j] = this.store.store_ids[i]
          j = j + 1
        }

      }
      this.store.names = this.search_store.names
      console.log(this.store.names)
      this.store.locations = this.search_store.locations
      this.store.open_days = this.search_store.open_days
      this.store.opening_hours = this.search_store.opening_hours
      this.store.closing_hours = this.search_store.closing_hours
      this.store.time_slot_lengths = this.search_store.time_slot_lengths
      this.store.schedule_ids = this.search_store.schedule_ids
      this.store.store_ids = this.search_store.store_ids

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
        if (this.store.my_stores[i] == "True") {
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
      }

      let buttonStore = document.querySelectorAll(".storeListItem");
      let self = this;

      for(let i = 0; i < buttonStore.length; i++)
      {
        buttonStore[i].addEventListener('click', function(){
          self.chosen_store.name = self.store.names[i];
          self.chosen_store.location = self.store.locations[i];
          self.chosen_store.open_days = self.store.open_days[i];
          self.chosen_store.opening_hour = self.store.opening_hours[i];
          self.chosen_store.closing_hour = self.store.closing_hours[i];
          self.chosen_store.time_slot_length = self.store.time_slot_lengths[i];
          self.chosen_store.schedule_id = self.store.schedule_ids[i];
          self.chosen_store.store_id = self.store.store_ids[i];
          console.log(self.chosen_store.store_id)
          this.location = self.store.locations[i]
          this.open_days = self.store.open_days[i]
          this.opening_hour = self.store.opening_hours[i]
          this.closing_hour = self.store.closing_hours[i]
          this.time_slot_length = self.store.time_slot_lengths[i]
        });
      }
    },

    modifyStore: async function(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/modifystore?user_id="
        + this.user_id + "&store_id="
        + this.chosen_store.store_id + "&capacity="
        + this.capacity);
        console.log(response.data.message);
        await this.$bvToast.toast(response.data.message,
        {
          variant: "success",
          solid: true,
          authoHideDelay: 10
        });

    },

    deleteStore: async function(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/deletestore?user_id=" + this.user_id + 
                 "&store_id=" + this.chosen_store.store_id);
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
    },

    searchstore: function(){

      let listContainer = document.getElementById('StoreListItemWrapper')
      listContainer.parentNode.removeChild(listContainer)
      this.searchStore(this.location)

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