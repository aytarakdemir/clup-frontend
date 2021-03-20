import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const BaseUrl = 'https://k8zw03qk7l.execute-api.eu-central-1.amazonaws.com/dev/'

export default new Vuex.Store({
  state: {
    userMessage: {},
    isLogged: false,
    isCustomer: false,
    isStoreOwner: false,
    isAdmin: false
  },
  getters: {
    isLogged: state => {
      return state.isLogged
    },
    isCustomer: state => {
      return state.isCustomer
    },
    isStoreOwner: state => {
      return state.isStoreOwner
    },
    isAdmin: state => {
      return state.isAdmin
    }
  },

  actions: {
    sendNewCustomer(store, newCustomer) {
      axios.post(
        BaseUrl +
          'userregistration?username=' +
          newCustomer.username +
          '&password=' +
          newCustomer.password +
          '&name=' +
          newCustomer.name +
          '&surname=' +
          newCustomer.surname +
          '&phone=' +
          newCustomer.phone +
          '&email=' +
          newCustomer.email
      )
    },
    sendNewCompany(store, newCompany) {
      axios.post(
        BaseUrl +
          'companyregistration?username=' +
          newCompany.username +
          '&password=' +
          newCompany.password +
          '&name=' +
          newCompany.name +
          '&surname=' +
          newCompany.surname +
          '&phone=' +
          newCompany.phone +
          '&email=' +
          newCompany.email +
          '&company_name=' +
          newCompany.company_name
      )
    },
    async loginUser(store, user) {
      const res = await axios.get(
        BaseUrl +
          'login?user=' +
          user.username_or_email +
          '&password=' +
          user.password
      )
      this.state.userMessage = res.data
      console.log(this.state.userMessage.user_id)
    },
    
  },

  mutations: {
    
  },

  modules: {}
})
