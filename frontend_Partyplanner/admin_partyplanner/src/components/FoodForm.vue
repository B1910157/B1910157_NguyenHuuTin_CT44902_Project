<template>
    <Form @submit="submitFood" :validation-schema="foodFormSchema">
    
        <div class="form-group">
            <label for="food_name">Tên món </label> 
            <Field name="food_name" type="text" class="form-control" v-model="foodLocal.food_name" />
            <ErrorMessage name="food_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="food_categories">Loại món </label>
            <Field name="food_categories" type="food_categories" class="form-control" v-model="foodLocal.food_categories" />
            <ErrorMessage name="food_categories" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá </label>
            <Field name="price" type="number" class="form-control" v-model="foodLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh </label>
            <Field name="image" type="file" class="form-control" v-model="foodLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

       
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="foodLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteFood">
                Xóa
            </button>
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
    emits: ["submit:food",  "delete:food"],
    props: {
        food: { type: Object, required: true }
    },
    data() {
        const foodFormSchema = yup.object().shape({
            food_name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            food_categories: yup
                .string()
                .required("Loại món không được rỗng"),
               
            price: yup.string()
               
                .required("Vui lòng nhập giá")
            ,
            // image: yup.mixed()
            // .required("Vui lòng chọn ảnh")
            // ,
            
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // foodLocal để liên kết với các input trên form
            foodLocal: this.food,
            foodFormSchema,
        };
    },
    methods: {
        submitFood() {
            const formData = new FormData();
            formData.append("food_name", this.foodLocal.food_name);
            formData.append("food_categories", this.foodLocal.food_categories);
            formData.append("price", this.foodLocal.price);
            formData.append("image", this.foodLocal.image);
            this.$emit("submit:food", formData);
        },
        deleteFood() {
            this.$emit("delete:food", this.foodLocal.id);
        },

    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>