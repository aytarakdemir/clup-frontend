<template>
  <div id="AppointList">
    <!--<button id="external-button" @click="loadData()">Load Data</button>-->
    <p>{{loadData()}}</p>
    <!--{{info}}-->
    <button id="external-button" @click="makeList(dates)">Show Data</button>
  </div>
</template>

<script>
//import CustomText from '@/components/CustomText'
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'



export default {
  data() {
    return {
      info: null
    }
  },
  name: 'Appointments',
  components: {
  },

  methods: {
    loadData: function() {
      axios
        .get(
          'https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/listappointment?user_id=1'
        )
        .then(response => this.info = response)
    },
    makeList: function(listData) {
      let listContainer = document.createElement('div')
      // Make the list
      let listElement = document.createElement('ul')
      // Set up a loop that goes through the items in listItems one at a time
      let numberOfListItems = listData.length
      let listItem
      let i

      // Add it to the page
      document.getElementById('AppointList').appendChild(listContainer)
      listContainer.appendChild(listElement)

      for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        listItem = document.createElement('li')

        // Add the item text
        listItem.innerHTML = listData[i]

        // Add listItem to the listElement
        listElement.appendChild(listItem)
      }
    }
  }
}
</script>

<style scoped></style>
