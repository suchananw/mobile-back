import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Show.css";

export default class Show extends Component {

  render() {
    const { cat } = this.props

    return (
      <div class="col-sm-4">
      <Link to={`/cat/${cat.id}`}>
        <img
          class="item img-thumbnail"
          src={cat.img}
          alt={cat.name}
        />
        </Link>
        <p className="text-uppercase">{cat.name}</p>
      </div>
    );
  }
}
