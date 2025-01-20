<template>
    <v-dialog :model-value="isVisible" @update:model-value="closeDialog" max-width="500">
          <v-card title="View Issues">
            <v-card-text>
                <v-switch
                    v-model="model"
                    :label="`State: ${state.toString()}`"
                    hide-details
                    inset
                    @change="handleSwitchChange"
                ></v-switch>
                <ul id="scroll">
                    <li v-for="issue in issues" :key="issue.id">
                        <a :href="issue.html_url" target="_blank">{{ issue.title }}</a>
                        <v-divider :thickness="10"></v-divider>
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Close"
                variant="text"
                @click="closeDialog"
              ></v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
</template>
<script setup>
    import { ref, onMounted ,inject} from 'vue';
    import GitHubController from '../controller/github.controller';
    import { defineEmits } from 'vue';

    const emit = defineEmits(['update:isVisible','update:issues']);
    const state = ref('open');
    const http = inject('http')
    const model = ref(true);
    const githubController = ref(null);
    const props = defineProps({
            repository: {
            type: Object,
            required: true,
        },
            isVisible: {
            type: Boolean,
            required: true,
        },
            issues:{
            type: Array,
        }
    });

    onMounted(async ()=>{
        githubController.value = new GitHubController(http);
    })
    const closeDialog = () => {
        emit('update:isVisible', false);
    }
    const handleSwitchChange = async () => {
        try {
            if(model.value==true)
            {
                state.value = 'open';
            }
            else{
                state.value ='closed'
            }
            const response = await githubController.value.listIssues(props.repository.owner.login,props.repository.name,state.value);
            emit('update:issues', response.data || []);
        } catch (error) {
            console.error('Error Fetching Issues:', error);
        }
    }
</script>
<style scoped>
#scroll {
    overflow-y: auto;
    width: fit-content;
    block-size: fit-content;
}

</style>