import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
   
    // {
    //     path: "/contact/:id",
    //     name: "contact.edit",
    //     component: () => import("@/views/ContactEdit.vue"),
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
     {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/order/",
        name: "order",
        component: () => import("@/views/Order.vue"),
       
    },
    {
        path: "/history/",
        name: "history",
        component: () => import("@/views/History.vue"),
       
    },
    {
        path: "/updateInfo/",
        name: "updateInfo",
        component: () => import("@/views/InfoEdit.vue"),
       
    },
    {
        path: "/info/",
        name: "info",
        component: () => import("@/views/Info.vue"),
       
    },
    {
        path: "/feedback/",
        name: "feedback",
        component: () => import("@/views/FeedBack.vue"),
       
    },
    {
        path: "/register/",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/login/",
        name: "login",
        component: () => import("@/views/Login.vue"),
    }

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


//Global guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("token");
    if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
      next({ name: "login" });
    } else {
      next();
    }
  });



export default router;
