import React, { useState } from "react";
import Select from "react-select";

const Search = () => {
  const [sortCategory, setSortByCategory] = useState({
    value: "All Categories",
    label: "All Categories",
  });
  const sortByCategoryOptions = [
    { value: "Education", label: "Education" },
    { value: "Course", label: "Course" },
    { value: "Art", label: "Art" },
    { value: "Web Design", label: "Web Design" },
  ];
  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6">
          <span className="select-label d-block">Search Style 01</span>
          <div className="rbt-search-with-category">
            <div className="filter-select rbt-modern-select search-by-category">
              <Select
                instanceId="sortBySelect"
                className="react-select react-select2 text-start"
                classNamePrefix="react-select"
                defaultValue={sortCategory}
                onChange={setSortByCategory}
                options={sortByCategoryOptions}
              />
            </div>
            <div className="search-field">
              <input type="text" placeholder="Search Course" />
              <button className="rbt-round-btn serach-btn" type="submit">
                <i className="feather-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-5 offset-lg-1">
          <div className="filter-select rbt-modern-select search-by-category">
            <span className="select-label d-block">Short By</span>
            <Select
              instanceId="sortBySelect"
              className="react-select"
              classNamePrefix="react-select"
              defaultValue={sortCategory}
              onChange={setSortByCategory}
              options={sortByCategoryOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
