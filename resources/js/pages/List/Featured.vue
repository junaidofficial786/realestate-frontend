<script setup>
import axios from '@/axios.js';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const listing = ref([]);
const loading = ref(true);

onMounted(() => {
    axios
        .get('/listings/featured')
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

</script>

<template>
    <AppLayout>
        <Head title="Listing" />

        <div class="mx-auto max-w-7xl p-6">
            <h1 class="mb-6 text-3xl font-semibold text-gray-800">Welcome to the Featured Listing Page</h1>

            <!-- Show Loading message until the data is fetched -->
            <div v-if="loading" class="text-center text-gray-500">Loading...</div>

            <!-- Show listings when data is available -->
            <div v-else>
                <!-- Grid Layout for Listings -->
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(item, index) in listing" :key="item.id" class="relative rounded-lg bg-white p-6 shadow-md">
                        <!-- Featured Badge -->
                        <div
                            v-if="item.featured"
                            class="absolute right-0 top-0 rounded-l-lg bg-yellow-500 px-3 py-1 text-xs font-semibold text-white"
                        >
                            Featured
                        </div>

                        <!-- Listing Image -->
                        <div class="mb-4">
                            <img
                                :src="
                                    item.images && item.images.length > 0
                                        ? item.images[0].path
                                        : 'https://mnlht.com/wp-content/uploads/2017/06/no_image_placeholder.png'
                                "
                                :alt="item.title"
                                class="h-48 w-full rounded-md object-cover"
                                loading="lazy"
                            />
                        </div>

                        <!-- Title and Description -->
                        <h3 class="text-2xl font-bold text-gray-900">{{ item.title }}</h3>
                        <p class="mt-2 text-gray-700">{{ item.description }}</p>

                        <!-- Posted By -->
                        <div class="mt-4 flex items-center text-sm text-gray-600">
                            <span>Posted by</span>
                            <span class="ml-1 font-semibold text-blue-600">{{ item.owner.name }}</span>
                        </div>

                        <div class="mt-6 text-right">
                            <Link :href="route('list.details', { id: item.id })" class="font-semibold text-blue-500 hover:text-blue-700"
                            >View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
