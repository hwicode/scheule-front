import { createWebHistory, createRouter } from "vue-router";

import Schedule from "../views/Schedule.vue";
import Calendar from "../views/Calendar.vue";
import Search from "../views/Search.vue";

const routes = [
    {
       path: "/schedule",
       component: Schedule,
    },
    {
      path: "/",
      component: Calendar,
    },
    {
      path: "/search",
      component: Search,
    }
 ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;