import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

function getAllDays(start, end) {
  const days = [];
  let curr = new Date(start + "T00:00:00");
  const endDate = new Date(end + "T00:00:00");

  while (curr <= endDate) {
    days.push(formatLocalDate(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return days;
}

function padToWeekStart(days) {
  const firstDay = new Date(days[0] + "T00:00:00").getDay();
  const padding = new Array(firstDay).fill(null);
  return [...padding, ...days];
}

function chunkByWeek(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function getMonthLabel(week) {
  const lastDay = [...week].reverse().find(Boolean);
  return !lastDay
    ? null
    : new Date(lastDay + "T00:00:00").toLocaleString("default", {
        month: "short"
      });
}

function defaultColourMap(value, max, colorCount) {
  if (colorCount <= 0) return 0;
  if (max <= 0 || value <= 0) return 0;
  const index = Math.ceil((value / max) * (colorCount - 1));
  return Math.min(Math.max(index, 0), colorCount - 1);
}

function interpolateRgb(value, max, minColor, maxColor, scale) {
  if (value <= 0 || max <= 0) return minColor;
  let t = value / max;
  switch (scale) {
    case "sqrt": t = Math.sqrt(t); break;
    case "log": t = Math.log10(value + 1) / Math.log10(max + 1); break;
  }
  t = Math.min(Math.max(t, 0), 1);
  const s = {
    r: parseInt(minColor.slice(1, 3), 16),
    g: parseInt(minColor.slice(3, 5), 16),
    b: parseInt(minColor.slice(5, 7), 16)
  };
  const e = {
    r: parseInt(maxColor.slice(1, 3), 16),
    g: parseInt(maxColor.slice(3, 5), 16),
    b: parseInt(maxColor.slice(5, 7), 16)
  };
  const r = Math.round(s.r + (e.r - s.r) * t);
  const g = Math.round(s.g + (e.g - s.g) * t);
  const b = Math.round(s.b + (e.b - s.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

const defaultIntensityColours = ["#f0fdf4", "#bbf7d0", "#86efac", "#22c55e", "#166534"];
const daysOfTheWeekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DaysOfTheWeekIndicator({ daysOfTheWeekOption, fontSize, showMonthLabels }) {
  if (daysOfTheWeekOption === "none") return null;
  const rowOffset = showMonthLabels ? 2 : 1;

  return daysOfTheWeekArr.map((day, i) =>
    daysOfTheWeekOption === "MWF" && ![1, 3, 5].includes(i) ? (
      <div key={i} style={{ gridRow: i + rowOffset, gridColumn: 1 }} />
    ) : (
      <div
        key={i}
        className="flex items-center text-muted-foreground"
        style={{
          gridRow: i + rowOffset,
          gridColumn: 1,
          justifyContent: "flex-end",
          fontSize
        }}>
        {daysOfTheWeekOption === "single letter" ? day.charAt(0) : day}
      </div>
    ));
}

function ValueIndicator({ cellSize, displayStyle, value, maxValue, color, style, ...htmlProps }) {
  let finalSize = cellSize;
  if (displayStyle === "bubbles") {
    const minScale = 0.3;
    const scale = maxValue > 0 ? value / maxValue : 0;
    finalSize = cellSize * (minScale + (1 - minScale) * scale);
    return (
      <div className="flex items-center justify-center" style={style} {...htmlProps}>
        <span
          className="transition-colors rounded-full"
          style={{ width: finalSize, height: finalSize, backgroundColor: color }} />
      </div>
    );
  }
  return (
    <div
      className="transition-colors"
      style={{ borderRadius: 1, backgroundColor: color, ...style }}
      {...htmlProps} />
  );
}

export default function Heatmap(props) {
  const {
    data, startDate, endDate, cellSize = 20, daysOfTheWeek = "MWF", gap = 4,
    displayStyle = "squares", valueDisplayFunction, dateDisplayFunction,
    className, colorMode, showMonthLabels = true
  } = props;

  const valueByDate = new Map(data.map(({ date, value }) => [date, value]));
  const days = getAllDays(formatLocalDate(startDate), formatLocalDate(endDate));
  const paddedDays = padToWeekStart(days);
  const weeks = chunkByWeek(paddedDays);
  const maxValue = Math.max(...data.map((d) => d.value), 0);

  const monthLabels = weeks.map((week, i) => {
    const label = getMonthLabel(week);
    const prevLabel = i > 0 ? getMonthLabel(weeks[i - 1]) : null;
    return label !== prevLabel ? label : null;
  });

  const fontSize = Math.min(16, cellSize);
  const rowOffset = showMonthLabels ? 2 : 1;
  const totalRows = showMonthLabels ? 8 : 7;

  const getCellColor = (value) => {
    if (colorMode === "interpolate") {
      if (value <= 0) return props.minColor ?? "var(--heatmap-zero, #ebedf0)";
      return interpolateRgb(value, maxValue, props.minColor ?? "#aceebb", props.maxColor ?? "#116329", props.interpolation ?? "linear");
    } else {
      const colorArray = props.colorScale && props.colorScale.length > 0 ? props.colorScale : defaultIntensityColours;
      const map = props.customColorMap ?? defaultColourMap;
      return colorArray[map(value, maxValue, colorArray.length)];
    }
  };

  return (
    <div
      role="grid"
      className={cn("grid", className)}
      style={{
        gap,
        gridTemplateColumns: `max-content repeat(${weeks.length}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${totalRows}, ${cellSize}px)`
      }}>
      <DaysOfTheWeekIndicator daysOfTheWeekOption={daysOfTheWeek} fontSize={fontSize} showMonthLabels={showMonthLabels} />
      {showMonthLabels && weeks.map((_, i) => (
        <div key={`header-${i}`} style={{ gridColumn: i + 2, gridRow: 1, fontSize }} className="text-muted-foreground flex items-end">
          {monthLabels[i]}
        </div>
      ))}
      <TooltipProvider>
        {weeks.map((week, weekIdx) =>
          week.map((day, dayIdx) => {
            if (!day) return <div key={dayIdx} style={{ gridColumn: weekIdx + 2, gridRow: dayIdx + rowOffset }} />;
            const safeValue = Math.max(0, valueByDate.get(day) ?? 0);
            const thisColor = getCellColor(safeValue);
            return (
              <Tooltip key={dayIdx}>
                <TooltipTrigger asChild>
                  <ValueIndicator
                    style={{ gridColumn: weekIdx + 2, gridRow: dayIdx + rowOffset }}
                    tabIndex={0}
                    cellSize={cellSize}
                    displayStyle={displayStyle}
                    value={safeValue}
                    maxValue={maxValue}
                    color={thisColor} />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <div>{dateDisplayFunction ? dateDisplayFunction(new Date(day + "T00:00:00")) : new Date(day + "T00:00:00").toDateString()}</div>
                    <div className="text-muted-foreground">{valueDisplayFunction ? valueDisplayFunction(safeValue) : `${safeValue} event${safeValue !== 1 ? "s" : ""}`}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }))}
      </TooltipProvider>
    </div>
  );
}

function formatLocalDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
