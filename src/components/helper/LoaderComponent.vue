<template>
    <div class="text-center">
        <v-dialog
            v-if="loading"
            v-model="loading"
            hide-overlay
            persistent
            width="300"
        >
            <v-card
                color="primary"
                dark
            >
                <v-card-text>
                    Please wait...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
    import { onMounted,ref,computed,watch } from 'vue';
    const loading = ref(false);
    const show = () => {
        loading.value = true;
    }
    const hide = () => {
        loading.value = false
    }
</script>
<style scoped>
</style>