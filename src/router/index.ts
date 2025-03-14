import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/LoginView.vue'),
            meta: { requiresGuest: true }
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
        await authStore.checkAuth();
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login');
    }

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        return next('/dashboard');
    }

    next();
});

export default router;
