<script setup>
import axios from '@/axios.js';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const me = ref(null);
const profileImage = ref('');
const error = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const response = await axios.get(`/me`);
        console.log(response.data);
        me.value = response.data;
    } catch (err) {
        error.value = 'An error occurred while fetching my details.';
    } finally {
        isLoading.value = false;
    }
});

// Handle file upload
const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Check if the file is an image
    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = () => {
            profileImage.value = reader.result; // Update the profile image to the uploaded file
        };
        reader.readAsDataURL(file); // Convert the image file to a data URL
    } else {
        alert('Please upload a valid image');
    }
};

const updateProfileImage = async () => {
    try {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select an image before uploading');
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // The key 'image' should match the backend validation

        // Send POST request with the file
        const response = await axios.post('/profile-image/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Optional, axios sets this by default
            },
        });

        if (response.status === 200) {
            alert('Profile image updated successfully!');
            // window.location.reload(); // Reload the page
        }
    } catch (err) {
        console.error('Error uploading image:', err);
        alert('An error occurred while uploading the image.');
    }
};

</script>

<template>
    <AppLayout>
        <Head title="Profile" />
        <div v-if="isLoading">Loading....</div>
        <div v-if="me" class="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <!-- Profile Image -->
            <div class="mb-4 flex justify-center">
                <div class="relative">
                    <img
                        :src="profileImage || me.data?.profile_image?.path?.path"
                        alt="Profile Image"
                        class="h-32 w-32 transform cursor-pointer rounded-full object-cover transition-transform hover:scale-105"
                        @click="document.getElementById('fileInput').click()"
                    />
                    <input type="file" id="fileInput" class="absolute inset-0 cursor-pointer opacity-0" @change="handleImageUpload" />
                </div>
            </div>

            <!-- Name and Email -->
            <div class="text-center">
                <h2 class="text-2xl font-semibold text-gray-800">{{ me.data.name }}</h2>
                <p class="text-gray-600">{{ me.data.email }}</p>
            </div>

            <!-- Update Profile Image Button -->
            <div class="text-center">
                <button
                    class="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    @click.prevent="updateProfileImage"
                >
                    Update Profile Image
                </button>
            </div>
        </div>

        <!-- Error handling -->
        <div v-if="error" class="mt-4 text-center text-red-500">
            {{ error }}
        </div>
    </AppLayout>
</template>


<style scoped></style>
