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
