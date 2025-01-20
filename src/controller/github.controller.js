class GitHubController{
    constructor(http){
        this.http = http
    }
    async searchRepo(query)
    {
        try{
            const result = await this.http.get(`https://api.github.com/search/repositories?q=${query}`)
            return result;
        }catch(error)
        {
            throw Error(error)
        }
    }
    async repoDetails(owner,repo)
    {
        try{
            const result = await this.http.get(`https://api.github.com/repos/${owner}/${repo}`)
            return result
        }catch(error)
        {
            throw Error(error)
        }
    }
    async listIssues(owner,repo,state)
    {
        try{
            const result = await this.http.get(`https://api.github.com/repos/${owner}/${repo}/issues?state=${state}`)
            return result
        }catch(error)
        {
            throw Error(error)
        }
    }

}
export default GitHubController;