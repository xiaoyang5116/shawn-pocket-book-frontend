// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
import type { EChartsOption } from "echarts";

// Import charts, all with Chart suffix
import {
  // LineChart,
  // BarChart,
  PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from "echarts/charts";
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  // GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  // CanvasRenderer,
  SVGRenderer,
} from "echarts/renderers";

// Register the required components
echarts.use([TitleComponent, TooltipComponent, PieChart, SVGRenderer]);

type ChartComponentProps = {
  option?: EChartsOption;
  style?: React.CSSProperties;
};

const ChartComponent = (props: ChartComponentProps) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={props.option}
      style={props.style}
      // notMerge={true}
      // lazyUpdate={true}
      // theme={"theme_name"}
      // onChartReady={this.onChartReadyCallback}
      // onEvents={EventsDict}
      // opts={}
    />
  );
};

export default ChartComponent;
