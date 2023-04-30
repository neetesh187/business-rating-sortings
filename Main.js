import React, { useState } from "react";
import jsonData from "./jsondata.json";
import "./main.css";

function Main() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("ascending");

  const renderCards = (data) => {
    return data.map((item) => {
      return (
        <div className="card-container">
        <div key={item.id} className="card">
          <img src={item.photo} alt={item.name} />
          <div className="content">
            <li>{item.name}</li>
            <div className="rating">
              {[...Array(Math.round(item.rating))].map((e, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      );
    });
  };

  const filterData = () => {
    let filteredData = [...jsonData.restaurants, ...jsonData.hotels];

    if (category !== "all") {
      filteredData = filteredData.filter((item) => item.type === category);
    }

    if (sort === "ascending") {
      filteredData = filteredData.sort((a, b) => a.rating - b.rating);
    } else {
      filteredData = filteredData.sort((a, b) => b.rating - a.rating);
    }

    return filteredData;
  };

  return (
    <div className="App">
      <h1>Food Places</h1>
      <div className="filter-container">
        <label htmlFor="category-select">Filter by category:</label>
        <select
          name="category-select"
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hotel</option>
        </select>
        <label htmlFor="sort-select">Sort by rating:</label>
        <select
          name="sort-select"
          id="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="card-container">{renderCards(filterData())}</div>
    </div>
  );
}

export default Main;
