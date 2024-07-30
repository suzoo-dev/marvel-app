import { FunctionComponent, useEffect, useState } from "react";
import { useCharacters } from "../api/useCharacters";

export const Characters: FunctionComponent = () => {
  const [searchtext, setSearchtext] = useState("");
  const { data } = useCharacters(searchtext);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtext(event.target.value);
  };

  return (
    <>
      <h3>Search:</h3>
      <input
        name="search"
        type="text"
        onChange={handleOnSearch}
        value={searchtext}
      />
    </>
  );
};
