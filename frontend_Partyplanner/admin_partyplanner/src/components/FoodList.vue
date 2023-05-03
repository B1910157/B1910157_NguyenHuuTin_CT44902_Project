<script>
export default {
    props: {
        foods: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        getImage(food) {
            return `http://localhost:3000/${food.image}`;
        },
        formatCurrency(number) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return formatter.format(number);
        },
    }
};

</script>
<template>
    <div style="height: 500px; overflow-y: scroll;">
        <ul class="list-group">
        <li class="list-group-item" v-for="(food, index) in foods" :key="food._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            <img :src="getImage(food)" alt="" class="w-25 h-25">
            <b > ***{{ food.food_name }}</b> --- <b>Giá:</b> {{ formatCurrency(food.price)}}
          
        </li>
       
    </ul>

    </div>
    
    
</template>



<!-- <script>
export default {
    props: {
        contacts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};

</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(contact, index) in contacts" :key="contact._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ contact.name }}
           
          
        </li>
    </ul>
    
</template> -->
