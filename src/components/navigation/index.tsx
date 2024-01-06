"use client";

import { useState } from "react";
import Button from "../button";
import Input from "../input";
import { Nav } from "./navigation.styles";

const Navigation = () => {
  const [search, setSearch] = useState("");

  return (
    <Nav>
      <Button text="Menu" />
      <Input
        value={search}
        onChange={setSearch}
        placeholder="What's your question about?"
        disabled={false}
        id="search-input"
      />
      <Button text="Developing in Amsterdam" />
    </Nav>
  );
};

export default Navigation;
