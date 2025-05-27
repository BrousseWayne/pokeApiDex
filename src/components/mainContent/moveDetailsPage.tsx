import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../index.css";

export function TestRoute() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { moveId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/moves`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moveName: moveId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [moveId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;

  console.log(data);

  const {
    name = "N/A",
    accuracy = "N/A",
    pp = "N/A",
    priority = "N/A",
    power = "N/A",
    damage_class = "N/A",
    learned_by_pokemon = [],
    effect_entries = [],
    generation = "N/A",
  } = data;

  return (
    <div className="testFlex">
      <h1 className="testFlex2">{name}</h1>
      <ul className="moveDetails">
        <li>PP: {pp}</li>
        <li>Priority: {priority}</li>
        <li>Power: {power}</li>
        <li>Accuracy: {accuracy}</li>
      </ul>
      {/* <div>Damage Class: {damage_class}</div> */}
      {/* <div>Learned by: {learned_by_pokemon.join(", ") || "No Pokémon"}</div>
      <div>
        Effects:
        <ul>
          {effect_entries.map((entry, index) => (
            <li key={index}>{entry.effect}</li>
          ))}
        </ul>
      </div> */}
      {/* <div>Generation: {generation}</div> */}
    </div>
  );
}
