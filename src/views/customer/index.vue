<template>
  <div class="home">
    <TopBar />
    <SidePanel />

    <div class="outside">
    <router-view />
    </div>

<!--
    <CustomText>Text component test</CustomText>
    <CustomText tag="p">Text component test</CustomText>
    <CustomText tag="b" size="small">Text component test</CustomText>
    <IconTest />
-->
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import SidePanel from "@/components/SidePanel";
//import IconTest from '../../icons/test.svg'

export default {
  name: 'Customer',
  components: {
    TopBar,
    SidePanel,
    //IconTest
  },
  beforeCreate () {
    if (!this.$store.state.isLogged || !this.$store.state.isCustomer) {
      this.$router.push({ name: 'LoginPage' })
    }
  }

}
</script>

<style scoped>


</style>
