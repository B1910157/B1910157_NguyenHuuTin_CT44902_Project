<script>
export default {
    props: {
        food: { type: Object, required: true },
    },
};
</script>
<template>
    <div class="text-left p-3">
        <div class="p-1">
            <strong>Tên món:</strong>
            {{ food.food_name }} 
        </div>
        <div class="p-1">
            <strong>Loại món:</strong>
            {{ food.food_categories }}
        </div>
        <div class="p-1">
            <strong>Giá:</strong>
            {{ food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
        </div>
        
        
    </div>
</template>
