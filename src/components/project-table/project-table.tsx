import { Component, Prop, h } from "@stencil/core";

import { Project } from "../../bestofjs";

@Component({
  tag: "project-table",
  styleUrl: "project-table.css"
})
export class ProjectTable {
  @Prop() projects: Array<Project>;
  render() {
    return (
      <div>
        <h3>Projects ({this.projects.length})</h3>
        <table>
          <tbody>
            {this.projects.map(project => (
              <tr>
                <td>
                  <project-avatar project={project} />
                </td>
                <td>{project.name}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
