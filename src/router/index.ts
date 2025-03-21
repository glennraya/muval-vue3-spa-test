import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/Dashboard/Index.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/register',
            name: 'register',
            meta: { requiresGuest: true },
            component: () => import('../views/Auth/RegisterView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Auth/LoginView.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/tasks/create',
            name: 'task.create',
            component: () => import('../views/Task/Create.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/tasks/:id/edit',
            name: 'task.edit',
            component: () => import('../views/Task/Edit.vue'),
            meta: { requiresAuth: true }
        }

    ],
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    // await authStore.checkAuth();

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
