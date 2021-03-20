<template>
  <div class="home">
    <TopBar />
    <SidePanelStore />

    <div class="middleWrapper">
      <div class="insideHeaderWrapper">
        <h2 class="insedeHeader">Stores</h2>
        
      </div>
      <div class="outside">
        <br>
        <br>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <h2>Select store</h2>
              <div id=StoreListForCustomer>
              </div>
            </b-col>
            <b-col>
              <div id="storeInformationForCustomer">
                <h2>Select Store Specifications</h2>
                <h4>Selected Store</h4>
                <h5>Company Name: {{chosen_store.company_name}}</h5>
                <br>
                <h5>Store Location: {{chosen_store.location}}</h5>
                <h5>Store Capacity: {{chosen_store.capacity}}</h5>
                <b-button v-if="chosen_store.store_id === ''" squared variant="outline-secondary" disabled>Approve Store</b-button>
                <b-button v-if="chosen_store.store_id" squared variant="outline-secondary" @click=approveStore(user_id)>Approve Store</b-button>
              </div>

            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import SidePanelStore from '@/components/SidePanelAdmin'
import axios from "axios";
import { mapState } from "vuex";


export default {
  name: 'CustomerStores',
  components: {
    TopBar,
    SidePanelStore
    
  },
  data() {
    return {
      store: {
        company_names: [],
        locations: [],
        capacities: [],
        store_ids: []
      },
      chosen_store: {
        company_name: '',
        location: '',
        capacity: '',
        store_id: ''
      },

      user_id: null,

    };
  },
  computed: {
    ...mapState(['userMessage']),
  },

  methods: {
    async getStoreListForAdmin(user_id) {
      console.log(this.user_id)
      const response = await axios.get('https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/waitingapprovals?user_id=' + user_id)
      this.store.company_names = response.data.stores.map(x=>x.company_name)
      this.store.store_ids = response.data.stores.map(x=>x.store_id)
      this.store.locations = response.data.stores.map(x=>x.location)
      this.store.capacities = response.data.stores.map(x=>x.capacity)
      this.createList()
    },


    createList: function(){
      let listContainer = document.getElementById('StoreListForCustomer')
      // Make the list
      let listElement = document.createElement('ul')
      listElement.id = 'StoreListItemWrapper'
      // Set up a loop that goes through the items in listItems one at a time
      let numberOfListItems = this.store.company_names.length
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
        let list_company_name = document.createElement('h2')
        listItemDiv.appendChild(list_company_name)
        let list_store_id = document.createElement('p')
        listItemDiv.appendChild(list_store_id)
        let list_location = document.createElement('p')
        listItemDiv.appendChild(list_location)
        let list_capacity = document.createElement('p')
        listItemDiv.appendChild(list_capacity)

        // Add the item text
        list_company_name.innerHTML = this.store.company_names[i]
        list_store_id.innerHTML = this.store.store_ids[i]
        list_location.innerHTML = this.store.locations[i]
        list_capacity.innerHTML = this.store.capacities[i]


        // Add listItem to the listElement
        listElement.appendChild(listItem)
      }

      let buttonStore = document.querySelectorAll(".storeListItem");
      let self = this;

      for(let i = 0; i < buttonStore.length; i++)
      {
        buttonStore[i].addEventListener('click', function(){
          self.chosen_store.company_name = self.store.company_names[i];
          self.chosen_store.location = self.store.locations[i];
          self.chosen_store.capacity = self.store.capacities[i];
          self.chosen_store.store_id = self.store.store_ids[i];
        });
      }
    },

    approveStore: async function(){
      const response = await axios.post("https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/approvestore?user_id="
        + this.user_id + "&store_id="
        + this.chosen_store.store_id);
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
      this.getStoreListForAdmin(this.user_id)

    }

  },

  beforeMount() {
    this.user_id = this.userMessage.user_id
    this.getStoreListForAdmin(this.user_id)

  },

}

</script>

<style scoped>

.bv-example-row{
  margin: 0;
  max-width: 100%;

}


</style>