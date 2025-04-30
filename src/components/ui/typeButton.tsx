import "./type.css";

type PokemonButtonType = {
  type: string;
};

export const TypeButton = ({ type }: PokemonButtonType) => {
  return <p className={`type-${type} type-icon `}>{type.toUpperCase()}</p>;
};
