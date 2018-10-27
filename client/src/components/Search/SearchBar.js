import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  render() {
    return (
      <div class="container-fluid bg-light ">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-2 pt-3">
            <div class="form-group ">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Keyword"
                aria-label="Search"
              />
            </div>
          </div>
          <div class="col-md-2 pt-3">
            <div class="form-group">
              <select id="inputState" class="form-control">
                <option disabled selected>
                  Gender
                </option>
                <option value="">Female</option>
                <option value="">Male</option>
              </select>
            </div>
          </div>
          <div class="col-md-2 pt-3">
            <div class="form-group">
              <select id="inputState" class="form-control">
                <option disabled selected>
                  Budget
                </option>
                <option value="">Any</option>
                <option value="">0-500</option>
                <option value="">501-1000</option>
                <option value="">1001-1500</option>
              </select>
            </div>
          </div>
          <div class="col-md-2 pt-3">
            <div class="form-group">
              <select id="inputState" class="form-control">
                <option disabled selected>
                  Type
                </option>
                <option value="">BMW</option>
                <option value="">Audi</option>
                <option value="">Maruti</option>
                <option value="">Tesla</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-primary btn-block">
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}
