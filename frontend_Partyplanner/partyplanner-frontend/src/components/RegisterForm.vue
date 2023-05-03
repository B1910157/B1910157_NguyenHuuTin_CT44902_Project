<template>
    <!-- Form sử dụng thư viện VeeValidate để hiển thị validation error message và emit event khi submit -->
    <Form @submit="submitRegister" :validation-schema="signUpFormSchema">
        <div class="form-group">
            <label for="fullname" class="font-weight-bold">Học và tên</label>
            <Field name="fullname" type="text" class="form-control" v-model="RegisterLocal.fullname" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="fullname" class="error-feedback" />
        </div>
        <!-- Tạo ra input field cho tên -->
        <div class="form-group">
            <label for="email" class="font-weight-bold">Email</label>
            <Field name="email" type="text" class="form-control" v-model="RegisterLocal.email" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="username" class="font-weight-bold">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="RegisterLocal.username" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone" class="font-weight-bold">Số điện thoại</label>
            <Field name="phone" type="text" class="form-control" v-model="RegisterLocal.phone" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address" class="font-weight-bold">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="RegisterLocal.address" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <!-- Tạo ra input field cho password -->
        <div class="form-group">
            <label for="password" class="font-weight-bold">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="RegisterLocal.password" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <!-- Tạo ra input field cho passwordConfirmation -->
        <div class="form-group">
            <label for="passwordConfirmation" class="font-weight-bold">Xác nhận mật khẩu</label>
            <Field name="passwordConfirmation" type="password" class="form-control"
                v-model="RegisterLocal.passwordConfirmation" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="passwordConfirmation" class="error-feedback" />
        </div>
        <!-- Tạo ra nút submit form -->
        <div class="form-group">
            <button class="btn btn-primary">Đăng ký</button>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:register"],
    data() {
        // Định nghĩa validation schema sử dụng thư viện yup
        const signUpFormSchema = yup.object().shape({
            fullname: yup
                .string()
                .required("Họ và tên không được trống."),
            username: yup
                .string()
                .required("Username không được trống."),
            email: yup
                .string()
                .required("Email không được trống.")
                .email("E-mail không đúng định dạng."),
            phone: yup.string()
                .required("Nhập số điện thoại")
                .matches(/^(0\d{9,10})$/, "Số điện thoại không hợp lệ"),
            address: yup
                .string()
                .required("Nhập địa chỉ"),

            password: yup
                .string()
                .required("Mật khẩu không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp.")
                .required("Mật khẩu xác nhận không được để trống."),
        });
        return {
            // Khởi tạo data cho các field trong form
            RegisterLocal: {
                fullname: "",
                phone: "",
                email: "",
                username: "",
                password: "",
                passwordConfirmation: "",
            },
            signUpFormSchema,
        };
    },
    methods: {
        submitRegister() {
            this.$emit("submit:register", this.RegisterLocal);
        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>
  