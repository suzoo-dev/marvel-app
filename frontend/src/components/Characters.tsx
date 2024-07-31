import { FunctionComponent, useEffect, useState } from "react";
import { useCharacters } from "../api/useCharacters";

type Character = {
  comics: object;
  description: string;
  events: object;
  id: number;
  name: string;
  resourceURI: string;
  series: object;
  stories: object;
  thumbnail: object;
  urls: object[];
};

export type Pagination = {
  offset: number;
  limit: number;
  total: number;
  count: number;
};

export const Characters: FunctionComponent = () => {
  const [searchtext, setSearchtext] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    total: 0,
    count: 0,
  });
  const { data, isSuccess, isLoading } = useCharacters(searchtext, pagination);

  useEffect(() => {
    if (data) {
      const res = data?.data.data;
      setCharacterList(res?.results);
      setPagination({
        offset: res?.offset,
        limit: res?.limit,
        total: res?.total,
        count: res?.count,
      });
    }
  }, [data]);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtext(event.target.value);
  };

  const handleCharacterSelect = (characterName: string) => {
    alert(characterName);
    setSearchtext("");
  };

  return (
    <>
      <h3>Search:</h3>
      <div style={{ width: "300px" }}>
        <input
          name="search"
          type="text"
          onChange={handleOnSearch}
          value={searchtext}
          style={{ width: "100%", height: "30px" }}
        />
        {searchtext.length > 1 && (
          <div
            style={{
              border: "1px solid white",
              width: "100%",
              maxHeight: "280px",
              overflowY: "auto",
              textAlign: "left",
              paddingLeft: "8px",
            }}
          >
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
              <ul>
                {characterList?.map((character: Character) => (
                  <li
                    key={character.name}
                    onClick={() => handleCharacterSelect(character.name)}
                  >
                    {character.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};
