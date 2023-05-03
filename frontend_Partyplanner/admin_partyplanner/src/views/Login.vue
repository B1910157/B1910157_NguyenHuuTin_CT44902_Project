<template>
  <div class="page">
    <h4 class="text-center text-primary font-weight-bold">Đăng nhập</h4>
    <LoginForm @submit:login="submitLogin" />
    <p>{{ message }}</p>
   
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import userService from "@/services/user.service";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(['Auth']),
    // ...mapState(['aname']),
   
  },
  methods: {
    ...mapMutations(['setAuth']),
    // ...mapMutations(['setName']),
  
    async submitLogin(data) {
      try {
        console.log("hihi")
        const response = await userService.login(data);
        console.log("respon ne: ",response)
        console.log("helloooooo",response.token)
        localStorage.setItem("token", response.token);
        // console.log("name: ", this.aname)
        // console.log("auth", this.Auth)
        this.setAuth(true);
        // this.setName("Xinchao")
        // console.log("auth", this.Auth)
        // console.log("name: ", this.aname)
        // console.log(response.data.token)
        this.$router.push({name: 'home'});
      } catch (error) {
    
        console.log(error);
        this.message = "Đăng nhập thất bại. Vui lòng thử lại.";
      }
    },
  },
};
</script>