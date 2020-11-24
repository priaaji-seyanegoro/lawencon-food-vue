<template>
  <div class="card shadow-lg">
    <div class="card-body">
      <h3>Login</h3>
      <p>Login if you hava account</p>
      <form v-on:submit.prevent>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            v-model="user.email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="user.password"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg btn-block"
          @click="login"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login: async function () {
      if (this.user.email && this.user.password) {
        const res = await axios.get(
          `http://localhost:3000/users?q=${this.user.email}`
        );
        console.log(res);
        if (
          res.data.length !== 0 &&
          res.data[0].email === this.user.email &&
          res.data[0].password === this.user.password
        ) {
          // set state on store
          this.$store.commit("setAuthentication", true);
          this.user = "";

          // redirect to cart
          this.$router.push({ path: "/home" });
        } else {
          this.$toast.error("Email or Password Wrong", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      } else {
        this.$toast.error("Please Fill Register Form", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
};
</script>

<style>
</style>