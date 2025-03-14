import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../plugins/axios';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const isAuthenticated = ref(false);

    // Check if user is logged in
    const checkAuth = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie'); // Ensure cookies are set
            const response = await axios.get('/api/user');
            user.value = response.data;
            isAuthenticated.value = !!response.data;
        } catch (error) {
            user.value = null;
            isAuthenticated.value = false;
            console.log(error);

        }
    };

    // Login user
    const login = async (email: string, password: string) => {
        await axios.get('/sanctum/csrf-cookie');

        try {
            const response = await axios.post('/login-spa', { email, password });
            user.value = response.data;
            isAuthenticated.value = true;
        } catch (error) {
            user.value = null;
            isAuthenticated.value = false;
        }
    };

    // Logout user
    const logout = async () => {
        try {
            await axios.post('/logout-spa');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            user.value = null;
            isAuthenticated.value = false;
        }
    };

    return { user, isAuthenticated, checkAuth, login, logout };
});
