<template>
    <div class="page">
        <h4>Thêm Món Ăn</h4>
        <FoodForm :food ="{}" @submit:food="addFood" />
        <p class="text-success">{{ message }}</p>
    </div>
</template>
<script>
import FoodForm from "@/components/FoodForm.vue";
import FoodService from "@/services/food.service";
export default {
    components: {
        FoodForm,
    },
   
    data() {
        return {
           
            message: "",
        };
    },
    methods: {
       
        async addFood(data) {
            console.log("hihi")
            try {
                await FoodService.create(data);
                this.message = "Món ăn được thêm thành công.";
                
            } catch (error) {
                console.log(error);
            }
        },
       
    },
   
};
</script>