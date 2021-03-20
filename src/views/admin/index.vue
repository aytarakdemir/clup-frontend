<template>
  <div class="home">
    <TopBar />
    <SidePanelStore />
    
    <div class="outside">
      <router-view />
    </div>

  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import SidePanelStore from '@/components/SidePanelAdmin'

export default {
  name: 'StoreOwner',
  components: {
    TopBar,
    SidePanelStore
  },
  beforeCreate () {
    if (!this.$store.state.isLogged || !this.$store.state.isStoreOwner) {
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style scoped>


</style>
