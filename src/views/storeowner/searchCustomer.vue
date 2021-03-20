<template>
<div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Search Customers</h2>
      <div class="btn-toolbar mb-3" role="toolbar" arial-label="Toolbar with button groups">
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary ">
            <router-link to="/storeowner/addCustomer">Add Customer</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/modifyCustomer">Modify Customer</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/listCustomer">List Customer</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/searchCustomer">Search Customer</router-link>
          </button>
        </div>
        <div class="btn-group mr-5 btn-group-large" role="group">
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/storeowner/deleteCustomer">Delete Customer</router-link>
          </button>
        </div>
      </div>
    </div>
    <div class="inside">
      
    </div>
</div>
<!--
  <div class="home">
    <SidePanelStore />
    <div class="outside">
      <CustomText tag="h1">Search Customer</CustomText>


    <router-view />
    </div>
  </div>
  -->
</template>

<script>


export default {
  name: 'Test',
  components: {

  }
}
</script>

<style scoped>


</style>
