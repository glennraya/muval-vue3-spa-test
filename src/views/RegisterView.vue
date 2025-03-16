<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

// const validationError = ref([]);
const validationError = ref<Record<string, string[]>>({});
const handleSubmit = async () => {
    await axios.get('/sanctum/csrf-cookie');

    try {
        await axios.post('/register-spa', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });

        // Redirect to dashboard after successful login
        router.push('/dashboard');
    } catch (error: unknown) {
        // validationError.value = error.response.data;
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
        <h1 class="mb-4 text-center text-3xl font-bold">Register for an account</h1>
        <form
            @submit.prevent="handleSubmit"
            class="flex w-[540px] flex-col gap-4 rounded-xl border border-gray-300 bg-white p-8 shadow-xl shadow-black/5"
        >
            <div class="flex flex-col">
                <label for="name">Name</label>
                <input
                    id="name"
                    type="text"
                    class="rounded-xl border border-gray-300 p-3 shadow-md shadow-black/5 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    placeholder="Please enter your first or full name."
                    v-model="name"
                />
                <p
                    class="mt-1 font-medium text-red-500"
                     v-if="validationError.name"
                >
                    {{ validationError.name[0] }}
                </p>
            </div>

            <div class="flex flex-col">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    class="rounded-xl border border-gray-300 p-3 shadow-md shadow-black/5 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    placeholder="Please provide us with a valid email address."
                    v-model="email"
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
                    class="rounded-xl border border-gray-300 p-3 shadow-md shadow-black/5 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    placeholder="Minimum of eight characters."
                    v-model="password"
                />
                <p
                    class="mt-1 font-medium text-red-500"
                     v-if="validationError.password"
                >
                    {{ validationError.password[0] }}
                </p>
            </div>

            <div class="flex flex-col">
                <label for="confirm">Confirm password</label>
                <input
                    id="confirm"
                    type="password"
                    class="rounded-xl border border-gray-300 p-3 shadow-md shadow-black/5 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    placeholder="Please confirm your password."
                    v-model="password_confirmation"
                />
            </div>

            <div class="mt-2 flex flex-col">
                <button class="w-full rounded-xl bg-black py-4 text-white">Sign Up</button>
            </div>

            <div class="flex flex-col">
                <RouterLink
                    to="/login"
                    class="max-w-fit self-center border-b border-transparent py-2 text-center text-black decoration-transparent hover:border-black"
                >
                    Already have an account?
                </RouterLink>
            </div>
        </form>
    </div>
</template>
