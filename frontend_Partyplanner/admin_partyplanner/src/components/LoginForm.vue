<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema">
        <!-- Tạo ra input field cho username -->
        <div class="form-group">
            <label for="username" class="font-weight-bold">Tên đăng nhập</label>
            <Field name="username"  type="text" class="form-control" v-model="loginLocal.username" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="username" class="error-feedback" />
        </div>

        <!-- Tạo ra input field cho password -->
        <div class="form-group">
            <label for="password" class="font-weight-bold">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="loginLocal.password" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="password" class="error-feedback" />
        </div>

        <!-- Tạo ra nút submit form -->
        <div class="form-group ">
            <button class="btn btn-primary">Đăng nhập</button>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
// import { array, object } from 'yup';
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:login"],
    data() {
        // Định nghĩa validation schema sử dụng thư viện yup
        const loginFormSchema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });

        return {
            // Khởi tạo data cho các field trong form
            loginLocal: {
                username: "",
                password: "",
            },
            loginFormSchema,
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginLocal);
        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>