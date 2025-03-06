<script setup>
import { onBeforeMount } from 'vue';
import { router } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
import axios from '@/axios.js';

onBeforeMount(() => {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken || authToken == '') {
        // Redirect to the dashboard if the auth_token is found
        router.visit('/login');
    }
});

const logout = async () => {
    try {
        await axios.post('/logout');
        router.push('/login');
    } catch (err) {
        error.value = "An error occurred while logging out. Please try again.";
    }
};
</script>
<template>
    <div class="flex min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
        <!-- Sidebar -->
        <div class="w-80 bg-gray-800 text-white p-6 rounded-r-3xl shadow-lg">
            <!-- Logo and Title -->
            <div class="mb-8">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/023/495/220/small_2x/real-estate-logo-design-png.png" alt="Sidebar Logo" class="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl" loading="lazy" />
                <h1 class="mt-4 text-2xl font-bold text-center text-white">Real Estate Dashboard</h1>
            </div>

            <!-- Sidebar Menu -->
            <ul class="space-y-6">
                <li>
                    <Link :href="route('dashboard')" class="text-lg font-semibold hover:text-indigo-400 transition duration-300 ease-in-out hover:scale-105">
                        Listing
                    </Link>
                </li>
                <li>
                    <Link :href="route('list.featured')" class="text-lg font-semibold hover:text-indigo-400 transition duration-300 ease-in-out hover:scale-105">
                        Featured Listing
                    </Link>
                </li>
                <li>
                    <Link :href="route('profile')" class="text-lg font-semibold hover:text-indigo-400 transition duration-300 ease-in-out hover:scale-105">
                        Profile
                    </Link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout" class="text-lg font-semibold hover:text-indigo-400 transition duration-300 ease-in-out hover:scale-105">
                        Logout
                    </a>
                </li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="flex-grow text-black bg-white p-8 rounded-l-3xl shadow-lg">
            <div class="bg-gray-50 p-6 rounded-lg shadow-lg">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Custom CSS for additional styling */
body {
    font-family: 'Inter', sans-serif;
}
</style>
