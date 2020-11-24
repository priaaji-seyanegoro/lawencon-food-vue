<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand class="text-dark">
          <router-link
            class="nav-link text-dark"
            to="/"
            v-if="!this.$store.state.authenticated"
            >Lawencon Food</router-link
          >
          <span v-else-if="this.$store.state.authenticated">Lawencon Food</span>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <div v-if="this.$store.state.authenticated">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <li class="nav-item">
                <router-link class="nav-link text-dark" to="/home"
                  >Home</router-link
                >
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
              <li class="nav-item">
                <b-button
                  variant="outline-success"
                  size="md"
                  class="ml-2"
                  @click="logout"
                >
                  <b-icon icon="power" aria-hidden="true"></b-icon> Logout
                </b-button>
              </li>
            </b-navbar-nav>
          </b-collapse>
        </div>
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
    logout: function () {
      // set state on store
      this.$store.commit("setAuthentication", false);
      this.$router.push({ path: "/" });
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
