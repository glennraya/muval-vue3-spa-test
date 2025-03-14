<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';

const router = useRouter();

const email = ref('');
const password = ref('');

const validationError = ref('');
const handleLogin = async () => {
    await axios.get('/sanctum/csrf-cookie');

    try {
        const response = await axios.post('/login-spa', {
            email: email.value,
            password: password.value,
        });
        validationError.value = response.data;

        // Redirect to dashboard after successful login
        router.push('/dashboard');
    } catch (error) {
        console.log(error);

        throw error;
    }
};
</script>

<template>
    <div>
        <form
            @submit.prevent="handleLogin"
            class="flex w-[440px] flex-col gap-4 rounded-xl bg-white p-8 shadow-xl shadow-black/5"
        >
            <div class="flex flex-col">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    class="rounded-xl border-none bg-gray-100 p-3 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    placeholder="youremail@example.com"
                    v-model="email"
                />
            </div>

            <div class="flex flex-col">
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    class="rounded-xl border-none bg-gray-100 p-3 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    v-model="password"
                />
            </div>

            <div class="flex flex-col">
                <button class="w-full rounded-full bg-black py-4 text-white">Sign In</button>
            </div>

            <p
                v-if="validationError"
                class="rounded-lg bg-red-100 p-4 text-center text-red-800"
            >
                {{ validationError.email }}
            </p>
        </form>
    </div>
</template>
