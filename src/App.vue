<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer,
  },
  mounted() {
    console.log(this.$store.state.authenticated);
  },
};
</script>
