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
      <h1>Hello store owner</h1>
      <h2>Welcome to the CLuP application!</h2>
    </div>
</div>
  
</template>

<script>


export default {
  name: 'OwnerStores',
  components: {

  }
}
</script>

<style scoped></style>
