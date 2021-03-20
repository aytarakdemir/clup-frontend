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
            <h2>Searched store</h2>
            <div id=StoreListForCustomer>
              <br>
              <h2 v-if="this.store.names.length === 0">You haven't searched yet</h2>
            </div>
          </b-col>
          <b-col>
            <div id="storeInformationForCustomer">
              <h2>Search Store</h2>

              <b-form-group id="input-group-5" label="Location" label-for="input1">
                <b-form-input
                  v-model="location"
                  required
                ></b-form-input> 
              </b-form-group>
              <b-button v-if="location === ''" squared variant="outline-secondary" disabled>Search</b-button>
              <b-button v-if="location" squared variant="outline-secondary" @click=searchStore(location)><strong>Search</strong></b-button>
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

      user_id: null,
      location: ''

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
    async searchStore(location) {
      console.log(this.user_id)
      const response = await axios.get('https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/searchstore?user_id='
      + this.user_id + '&query='
      +location)
      this.store.names = response.data.stores.map(x=>x.name)
      this.store.locations = response.data.stores.map(x=>x.location)
      this.store.open_days = response.data.stores.map(x=>x.open_days)
      this.store.opening_hours = response.data.stores.map(x=>x.opening_hour)
      this.store.closing_hours = response.data.stores.map(x=>x.closing_hour)
      this.store.time_slot_lengths = response.data.stores.map(x=>x.time_slot_length)
      this.store.schedule_ids = response.data.stores.map(x=>x.schedule_id)
      this.store.store_ids = response.data.stores.map(x=>x.store_id)
      this.store.my_stores = response.data.stores.map(x=>x.my_store)
      console.log(this.store.my_stores)
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
      
    },
    refreshList: function(){

      let listContainer = document.getElementById('StoreListItemWrapper')
      listContainer.parentNode.removeChild(listContainer)
      this.getStoreListForStoreowner(this.user_id)

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