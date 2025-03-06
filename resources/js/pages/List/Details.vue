<script setup>
import axios from '@/axios.js';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const page = usePage();
const listingId = page.props.id;

// Reactive variable to store the listing details
const listingDetails = ref(null);
const me = ref(null);
const error = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get(`/listings/${listingId}`);
        listingDetails.value = response.data.data;
    } catch (err) {
        error.value = 'An error occurred while fetching the listing details.';
    } finally {
        isLoading.value = false; // Set loading to false when data has been fetched
    }
});

onMounted(async () => {
    try {
        const response = await axios.get(`/me`);
        me.value = response.data;
    } catch (err) {
        error.value = 'An error occurred while fetching my details.';
    }
});
</script>

<template>
    <AppLayout>
        <Head title="List Details" />
        <div class="mx-auto max-w-7xl p-6">
            <!-- Error Handling -->
            <div v-if="error" class="mb-4 text-center text-red-500">{{ error }}</div>
            <div v-if="isLoading" class="text-center text-xl text-gray-600">Loading...</div>
            <div c-else>
                <div class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-900">{{ listingDetails?.title }}</h2>
                    <p class="text-lg text-gray-600">{{ listingDetails?.description }}</p>
                </div>

                <!-- Listing Owner Section -->
                <div v-if="!isLoading" class="mb-8 rounded-lg bg-gray-100 p-6 shadow-md">
                    <h3 class="mb-4 text-xl font-semibold text-gray-800">Owner Details</h3>
                    <div class="flex items-center space-x-4">
                        <img :src="listingDetails?.owner?.profile_image?.path?.path" alt="Owner Image" class="h-16 w-16 rounded-full object-cover" />
                        <div>
                            <p class="text-lg font-semibold text-gray-900">{{ listingDetails?.owner?.name }}</p>
                            <p class="text-sm text-gray-500">{{ listingDetails?.owner?.email }}</p>
                        </div>
                    </div>
                </div>

                <!-- Listing Images -->
                <div v-if="listingDetails?.images?.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(image, index) in listingDetails?.images" :key="index" class="group relative cursor-pointer">
                        <img
                            :src="image.path"
                            alt="Listing Image"
                            class="h-72 w-full transform rounded-lg object-cover shadow-lg transition-all duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>
                <!-- Update Button -->
                <div v-if="listingDetails?.owner?.id === me?.data?.id && !isLoading" class="mt-8 text-center">
                    <Link
                        :href="route('list.update', { id: listingDetails.id })"
                        class="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Update this Item
                    </Link>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped></style>
