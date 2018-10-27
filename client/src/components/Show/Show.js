import React, { Component } from "react";
import "./Show.css";

export default class Show extends Component {
  render() {
    return (
      <div class="col-sm-4">
        <img
          class="item img-thumbnail"
          src={this.props.img}
          alt={this.props.name}
        />
        <p className="text-uppercase">{this.props.name}</p>
      </div>
    );
  }
}
