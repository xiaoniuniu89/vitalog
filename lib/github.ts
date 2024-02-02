import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_GITHUB_TOKEN,
});

export default octokit;
