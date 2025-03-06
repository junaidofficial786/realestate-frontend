<script setup>
import AuthLayout from '@/layouts/auth/AuthSimpleLayout.vue';
import { onBeforeMount } from 'vue';
import { router } from '@inertiajs/vue3';


onBeforeMount(() => {
    const authToken = localStorage.getItem('auth_token');

    if (authToken && authToken !== '') {
        // Redirect to the dashboard if the auth_token is found
        router.visit('/dashboard');
    }
});
</script>

<template>
    <AuthLayout>
        <slot />
    </AuthLayout>
</template>
