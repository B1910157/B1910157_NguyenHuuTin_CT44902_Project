<template>
    <Form @submit="submitFeedBack" :validation-schema="feedbackFormSchema">
        <!-- Tạo ra input field cho username -->
        <div class="form-group">
            <label for="content" class="font-weight-bold">Nội dung góp ý của bạn</label>
           
           <!-- <textarea v-model="feedbackLocal.content" name="content"  cols="30" rows="10" class="form-control"  placeholder="Nhập vào nội dung góp ý..." ></textarea> -->
            <Field style="height: 100px;" name="content"  type="text" class="form-control w-100 " v-model="feedbackLocal.content" placeholder="Nhập nội dung góp ý..."/>
            <!-- Hiển thị validation error message nếu có -->
           
            <ErrorMessage name="content" class="error-feedback" />
        </div>

        <!-- Tạo ra input field cho password -->
       

        <!-- Tạo ra nút submit form -->
        <div class="form-group ">
            <button class="btn btn-primary">Gửi</button>
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
    emits: ["submit:feedback"],
    data() {
        // Định nghĩa validation schema sử dụng thư viện yup
        const feedbackFormSchema = yup.object().shape({
            content: yup.string().required("Nội dung góp ý không được để trống."),
           
        });

        return {
            // Khởi tạo data cho các field trong form
            feedbackLocal: {
                content: "",
                
            },
            feedbackFormSchema,
        };
    },
    methods: {
        submitFeedBack() {
            this.$emit("submit:feedback", this.feedbackLocal);
        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>