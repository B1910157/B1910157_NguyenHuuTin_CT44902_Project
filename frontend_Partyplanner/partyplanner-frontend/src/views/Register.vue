<template>
  <div class="page">
      <h4 class="text-center text-primary font-weight-bold">Đăng ký</h4>
      <RegisterForm @submit:register="submitRegister" />
      <p>{{ message }}</p>
     
  </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm.vue";
import userService from "@/services/user.service";

export default {
  components: {
      RegisterForm,
  },
  data() {
      return {
          message: "",
      };
  },
  methods: {
      async submitRegister(data) {
          try {
              await userService.register(data);
              this.$router.push("/login");
          } catch (error) {
              console.log(error);
              this.message = "Đăng ký thất bại. Vui lòng thử lại.";
          }
      },
  },
};
</script>