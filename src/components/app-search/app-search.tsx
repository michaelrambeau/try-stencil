import { Component, h, State, Listen } from "@stencil/core";

import { Project } from "../../bestofjs";
import { fetchProjects, filterProjectsByQuery } from "../../app/projects";

@Component({
  tag: "app-search"
})
export class Search {
  @State() projects: Array<Project> = [];
  @State() loading: boolean = true;
  @State() error: Error;
  @State() query: string = "";

  componentWillLoad() {
    return fetchProjects()
      .then(data => {
        this.loading = false;
        this.projects = data;
      })
      .catch(error => {
        this.loading = false;
        this.error = error;
      });
  }

  @Listen("queryChange")
  queryChangeHandler(event: CustomEvent) {
    const query = event.detail;
    this.query = query;
  }

  render() {
    if (this.loading) return <div>Loading...</div>;
    if (this.error) return <div>{this.error.message}</div>;

    const filteredProjects = this.query
      ? filterProjectsByQuery(this.projects, this.query)
      : this.projects;

    const paginatedProjects = filteredProjects.slice(0, 50);

    return (
      <div>
        <search-box />
        <project-table projects={paginatedProjects} />
      </div>
    );
  }
}
