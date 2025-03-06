<script setup>
import axios from '@/axios.js';
import AppLayout from '@/layouts/AppLayout.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const page = usePage();
const listingId = page.props.id;
const error = ref(null);
const listingDetails = ref({});
const isLoading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get(`/listings/${listingId}`);
        listingDetails.value = response.data.data;

        // Populate form fields with fetched listing details
        form.value.title = listingDetails.value.title;
        form.value.description = listingDetails.value.description;
        form.value.featured = listingDetails.value.featured;

        // Handle the existing images
        // form.value.images = listingDetails.value.images;

        // Populate previewImages for existing images
        form.value.previewImages = listingDetails.value.images.map(image => ({
            name: image.path.split('/').pop(), // Extract the filename
            preview: image.path, // Use the existing image URL as the preview
        }));


    } catch (err) {
        console.log(err);
        error.value = 'An error occurred while fetching the listing details.';
    } finally {
        isLoading.value = false; // Set loading to false when data has been fetched
    }
});


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

        // Append images to FormData only if new images are selected
        if (form.value.images.length > 0) {
            form.value.images.forEach((image) => {
                // Append the new images as File objects
                formData.append('images[]', image);
            });
        }

        // If no new images, append existing image paths if required (depending on your backend logic)
        if (listingDetails.value.images && listingDetails.value.images.length > 0) {
            listingDetails.value.images.forEach((image) => {
                // Only append the image path if it's a required field in your backend
                formData.append('existing_images[]', image.path); // Or adjust based on your backend's requirements
            });
        }

        // Send the request to the server
        const response = await axios.post('/listings/' + listingId + '?_method=PUT', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        alert("Updated successfully");

        console.log('Updated successfully:', response.data);
    } catch (error) {
        alert('Something went wrong!');
        console.error('Error submitting form:', error);
    }
};

</script>

<template>
    <Head title="Update" />
    <AppLayout>
        <div class="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h2 class="mb-6 text-2xl font-semibold">Update Post</h2>

            <form @submit.prevent="submitForm">
                <!-- Title Input -->
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
                    <div v-if="form?.previewImages" class="mt-2">
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
                    Update
                </button>
            </form>
        </div>
    </AppLayout>
</template>

<style scoped>
/* Tailwind CSS is already used, so no custom styling needed */
</style>
