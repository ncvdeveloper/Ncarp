import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect, G, Text } from 'react-native-svg';
import * as d3 from 'd3';
import { COLORS } from '../Constants/colors';
import { scaleHeight, scaleWidth } from '../Constants/dynamicSize';

const Heatmap = (props) => {
  const [heatmapData, setHeatmapData] = useState(props?.data);

  // useEffect(() => {
  //   const data = [];
  //   for (let i = 0; i < 12; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       data.push({
  //         x: i,
  //         y: j,
  //         value: Math.random(),
  //       });
  //     }
  //   }
  //   setHeatmapData(data);
  // }, []);

  const colorScale = d3.scaleSequential(d3.interpolateBlues);
  const rowColorScales = [
    d3.scaleSequential(d3.interpolateOranges),
    d3.scaleSequential(d3.interpolateBlues),
    d3.scaleSequential(d3.interpolateGreys),
    d3.scaleSequential(d3.interpolateGreens),
    d3.scaleSequential(d3.interpolatePurples),
  ];

  const boxHeight = scaleHeight(18);
  const boxWidth = scaleWidth(23);
  const categoriesY = ['Raw Mill', 'Pyro', 'Cement Mill'];
  const monthsX = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yAxisMargin = 5;
  const xScale = d3.scaleLinear().domain([0, 11]).range([0, 11 * boxWidth]);
  const yScale = d3.scaleBand().domain(categoriesY).range([0, 3 * boxHeight]);

  return (
    <Svg width="100%" height="100%" style={{ alignSelf: 'center' }}>

      {heatmapData?.map((item, index) => (
        <>
          <G key={index}>
            {categoriesY.map((category, i) => (
              <Text
                key={i}
                x={50}
                y={i * boxHeight + boxHeight / 2}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="9"
                fill={COLORS.ASH}
              >
                {category}
              </Text>
            ))}
          </G>
          <Rect
            key={index}
            x={xScale(item.x) + 55}
            y={yScale(categoriesY[item.y])}
            width={boxWidth}
            height={boxHeight}
            fill={colorScale(item.value)}
          />

        </>
      ))}

      <G>
        {monthsX.map((month, i) => (
          <Text
            key={i}
            x={i * boxWidth + boxWidth / 2 + 55}
            y={3 * boxHeight + 15}
            textAnchor="middle"
            fontSize="9"
            fill={COLORS.ASH}
          >
            {month}
          </Text>
        ))}
      </G>



    </Svg>
  );
};

const styles = StyleSheet.create({});

export default Heatmap;