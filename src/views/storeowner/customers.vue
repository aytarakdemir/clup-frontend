<template>
<div class="middleWrapper">
    <div class="insideHeaderWrapper">
      <h2 class="insideHeader">Customers</h2>
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
      
    </div>
</div>
     
</template>

<script>

export default {
  name: 'OwnerCustomers',
  components: {

  }
}
</script>

<style scoped></style>
