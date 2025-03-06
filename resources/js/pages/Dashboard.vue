<script setup>
import axios from '@/axios.js';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const listing = ref([]);
const loading = ref(true);

onMounted(() => {
    axios
        .get('/listings')
        .then((response) => {
            listing.value = response.data.data;
            console.log(listing.value);
            loading.value = false;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            loading.value = false;
        });
});

const deleteListing = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
        axios
            .delete(`/listings/${id}`)
            .then(() => {
                // Remove the listing from the local array after successful deletion
                listing.value = listing.value.filter((item) => item.id !== id);
                alert('Successfully deleted.');
            })
            .catch((error) => {
                console.error('Error deleting listing:', error);
            });
    }
};
</script>

<template>
    <AppLayout>
        <Head title="Listing" />

        <div class="mx-auto max-w-7xl p-6">
            <div class="flex items-center justify-between">
                <h1 class="mb-6 text-3xl font-semibold text-gray-800">Welcome to the Listing Page</h1>
                <Link :href="route('list.create')" class="rounded bg-gray-800 px-6 py-4 text-white">Add New List</Link>
            </div>

            <!-- Show Loading message until the data is fetched -->
            <div v-if="loading" class="text-center text-gray-500">Loading...</div>

            <!-- Show listings when data is available -->
            <div v-else>
                <!-- Grid Layout for Listings -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="(item, index) in listing"
                        :key="item.id"
                        class="relative rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                        <!-- Featured Badge -->
                        <div
                            v-if="item.featured"
                            class="absolute right-4 top-4 rounded-l-lg bg-yellow-500 px-4 py-2 text-xs font-semibold uppercase text-white"
                        >
                            Featured
                        </div>

                        <!-- Listing Image -->
                        <div class="mb-6">
                            <img
                                :src="
                                    item.images && item.images.length > 0
                                        ? item.images[0].path
                                        : 'https://mnlht.com/wp-content/uploads/2017/06/no_image_placeholder.png'
                                "
                                :alt="item.title"
                                class="h-56 w-full rounded-md object-cover"
                                loading="lazy"
                            />
                        </div>

                        <!-- Title and Description -->
                        <h3 class="text-2xl font-semibold text-gray-900">{{ item.title }}</h3>
                        <p class="mt-3 text-gray-600">{{ item.description }}</p>

                        <!-- Posted By -->
                        <div class="mt-4 flex items-center text-sm text-gray-600">
                            <span>Posted by</span>
                            <span class="ml-1 font-semibold text-blue-600">{{ item.owner.name }}</span>
                            <span>&nbsp; ({{item.timestamps.created_at}})</span>
                        </div>

                        <!-- Delete Button -->
                        <div class="absolute left-4 top-4">
                            <button @click="deleteListing(item.id)" class="text-red-500 hover:text-red-700 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="mt-6 text-right">
                            <Link :href="route('list.details', { id: item.id })" class="font-semibold text-blue-500 hover:text-blue-700">
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
