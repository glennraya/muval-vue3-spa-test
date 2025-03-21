<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import SignOutIcon from './assets/icons/SignOutIcon.vue';
import DashboardIcon from './assets/icons/DashboardIcon.vue';
import LockIcon from './assets/icons/LockIcon.vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
    await authStore.logout();
    router.push('/login');
};
</script>

<template>
    <div class="relative flex min-h-screen items-center justify-center bg-gradient-to-tl from-cyan-200 text-sm">
        <nav class="absolute left-0 top-0 w-full gap-2 bg-white p-4 font-medium shadow shadow-black/5">
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <RouterLink
                        to="/"
                        class="rounded-lg px-6 py-2 text-gray-700 decoration-transparent hover:text-black"
                    >
                        Home
                    </RouterLink>
                </div>

                <div class="flex items-center gap-2">
                    <template v-if="$route.path !== '/login'">
                        <span v-if="authStore.isAuthenticated">Welcome {{ authStore?.user?.name }}!</span>
                        <RouterLink
                            to="/dashboard"
                            class="flex items-center gap-2 rounded-xl bg-black px-6 py-2 text-white decoration-transparent transition duration-300 ease-in-out hover:bg-gray-700 active:scale-90"
                            v-if="$route.path !== '/dashboard' && authStore.isAuthenticated"
                        >
                            <DashboardIcon />
                            <span>Dashboard</span>
                        </RouterLink>

                        <template v-if="!authStore.isAuthenticated">
                            <RouterLink
                                to="/login"
                                class="flex items-center gap-2 rounded-xl bg-black px-6 py-2 text-white decoration-transparent shadow-xl shadow-blue-600/20 transition duration-300 ease-in-out hover:bg-gray-700 active:scale-90"
                            >
                                <LockIcon />
                                <span>Login</span>
                            </RouterLink>
                        </template>

                        <template v-else-if="authStore.isAuthenticated">
                            <button
                                @click.prevent="handleLogout"
                                class="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2 text-white decoration-transparent transition duration-300 ease-in-out hover:bg-red-700 active:scale-90"
                            >
                                <SignOutIcon />
                                <span>Sign Out</span>
                            </button>
                        </template>
                    </template>
                </div>
            </div>
        </nav>

        <RouterView />
    </div>
</template>
