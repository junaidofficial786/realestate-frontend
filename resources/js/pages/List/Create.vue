
<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import axios from '@/axios.js';
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';

const form = ref({
    title: '',
    description: '',
    featured: 0, // 0 = No, 1 = Yes
    images: [],
});

// Handle file change (multiple files) and generate preview URLs
const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    form.value.images = files;

    form.value.previewImages = files.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file), // Generate a preview URL
    }));
};

// Submit form data using Axios
const submitForm = async () => {
    try {
        const formData = new FormData();
        formData.append('title', form.value.title);
        formData.append('description', form.value.description);
        formData.append('featured', form.value.featured);

        // Append images to FormData
        form.value.images.forEach((image) => {
            formData.append('images[]', image); // Append the image file, not the preview URL
        });

        // Send the request to the server (replace with your API endpoint)
        const response = await axios.post('/listings', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert('success')
        console.log('Form submitted successfully:', response.data);
    } catch (error) {
        alert('Something went wrong')
        console.error('Error submitting form:', error);
    }
};
</script>

<template>
    <Head title="Create New List" />
    <AppLayout>
        <div class="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h2 class="mb-6 text-2xl font-semibold">Upload New List</h2>

            <form @submit.prevent="submitForm">
                <!-- Title Input -->
                <div class="mb-4">
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        v-model="form.title"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        placeholder="Enter title"
                        required
                    />
                </div>

                <!-- Description Input -->
                <div class="mb-4">
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        v-model="form.description"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        placeholder="Enter description"
                        required
                    ></textarea>
                </div>

                <!-- Featured Radio Buttons -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Featured</label>
                    <div class="mt-2 flex items-center space-x-6">
                        <label for="featured-yes" class="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="featured-yes"
                                v-model="form.featured"
                                :value="1"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span class="text-sm text-gray-700">Yes</span>
                        </label>
                        <label for="featured-no" class="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="featured-no"
                                v-model="form.featured"
                                :value="0"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span class="text-sm text-gray-700">No</span>
                        </label>
                    </div>
                </div>

                <!-- Image Upload -->
                <div class="mb-4">
                    <label for="images" class="block text-sm font-medium text-gray-700">Images</label>
                    <input
                        type="file"
                        id="images"
                        @change="handleFileChange"
                        multiple
                        class="mt-1 block w-full rounded-md border border-gray-300 text-sm text-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                    <div v-if="form.images.length" class="mt-2">
                        <h4 class="text-sm font-medium text-gray-700">Selected Images:</h4>
                        <div class="mt-2 flex space-x-4">
                            <div v-for="(image, index) in form.previewImages" :key="index" class="h-20 w-20">
                                <img :src="image.preview" alt="Image Preview" class="h-full w-full rounded-md object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    class="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    </AppLayout>
</template>


<style scoped>
/* Tailwind CSS is already used, so no custom styling needed */
</style>
