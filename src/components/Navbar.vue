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

        <template v-if="this.$store.state.authenticated">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
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
                    this.$store.state.carts.length
                  }}</span>
                </router-link>
              </li>
              <li class="nav-item">
                <b-button variant="outline-success" size="md" @click="logout">
                  <b-icon icon="power" aria-hidden="true"></b-icon> Logout
                </b-button>
              </li>
            </b-navbar-nav>
          </b-collapse>
        </template>
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
  methods: {
    setAmountOrder: function (data) {
      this.carts = data;
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
        this.$store.commit("setCarts", result.data);
        this.setAmountOrder(this.$store.state.carts);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
