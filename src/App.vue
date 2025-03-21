<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

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
                        <span v-if="authStore.isAuthenticated">Welcome {{ authStore.user.name }}!</span>
                        <RouterLink
                            to="/dashboard"
                            class="flex items-center gap-2 rounded-xl bg-black px-6 py-2 text-white decoration-transparent transition duration-300 ease-in-out hover:bg-gray-700 active:scale-90"
                            v-if="$route.path !== '/dashboard' && authStore.isAuthenticated"
                        >
                            <span>Dashboard</span>
                        </RouterLink>

                        <span
                            class="flex items-center gap-2 rounded-xl bg-black px-6 py-2 text-white decoration-transparent opacity-30"
                            v-else
                            >Dashboard</span
                        >

                        <template v-if="!authStore.isAuthenticated">
                            <RouterLink
                                to="/login"
                                class="flex items-center gap-2 rounded-xl bg-black px-6 py-2 text-white decoration-transparent shadow-xl shadow-blue-600/20 transition duration-300 ease-in-out hover:scale-110 hover:bg-gray-700 active:scale-90"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="size-4"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <span>Login</span>
                            </RouterLink>
                        </template>

                        <template v-else-if="authStore.isAuthenticated">
                            <button
                                @click.prevent="handleLogout"
                                class="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2 text-white decoration-transparent transition duration-300 ease-in-out hover:bg-red-700 active:scale-90"
                            >
                                Sign Out
                            </button>
                        </template>
                    </template>
                </div>
            </div>
        </nav>

        <RouterView />
    </div>
</template>
