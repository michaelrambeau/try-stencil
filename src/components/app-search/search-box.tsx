import { Component, h, Event, EventEmitter } from "@stencil/core";
import debounce from "debounce-fn";

@Component({
  tag: "search-box",
  styleUrl: "search-box.css",
  shadow: true
})
export class SearchBox {
  @Event() queryChange: EventEmitter;

  emitChange = debounce(value => this.queryChange.emit(value), { wait: 200 });

  handleChange = event => {
    this.emitChange(event.target.value);
  };

  render() {
    return (
      <div class="search-box-container">
        <input type="text" onInput={this.handleChange} />
      </div>
    );
  }
}
