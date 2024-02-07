import { createWebHistory, createRouter } from "vue-router";

import SignIn from "@/views/SignIn.vue";
import Schedule from "@/views/Schedule.vue";
import Calendar from "@/views/Calendar.vue";
import Search from "@/views/Search.vue";

const routes = [
    {
      path: "/",
      component: SignIn,
    },
    {
       path: "/schedule",
       component: Schedule,
    },
    {
      path: "/calendar",
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
    scrollBehavior() {
      // 항상 페이지 상단으로 스크롤
      return { top: 0 };
    },
});

export default router;