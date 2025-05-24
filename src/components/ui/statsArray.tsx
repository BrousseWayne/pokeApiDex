//refacto use a list of stats
export function StatsArray({ stats }) {
  return (
    <div className="pokemon-stats">
      <div className="stat-row">
        <span>HP</span>
        <span>Atk</span>
        <span>Def</span>
        <span>SpA</span>
        <span>SpD</span>
        <span>Spe</span>
      </div>
      <div className="value-row">
        {stats.map((stat) => (
          <span key={stat.stat.name}>{stat.base_stat}</span>
        ))}
      </div>
    </div>
  );
}

export function MoveStatsArray({ move }) {
  return (
    <div className="pokemon-stats">
      <div className="stat-row">
        <span>Power</span>
        <span>Accuracy</span>
        <span>PP</span>
      </div>

      <div className="value-row">
        <span>{move.power || "-"}</span>
        <span>{move.accuracy || "-"}</span>
        <span>{move.pp || "-"}</span>
      </div>
    </div>
  );
}
