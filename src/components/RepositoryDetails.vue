<template>
        <v-dialog :model-value="isVisible" @update:model-value="closeDialog" max-width="500">
          <v-card :title="`Details: ${repository.name}`">
            <v-card-text>
              <h4>Owner: <span class="text-secondary">{{ repository.owner.login }}</span></h4>
              <h4>Description: <span class="text-secondary">{{ repository.description }}</span></h4>
              <h4>URL: <a :href="repository.html_url" target="_blank">{{ repository.html_url }}</a></h4>
              <h4>Forks: <span class="text-secondary">{{ repository.forks }}</span></h4>
              <h4>Stargazers: <span class="text-secondary">{{ repository.stargazers_count }}</span></h4>
              <h4>Open Issues: <span class="text-secondary">{{ repository.open_issues }}</span></h4>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Close"
                variant="text"
                @click="closeDialog"
              ></v-btn>

              <v-btn
                color="surface-variant"
                text="View Issues"
                variant="flat"
                @click="openDialog(repository)"
              ></v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <view-issues :is-visible="dialogVisible"
      @update:is-visible="dialogVisible = $event" :issues="issues" :repository="repository" @update:issues="updateIssues"/>
</template>
<script setup>
    import { ref ,inject,onMounted} from 'vue';
    import ViewIssues from './ViewIssues.vue';
    import GitHubController from '../controller/github.controller';
    import { defineEmits } from 'vue';
    const http = inject('http')
    const githubController = ref(null);
    const dialogVisible = ref(false);
    const state = ref('open');
    const repo = ref({});
    const issues = ref([]);
    const emit = defineEmits(['update:isVisible']);
    const props = defineProps({
      repository: {
        type: Object,
        required: true,
      },
      isVisible: {
        type: Boolean,
        required: true,
      },
    });

    onMounted(()=>{
        githubController.value = new GitHubController(http);
    })

    const openDialog = async (repo) => {
        try {
          const response = await githubController.value.listIssues(props.repository.owner.login,props.repository.name,state.value);
          issues.value = response.data || [];
          repo.value = props.repository || {};
          dialogVisible.value = true;
        } catch (error) {
            console.error('Error Fetching Details:', error);
        }
        
    }
    const updateIssues = (newIssues) => {
        issues.value = newIssues; 
    };
    const closeDialog = () => {
        emit('update:isVisible', false);
    }
</script>
<style scoped>
    
</style>