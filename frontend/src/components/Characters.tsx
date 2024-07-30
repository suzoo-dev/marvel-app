import { FunctionComponent, useEffect } from "react";
import { useCharacters } from "../api/useCharacters";

export const Characters: FunctionComponent = () => {
  const { data } = useCharacters();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <h3>Characters:</h3>
    </>
  );
};
