import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useCharacters } from "../api/useCharacters";
import { Character } from "../types/types";
import { useQueryClient } from "@tanstack/react-query";

export const Characters: FunctionComponent = () => {
  const [searchtext, setSearchtext] = useState<string>("");
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const { data, isSuccess, isPending, isFetching, refetch } =
    useCharacters(searchtext);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const res = data?.data.data;
      setCharacterList(res?.results);
    }
  }, [data]);

  const handleOnSearch = useCallback(() => {
    // Cancel pending queries if new search is requested
    queryClient.cancelQueries({ queryKey: ["characters"] });
    setCharacterList([]);
    refetch();
  }, [refetch, queryClient]);

  useEffect(() => {
    // Check searchtext length is greater than 1, if so perform search to populate auto-suggest dropdown
    if (searchtext.length > 1) {
      handleOnSearch();
    }
  }, [searchtext, handleOnSearch]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtext(event.target.value);
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
            style={{ width: "18em", height: "3em" }}
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
              width: "calc(15em - 2px)",
              maxHeight: `${
                isFetching ? "2em" : isSuccess && !!searchtext ? "20em" : "0em"
              }`,
              overflowY: "auto",
              textAlign: "left",
              paddingLeft: "8px",
              transition: "max-height ease 200ms",
            }}
          >
            {isFetching && characterList.length === 0 && <p>Loading...</p>}
            {isSuccess && (
              <ul>
                {characterList?.map((character: Character) => (
                  <CharacterSelect name={character.name} key={character.name} />
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
          style={{ height: "3em" }}
          onClick={handleOnSearch}
          disabled={searchtext.length < 2}
        >
          Search
        </button>
      </div>
    </>
  );
};
