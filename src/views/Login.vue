<template>
  <div class="login">
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-6 mb-4">
          <LoginForm />
        </div>
        <div class="col-md-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
export default {
  name: "Login",
  components: {
    LoginForm,
    RegisterForm,
  },
};
</script>

<style>
</style>