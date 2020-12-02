<template>
  <div class="home">
    <div class="container">
      <Banner />

      <div class="row mt-4">
        <div class="col">
          <h2>Best <strong>Foods</strong></h2>
        </div>
        <div class="col">
          <router-link class="btn btn-success float-right" to="/foods">
            <b-icon-eye></b-icon-eye> Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-3">
        <div
          class="col-md-4 mt-4 d-flex justify-content-center"
          v-for="product in bestProducts"
          :key="product.id"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Banner,
    ProductCard,
  },
  data() {
    return {
      bestProducts: [],
    };
  },
  methods: {
    setProduct: function (res) {
      this.bestProducts = res;
    },
  },
  //fire when page rendered
  mounted() {
    axios
      .get("http://localhost:3000/best-products")
      .then((result) => {
        this.$store.commit("setBestFood", result.data);
        // console.log(this.$store.state.bestFood);
        this.setProduct(this.$store.state.bestFood);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
