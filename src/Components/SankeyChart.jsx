import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview';
const SankeyChart = (props) => {
  const customHTML = `
  <html>
  <head>
    <title>JavaScript Sankey Diagram</title>
    <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-sankey.min.js"></script>
    <style type="text/css">      
      html, body, #container { 
        width: 100%; height: 100%; margin: 0; padding: 0; 
      } 
    </style>
  </head>
  <body>  
    <div id="container"></div>
    <script>
      anychart.onDocumentReady(function () {
        // add data
        const data = ${JSON.stringify(props?.data)};
        let chart = anychart.sankey();

        // load the data to the sankey diagram instance
        chart.data(data);

        // set the chart's padding
        chart.padding(30, 50);

        // configure a custom color palette
        chart.palette([
          "#f5dc50",
          "#e1a03c",
          "#c87d5a",
          "#fff0c8",
          "#aa96b4",
          "#6e5a7d",
          "#e19196",
          "#419bd2",
          "#46afaa",
          "#5a5050"
        ]);

        // customize the nodes:
        // set the width
        chart.nodeWidth(18);
        // set the padding
        chart.nodePadding(30);
        // customize the labels
        chart.node().normal().labels().fontSize(18);
        chart.node().labels().useHtml(true);
        chart
          .node()
          .labels()
          .format("<span style='font-weight:bold;position:absolute; left:20'>{%name}</span><br>{%value}");

        // customize the links
        chart.flow({
          normal: {
            fill: function () {
              return "#D3D3D3 0.8";
            }
          },
          hovered: {
            fill: function () {
              return "#D3D3D3 0.8";
            }
          }
        });
        // set the chart container id
        chart.container("container");
        // draw the chart
        chart.draw();
      });
    </script>
  </body>
  </html>
`;

  const html = `<html>
  <head>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    google.charts.load('current', {'packages':['sankey']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'From');
      data.addColumn('string', 'To');
      data.addColumn('number', 'Weight');
      data.addRows(${JSON.stringify(props?.data)});

      // Sets chart options.
      // Sets chart options.
      var options = {
        width: 900,
        height: 700,
        sankey: {
          
          node: { width: 30,
            //colors: [ '#333333' ],
            label: {
            fontSize: 24,
            color: '#555555',
            bold: true,
            } 
          },
          link: { color: { fill: '#E7E7E7',  } },
         },
      };

      // Instantiates and draws our chart, passing in some options.
      var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
      chart.draw(data, options);
    }
  </script>
</head>
<body>
  <div id="sankey_basic" style="width: 900px; height: 300px;"></div>
</body>
</html>
`
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ html: html }}
      />
    </SafeAreaView>
  )
}
export default SankeyChart
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})