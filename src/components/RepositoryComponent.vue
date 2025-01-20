<template>
    <div>
        <v-card
            class="mx-auto my-2"
            max-width="400"
            link
        >
            <v-card-title>
                <v-avatar class="me-3" size="20">
                    <v-img :src="avatar" alt="Avatar image" />
                </v-avatar>
                <span>{{ name }}</span>
            </v-card-title>
            <v-card-text>
                <p class="text-secondary">{{ subtitle }}</p>
            </v-card-text>
        </v-card>
    </div>
</template>
<script setup>
    const subtitle = "Click for more details";
    defineProps({
        name: {
            type: String,
        },
        avatar:{
            type: String,
        }
    })
</script>
<style scoped>    
</style>