interface DataPoint { date: string; count: number; total?: number }

interface BarChartProps {
  data: DataPoint[];
  valueKey?: 'count' | 'total';
  color?: string;
  height?: number;
  formatValue?: (v: number) => string;
}

export default function BarChart({
  data,
  valueKey = 'count',
  color = '#16a34a',
  height = 120,
  formatValue,
}: BarChartProps) {
  if (!data.length) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
        Pas de données
      </div>
    );
  }

  const values = data.map(d => (valueKey === 'total' ? (d.total ?? 0) : d.count));
  const max = Math.max(...values, 1);
  const barW = Math.max(4, Math.floor(560 / data.length) - 3);
  const gap = 3;
  const totalW = data.length * (barW + gap) - gap;
  const padB = 20;
  const chartH = height - padB;

  const fmt = formatValue ?? ((v: number) => v.toString());

  return (
    <svg
      viewBox={`0 0 ${totalW} ${height}`}
      width="100%"
      height={height}
      style={{ overflow: 'visible', display: 'block' }}
    >
      {data.map((d, i) => {
        const v = values[i];
        const bh = Math.max(2, Math.round((v / max) * chartH));
        const x = i * (barW + gap);
        const y = chartH - bh;
        const isLast = i === data.length - 1;
        const label = d.date.slice(5); // MM-DD

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={bh}
              rx={3}
              fill={color}
              opacity={0.85}
            />
            {(i === 0 || isLast || data.length <= 14) && (
              <text
                x={x + barW / 2}
                y={height - 4}
                textAnchor="middle"
                fontSize={9}
                fill="#94a3b8"
              >
                {label}
              </text>
            )}
            {v > 0 && (i === data.length - 1 || data.length <= 8) && (
              <text
                x={x + barW / 2}
                y={y - 3}
                textAnchor="middle"
                fontSize={9}
                fill={color}
                fontWeight="700"
              >
                {fmt(v)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
