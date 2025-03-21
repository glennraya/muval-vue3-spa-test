<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../../plugins/axios';

const route = useRoute();
const router = useRouter();
const taskId = route.params.id;

const task = ref({
    title: '',
    description: '',
    status: 'pending',
});

// Validation state
const validationError = ref<Record<string, string[]>>({});

// Clear validation errors
const clearError = (field: string) => {
    if (validationError.value[field]) {
        validationError.value[field] = [];
    }
};

onMounted(() => {
    axios.get(`/api/tasks/${taskId}/edit`).then((response) => {
        task.value = response.data.task;
    });
});

const handleUpdate = async () => {
    await axios
        .patch(`/api/tasks/${taskId}`, {
            title: task.value.title,
            description: task.value.description,
            status: task.value.status,
        })
        .then((response) => {
            router.push('/dashboard'); // Redirect to dashboard on success
        })
        .catch((error: unknown) => {
            if (axios.isAxiosError(error) && error.response?.data?.errors) {
                validationError.value = error.response.data.errors;
            } else {
                validationError.value = { general: ['An unexpected error occurred.'] };
            }
        });
};
</script>

<template>
    <div class="flex flex-col">
        <h1 class="mb-4 text-center text-4xl font-bold">Update Task</h1>
        <form
            @submit.prevent="handleUpdate"
            class="flex w-[440px] flex-col gap-4 rounded-xl border-[5px] border-cyan-600/30 bg-white p-8 shadow-xl shadow-black/5"
        >
            <div class="flex flex-col">
                <label for="title">Title</label>
                <input
                    id="title"
                    type="text"
                    class="input-style"
                    :class="{ '!border-2 !border-red-500': validationError.title }"
                    v-model="task.title"
                    @input="clearError('title')"
                />
                <p
                    class="mt-1 font-medium text-red-500"
                    v-if="validationError.title"
                >
                    {{ validationError.title[0] }}
                </p>
            </div>

            <div class="flex flex-col">
                <label for="description">Description</label>
                <textarea
                    id="description"
                    rows="5"
                    class="input-style"
                    :class="{ '!border-2 !border-red-500': validationError.description }"
                    v-model="task.description"
                    @input="clearError('description')"
                ></textarea>
                <p
                    class="mt-1 font-medium text-red-500"
                    v-if="validationError.description"
                >
                    {{ validationError.description[0] }}
                </p>
            </div>
            <div class="flex flex-col">
                <label for="status">Status</label>
                <select
                    class="input-style"
                    :class="{ 'border-2 border-red-500': validationError.status }"
                    v-model="task.status"
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <p
                    class="mt-1 font-medium text-red-500"
                    v-if="validationError.status"
                >
                    {{ validationError.status[0] }}
                </p>
            </div>

            <div class="flex flex-col">
                <button class="w-full rounded-xl bg-black py-4 text-white">Update</button>
            </div>

            <div class="flex flex-col">
                <RouterLink
                    to="/dashboard"
                    class="w-full rounded-xl bg-gray-200 py-4 text-center font-medium text-black decoration-transparent hover:bg-gray-300"
                >
                    Back to tasks list
                </RouterLink>
            </div>
        </form>
    </div>
</template>
