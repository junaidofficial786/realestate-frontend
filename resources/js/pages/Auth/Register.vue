<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import axios from '@/axios.js';


const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const isSubmitting = ref(false);
const error = ref("");
const successMessage = ref("");

// The signup function
const signup = async () => {
    error.value = "";
    successMessage.value = "";

    isSubmitting.value = true;

    try {
        const response = await axios.post("/register", {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });

        console.log(response);

        // Handle success
        alert("Account created successfully! Please log in.");

        // Reset form fields after success
        name.value = "";
        email.value = "";
        password.value = "";
        password_confirmation.value = "";
    } catch (err) {
        console.log(err.response);
        // Handle error response
        if (err.response && err.response.data.errors) {
            // Display form validation errors
            error.value = err.response.data.message
        } else {
            error.value = "An error occurred. Please try again.";
        }
    } finally {
        // Stop form submission
        isSubmitting.value = false;
    }
};
</script>

<template>
    <AuthLayout>
        <Head title="Sign Up" />
        <div class="flex min-h-screen items-center justify-center bg-gray-100">
            <div class="w-full rounded-lg bg-white p-8 shadow-lg sm:w-96">
                <h2 class="mb-6 text-center text-3xl font-semibold text-gray-800">Create An Account</h2>

                <div v-show="error && error.length > 0" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        {{ error }}
                    </div>
                </div>

                <form @submit.prevent="signup">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            v-model="name"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
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

                    <div class="mb-6">
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            v-model="password_confirmation"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        class="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Account
                    </button>
                </form>

                <p class="mt-4 text-center text-sm text-gray-600">
                    Have an account?
                    <Link :href="route('login')" class="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    </AuthLayout>
</template>

<style></style>
