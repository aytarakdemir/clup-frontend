<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading" id="logo">CLup </div>
    <div class="list-group list-group-flush">
      <router-link class="list-group-item list-group-item-action bg-light" to="/admin/">Approve Store</router-link>
      <router-link class="list-group-item list-group-item-action bg-light" to="/loginpage">Exit</router-link>
      
    </div>
  </div>





  <!--<header class="sidepanel">
    <CustomText tag="h1" class="logo">CLup</CustomText>
    <div class="links">
      <router-link class="panelbutton" to="/">Appointments</router-link>
      <router-link class="panelbutton" to="/stores">Stores</router-link>
      <router-link class="panelbutton" to="/profile">Profile</router-link>
    </div>

  </header>-->
</template>

<script>
//import CustomText from '@/components/CustomText'

export default {
  name: 'SidePanel',
  components: {
  //  CustomText
  }
}
</script>

<style scoped>

#sidebar-wrapper {
  width: 300px;
  position: fixed;
  z-index: 1;
  height: 100%;
  font-size: 20px;
  top: 55px;
  font-family: inherit;
  font-weight: 300;
}

.sidebar-heading {
  position: relative;
  display: block;
  padding: 2rem 1.25rem;

}

#logo {
  font-size: 50px;
}

.sidepanel {
  background-color: darkgray;
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
}

.logo {
  width: 50%;
  margin-top: 90px;
  margin-left: auto;
  margin-right: auto;
  font-size: 60px;
}

.links {
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}

.panel_button {
  color: inherit;
}

.list-group-item list-group-item-action bg-light {

}


</style>