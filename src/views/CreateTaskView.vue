<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';

const router = useRouter();

const task = ref({
    title: '',
    description: '',
    status: 'pending',
});

const handleSubmit = async () => {
    await axios
        .post(`/api/tasks`, {
            title: task.value.title,
            description: task.value.description,
            status: task.value.status,
        })
        .then((response) => {
            router.push('/dashboard');
        })
        .catch((error) => {
            //
        });
};
</script>

<template>
    <div class="flex flex-col">
        <h1 class="mb-4 text-center text-4xl font-bold">Create New Task</h1>
        <form
            @submit.prevent="handleSubmit"
            class="flex w-[440px] flex-col gap-4 rounded-xl border border-gray-200 bg-white p-8 shadow-xl shadow-black/5"
        >
            <div class="flex flex-col">
                <label for="title">Title</label>
                <input
                    id="title"
                    type="text"
                    class="rounded-xl border border-gray-300 shadow-md shadow-black/5 p-3 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    v-model="task.title"
                    autofocus
                />
            </div>

            <div class="flex flex-col">
                <label for="description">Description</label>
                <textarea
                    id="description"
                    rows="5"
                    class="rounded-xl border border-gray-300 shadow-md shadow-black/5 p-3 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    v-model="task.description"
                ></textarea>
            </div>
            <div class="flex flex-col">
                <label for="status">Status</label>
                <select
                    class="rounded-xl border border-gray-300 shadow-md shadow-black/5 p-3 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    v-model="task.status"
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>

            <div class="flex flex-col">
                <button class="w-full rounded-full bg-black py-4 text-white">Create Task</button>
            </div>

            <div class="flex flex-col">
                <RouterLink
                    to="/dashboard"
                    class="w-full rounded-full bg-gray-200 py-4 text-center font-medium text-black decoration-transparent hover:bg-gray-300"
                >
                    Back to tasks list
                </RouterLink>
            </div>
        </form>
    </div>
</template>
