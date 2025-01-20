<template>
    <div>
      <v-card class="mx-auto" color="surface-light" height="650" width="600">
          <h1 class="pa-4">
            SEARCH GITHUB
          </h1>
          <v-card-text>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              placeholder="Type words to search......"
              v-model="query"
              label="Search templates"
              variant="solo"
              hide-details
              single-line
            ></v-text-field>
          </v-card-text>
          <div v-for="repo in historyList" :key="repo.id">
            <repository-component :name="repo.full_name" :avatar="repo.owner.avatar_url" @click="openDialog(repo)"/>
          </div>
          <v-pagination class="pagination mb-2" v-model="page" :length="pages" @update:model-value="updatePage"></v-pagination>
          <repository-details :is-visible="dialogVisible" @update:is-visible="dialogVisible = $event" :repository="repoDetails"/>
          <SnackbarComponent 
            v-if="snackbarVisible" 
            :model-value="snackbarVisible" 
            :timeout="snackbarTimeout"
            :color="snackbarColor"
            :text="snackbarText"
            @update:model-value="snackbarVisible = $event"
          />
      </v-card>
    </div>
</template>
<script setup>
    import { onMounted,ref,computed,watch,inject } from 'vue';
    import SnackbarComponent from '../components/helper/SnackbarComponent.vue';
    import RepositoryComponent from '../components/RepositoryComponent.vue';
    import RepositoryDetails from '../components/RepositoryDetails.vue';
    import GitHubController from '../controller/github.controller';
    import debounce from 'lodash.debounce'

    const loading = ref(false);
    const query = ref('');
    const page = ref(1);
    const repoDetails = ref({});
    const pageSize = ref(4);
    const listCount = ref(0);
    const historyList = ref([]);
    const results = ref([]);
    const http = inject('http')
    const snackbarVisible = ref(false);
    const snackbarColor = ref('info');
    const snackbarTimeout = ref(5000);
    const snackbarText = ref('');
    const githubController = ref(null);
    const dialogVisible = ref(false);
    
    onMounted(async ()=>{
        githubController.value = new GitHubController(http);
    })

    const search = debounce(async () => {
      page.value = 1;
      
      if (!query.value.trim()) {
        historyList.value = [];
        results.value = [];
        initPage()
        updatePage(page.value);
        return;
      }
      loading.value = true;
      try {
        const response = await githubController.value.searchRepo(query.value); 
        results.value = response.data.items || [];
      } catch (error) {
        console.error('Searching Error:',error)
        snackbarText.value = 'Failed to fetch data.';
        snackbarColor.value = 'error';
        snackbarVisible.value = true;
      } finally {
        loading.value = false;
        initPage()
        updatePage(page.value);
      }
    }, 300);
    const initPage = () => {
        listCount.value = results.value.length;
        if(listCount.value < pageSize.value)
        {
            historyList.value = results.value;
        }else {
            historyList.value = results.value.slice(0, pageSize.value);
        }
    }
    const updatePage = (pageIndex)=>{
		    let _start = (pageIndex - 1) * pageSize.value;
		    let _end = pageIndex * pageSize.value;
		    historyList.value = results.value.slice(_start, _end);
		    page.value = pageIndex;
    }
    const pages = computed(()=>{
        if(pageSize.value == null || listCount.value == null) return 0;
        return Math.ceil(listCount.value / pageSize.value);
    })
    watch(query,()=>{
        search();
    })
    const openDialog = async (repo) => {
        try {
            const response = await githubController.value.repoDetails(repo.owner.login,repo.name); 
            repoDetails.value = response.data || {};
            dialogVisible.value = true;
        } catch (error) {
            console.error('Fetching Details:', error);
        }
        
    }
</script>
<style scoped>
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
</style>