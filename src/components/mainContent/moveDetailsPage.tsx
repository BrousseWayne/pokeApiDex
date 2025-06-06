import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../index.css";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { TypeButton } from "../ui/typeButton";

export function StatsCard({ stats }) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    name = "N/A",
    accuracy = "N/A",
    pp = "N/A",
    priority = "N/A",
    power = "N/A",
    damage_class = [],
  } = stats;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="statsBoxContainer">
      <div className="flex-row-between" onClick={toggleOpen}>
        <div>Stats</div>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>

      {isOpen && (
        <div>
          <div className="moveCard">
            <div className="moveRow category">
              <span className="label">Category</span>
              <span className="value">
                {capitalizeFirstLetter(damage_class.name)}
              </span>
            </div>

            <div className="moveRow">
              <span className="label">PP</span>
              <span className="value">{pp}</span>
            </div>
            <div className="moveRow">
              <span className="label">Power</span>
              <span className="value">{power}</span>
            </div>
            <div className="moveRow">
              <span className="label">Accuracy</span>
              <span className="value">{accuracy}%</span>
            </div>
          </div>
          <div className="statsDataRow"></div>
        </div>
      )}
    </div>
  );
}

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
    damage_class = [],
    type = [],
    learned_by_pokemon = [],
    effect_entries = [],
    generation = "N/A",
  } = data;
  console.log(data.type.name);

  return (
    <div className="flex items-start justify-between">
      <div className="nameTypeBox">
        <div>{capitalizeFirstLetter(name)}</div>
        <TypeButton key={name} type={type.name} />
      </div>
      <div className="center-box-stats">
        <StatsCard
          stats={{ name, accuracy, priority, power, pp, damage_class }}
        />
      </div>
    </div>
  );
}
