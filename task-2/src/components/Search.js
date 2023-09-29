import React from "react";
import Input from "./Input";
import styles from "./Search.module.css";

function Search({ onChange, onSubmit, value }) {
  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Enter Location"
          required
          onChange={onChange}
          value={value}
        />
        <button className={styles.subBtn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
