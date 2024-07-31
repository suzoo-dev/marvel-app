import { FunctionComponent, useEffect, useState } from "react";
import { useCharacters } from "../api/useCharacters";
import { Pagination, Character } from "../types/types";

export const Characters: FunctionComponent = () => {
  const [searchtext, setSearchtext] = useState<string>("");
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
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

  const CharacterSelect = ({ name }: { name: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <li
        style={{
          cursor: "pointer",
          backgroundColor: isHovered ? "#484848" : "#242424",
        }}
        onClick={() => handleCharacterSelect(name)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </li>
    );
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
                  <CharacterSelect name={character.name} key={character.name} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};
