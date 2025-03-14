<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';

const router = useRouter();

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

const showDeleteTaskDialog = ref(false);

const selectedTask = ref(null);
const openDialog = (taskId: number) => {
    showDeleteTaskDialog.value = true;
    selectedTask.value = taskId;
};

const closeDialog = () => {
    showDeleteTaskDialog.value = false;
};

const handleDeleteTask = async () => {
    await axios
        .delete(`/api/tasks/${selectedTask.value}`)
        .then(() => {
            tasks.value = tasks.value.filter((task) => task.id !== selectedTask.value);
            closeDialog();
        })
        .catch((error) => {
            throw error;
        });
};
</script>

<template>
    <!-- Dialog Backdrop -->
    <div
        v-if="showDeleteTaskDialog"
        class="fixed inset-0 z-40 bg-black/50"
        @click="closeDialog"
    ></div>

    <!-- Dialog Box -->
    <dialog
        ref="dialogRef"
        :open="showDeleteTaskDialog"
        class="fixed z-50 rounded-lg border p-6"
    >
        <div class="flex flex-col">
            <h2 class="text-lg font-bold">Delete Task</h2>
            <p class="mt-2">Are you sure you want to delete the selected task?</p>
            <div class="flex justify-end gap-1">
                <button
                    @click="closeDialog"
                    class="mt-4 self-end bg-transparent px-4 py-2 text-sm text-gray-500 hover:bg-transparent hover:text-black"
                >
                    Cancel
                </button>

                <button
                    @click.prevent="handleDeleteTask"
                    class="mt-4 self-end rounded-full bg-black px-4 py-2 text-sm text-white"
                >
                    Yes please
                </button>
            </div>
        </div>
    </dialog>

    <div class="flex max-w-screen-lg flex-col gap-2">
        <header class="flex items-center justify-between">
            <h1 class="text-4xl font-bold">My Tasks</h1>

            <RouterLink
                to="tasks/create"
                class="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white decoration-transparent hover:bg-blue-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-4"
                >
                    <path
                        fill-rule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clip-rule="evenodd"
                    />
                </svg>

                <span>New Task</span>
            </RouterLink>
        </header>
        <div class="flex min-h-24 w-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
                        >
                            Status
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
                        <td class="px-6 py-4">
                            <span
                                v-if="task.status === 'pending'"
                                class="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold uppercase"
                                >Pending</span
                            >
                            <span
                                v-if="task.status === 'in_progress'"
                                class="whitespace-nowrap rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold uppercase"
                                >In Progress</span
                            >
                            <span
                                v-if="task.status === 'complete'"
                                class="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold uppercase"
                                >Complete</span
                            >
                        </td>
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
                                    @click.prevent="openDialog(task.id)"
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
            <p
                class="mt-2 rounded-md bg-gray-100 py-2 text-center"
                v-if="tasks.length === 0"
            >
                There are no tasks yet.
            </p>
        </div>
    </div>
</template>
