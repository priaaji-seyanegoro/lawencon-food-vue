<template>
  <div class="pesanan-sukses">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/img/menunggu.png" width="300" />
          <h2><strong>Sukses!!</strong></h2>
          <h4>
            Pesanan Anda segera diproses <br />
            Selamat Menunggu
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckoutSuccess",
  mounted() {
    axios
      .get(`http://localhost:3000/keranjangs`)
      .then((result) => {
        this.$store.commit("setCarts", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>