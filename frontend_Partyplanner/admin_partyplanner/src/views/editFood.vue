<template>
    <div v-if="food" class="page">
        <h4>Sửa Món Ăn</h4>
        <FoodForm :food="food" @submit:food="updateFood" @delete:food="deleteFood" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            food: null,
            message: "",
        };
    },
    methods: {
        async getFood(id) {
            try {
                this.food = await FoodService.get(id);
                console.log(this.food)
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateFood(data) {
            try {
                await FoodService.update(this.food._id, data);
                this.message = "Món ăn được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteFood() {
            if (confirm("Bạn muốn xóa món ăn này?")) {
                try {
                    await FoodService.delete(this.food._id);
                    this.$router.push({ name: "home" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
       
        
       
    },
    created() {
        this.getFood(this.id);
        this.message = "";
    },
   
};
</script>