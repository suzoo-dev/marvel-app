import { FunctionComponent, useEffect, useState } from "react";
import { useCharacters } from "../api/useCharacters";
import { Pagination, Character } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";

export const Characters: FunctionComponent = () => {
  const [searchtext, setSearchtext] = useState<string>("");
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 30,
    offset: 0,
    total: 0,
    count: 0,
  });
  const { data, isSuccess, isPending, isFetching, refetch } = useCharacters(
    searchtext,
    pagination
  );

  const queryClient = useQueryClient();

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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtext(event.target.value);
  };

  const handleOnSearch = () => {
    queryClient.cancelQueries({ queryKey: ["characters"] });
    setCharacterList([]);
    refetch();
  };

  const handleCharacterSelect = (characterName: string) => {
    alert(characterName);
    setCharacterList([]);
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
      <h3>Find a Marvel character:</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "350px",
        }}
      >
        <div>
          <input
            name="search"
            type="text"
            onChange={handleOnChange}
            value={searchtext}
            style={{ width: "200px", height: "40px" }}
          />
          <div
            style={{
              display: "flex",
              position: "fixed",
              border: `${
                (isPending && isFetching) || (isSuccess && !!searchtext)
                  ? "1px solid white"
                  : "none"
              }`,
              width: "200px",
              height: `${isFetching ? "30px" : isSuccess ? "280px" : "0px"}`,
              overflowY: "auto",
              textAlign: "left",
              paddingLeft: "8px",
              transition: "height ease 200ms",
            }}
          >
            {isPending && isFetching && <p>Loading...</p>}
            {isSuccess && (
              <ul>
                {characterList?.map((character: Character) => (
                  <CharacterSelect name={character.name} key={character.name} />
                ))}
              </ul>
            )}
          </div>
        </div>
        <button style={{ height: "3em" }} onClick={handleOnSearch}>
          Search
        </button>
      </div>
    </>
  );
};
