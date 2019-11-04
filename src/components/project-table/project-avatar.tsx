import { Component, Prop, h } from "@stencil/core";
import { Project } from "../../bestofjs";
import { getProjectAvatarURL } from "../../app/projects";

@Component({
  tag: "project-avatar"
})
export class ProjectAvatar {
  @Prop() project: Project;
  @Prop() size: number = 50;
  render() {
    const url = getProjectAvatarURL(this.project, this.size);
    return (
      <img
        src={url}
        width={this.size}
        height={this.size}
        alt={this.project.name}
      />
    );
  }
}
