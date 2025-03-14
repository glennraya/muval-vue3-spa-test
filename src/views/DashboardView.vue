<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import axios from '../plugins/axios';

// const router = useRouter();

const tasks = ref([]);

onMounted(() => {
    axios
        .get('/api/tasks')
        .then((response) => {
            tasks.value = response.data.tasks;
        })
        .catch((error) => {
            console.log(error.response.data);
        });
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <h1 class="text-4xl font-bold">Available Tasks</h1>
        <div
            class="flex min-h-24 w-full max-w-screen-md flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
                <thead class="bg-black text-xs uppercase text-white">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3"
                        >
                            Owner
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3"
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="border-b border-gray-200 bg-white hover:bg-gray-50"
                        v-for="task in tasks"
                        :key="task.id"
                    >
                        <th
                            scope="row"
                            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                        >
                            {{ task.user.name }}
                        </th>
                        <th
                            scope="row"
                            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                        >
                            {{ task.title }}
                        </th>
                        <td class="px-6 py-4">{{ task.description }}</td>
                        <td>
                            <div class="flex gap-2">
                                <RouterLink
                                    :to="`/tasks/${task.id}/edit`"
                                    class="rounded-md bg-gray-200 p-1 text-gray-700 decoration-transparent hover:bg-gray-300 hover:text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-5"
                                    >
                                        <path
                                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                                        />
                                    </svg>
                                </RouterLink>
                                <button
                                    class="rounded-md bg-red-600 p-1 text-white decoration-transparent hover:bg-red-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-5"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
