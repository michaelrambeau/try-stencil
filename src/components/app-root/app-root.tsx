import { Component, h } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <div class="container">
            <h1>Best of JavaScript + Stencil</h1>
          </div>
        </header>

        <main class="container">
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-search" exact={true} />
              <stencil-route
                url="/search"
                component="app-search"
                exact={true}
              />
              <stencil-route url="/profile/:name" component="app-profile" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
