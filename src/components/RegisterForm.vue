<template>
  <div class="card shadow-lg">
    <div class="card-body">
      <h3>Register</h3>
      <p id="email-register" class="form-text text-muted">
        Register if you don't have account
      </p>
      <form v-on:submit.prevent>
        <div class="form-group">
          <label for="name-register">Name</label>
          <input
            type="text"
            class="form-control"
            id="name-register"
            v-model="user.name"
          />
        </div>
        <div class="form-group">
          <label for="email-register">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email-register"
            aria-describedby="email-register"
            v-model="user.email"
          />
          <small id="email-register" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="password-register">Password</label>
          <input
            type="password"
            class="form-control"
            id="password-register"
            v-model="user.password"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg btn-block"
          @click="register"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    register: async function () {
      if (this.user.name && this.user.email && this.user.password) {
        const res = await axios.get(
          `http://localhost:3000/users?q=${this.user.email}`
        );

        if (res.data.length) {
          this.$toast.error("Sorry Email Has Been Registered", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        } else {
          axios
            .post(`http://localhost:3000/users`, this.user)
            .then(() => {
              this.user = "";
              this.$toast.success("Register successfully", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            })
            .catch((err) => {
              console.log(err);
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