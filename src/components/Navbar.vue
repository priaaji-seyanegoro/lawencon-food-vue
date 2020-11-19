<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand class="text-dark">Lawencon Food</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/foods"
                >Foods</router-link
              >
            </li>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/cart">
                Keranjang
                <b-icon-bag />
                <span class="badge badge-success ml-2">{{
                  updatedCart ? updatedCart.length : amount_order.length
                }}</span>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  props: {
    updatedCart: {
      type: Array,
    },
  },
  data() {
    return {
      amount_order: [],
    };
  },
  methods: {
    setAmountOrder: function (data) {
      this.amount_order = data;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/keranjangs`)
      .then((result) => {
        this.setAmountOrder(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
