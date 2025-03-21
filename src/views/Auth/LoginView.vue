<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../plugins/axios';

const router = useRouter();

const email = ref('');
const password = ref('');

const validationError = ref<Record<string, string[]>>({});

// Clear validation errors
const clearError = (field: string) => {
    if (validationError.value[field]) {
        validationError.value[field] = null;
    }
};

const handleLogin = async () => {
    await axios.get('/sanctum/csrf-cookie');

    try {
        await axios.post('/login-spa', {
            email: email.value,
            password: password.value,
        });

        // Redirect to dashboard after successful login
        router.push('/dashboard');
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.errors) {
            validationError.value = error.response.data.errors;
        } else {
            validationError.value = { general: ['An unexpected error occurred.'] };
        }
    }
};
</script>

<template>
    <div>
        <h1 class="mb-4 text-center text-3xl font-bold">Login</h1>
        <form
            @submit.prevent="handleLogin"
            class="flex w-[340px] max-w-screen-sm flex-col gap-3 rounded-xl border-[5px] border-cyan-600/30 bg-white p-8 shadow-lg shadow-black/5"
        >
            <div class="flex flex-col">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    class="input-style"
                    :class="{ '!border-2 !border-red-500': validationError.email }"
                    placeholder="walterwhite@mail.com"
                    v-model="email"
                    @input="clearError('email')"
                />
                <p
                    class="mt-1 font-medium text-red-500"
                    v-if="validationError.email"
                >
                    {{ validationError.email[0] }}
                </p>
            </div>

            <div class="flex flex-col">
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    class="input-style"
                    :class="{ '!border-2 !border-red-500': validationError.password }"
                    v-model="password"
                    @input="clearError('password')"
                />
                <p
                    class="mt-1 font-medium text-red-500"
                    v-if="validationError.password"
                >
                    {{ validationError.password[0] }}
                </p>
            </div>

            <div class="mt-2 flex flex-col">
                <button class="w-full rounded-xl bg-black py-4 text-white">Sign In</button>
            </div>

            <div class="flex flex-col">
                <RouterLink
                    to="/register"
                    class="max-w-fit self-center border-b border-transparent py-2 text-center text-black decoration-transparent hover:border-black"
                >
                    Create an account
                </RouterLink>
            </div>
        </form>
    </div>
</template>
