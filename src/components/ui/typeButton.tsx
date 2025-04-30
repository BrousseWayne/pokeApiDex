import "./type.css";

export const types = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

type PokemonButtonType = {
  type: string;
};

export const TypeButton = ({ type }: PokemonButtonType) => {
  return <a className={`type-${type} type-icon `}>{type.toUpperCase()}</a>;
};
