<script setup>
import axios from '@/axios.js';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';

// Define reactive properties using ref()
const error = ref('');
const successMessage = ref('');
const isSubmitting = ref(true);

const email = ref('');
const password = ref('');

const login = async () => {
    error.value = '';
    successMessage.value = '';

    isSubmitting.value = true;

    try {
        const response = await axios.post('/login', {
            email: email.value,
            password: password.value,
        });

        localStorage.setItem("auth_token", response.data.data.token);

        router.visit('/dashboard');

        // Reset form fields after success
        email.value = '';
        password.value = '';
    } catch (err) {
        console.log(err.response);
        // Handle error response
        if (err.response && err.response.data.message) {
            error.value = err.response.data.message;
        } else {
            error.value = 'An error occurred. Please try again.';
        }
    } finally {
        // Stop form submission
        isSubmitting.value = false;
    }
};
</script>

<template>
    <AuthLayout>
        <Head title="Login" />
        <div class="flex min-h-screen items-center justify-center bg-gray-100">
            <div class="w-full rounded-lg p-8 shadow-lg sm:w-96">
                <h2 class="mb-6 text-center text-3xl font-semibold text-gray-800">Login</h2>
                <div
                    v-show="error && error.length > 0"
                    class="mb-4 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    <svg
                        class="me-3 inline h-4 w-4 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                        />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        {{ error }}
                    </div>
                </div>

                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            v-model="email"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            v-model="password"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        class="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </form>

                <p class="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link :href="route('signup')" class="text-blue-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    </AuthLayout>
</template>

<style></style>
