import { useCallback, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  LabelList,
} from "recharts";
import theme from "../../styled/theme";

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fill="black"
        fontSize={"20px"}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <text x={cx - 10} y={cy} dy={18} fill="#999">
        {`${parseInt((percent * 100).toFixed(2))}%`}
      </text>
    </g>
  );
};

interface IOptions {
  name: string;
  count: number;
}

interface IProps {
  options: IOptions[];
}
function Chart({ options }: IProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (a: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const colorList = [
    `${theme.palette.primary}`,
    `${theme.palette.primaryLight}`,
    "red",
  ];

  return (
    <ResponsiveContainer width="100%" height={700}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={options}
          innerRadius="55%"
          outerRadius="93%"
          dataKey="count"
          onMouseEnter={onPieEnter}
          label
        >
          {options.map((entry, index) => (
            <Cell key={index} fill={colorList[index % colorList.length]} />
          ))}
          <LabelList
            dataKey={"name"}
            offset={0}
            position="inside"
            style={{ fontSize: "20px" }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
export default Chart;
