import * as echarts from "echarts/core";

import {
    BarChart,
    LineChart
} from "echarts/charts";

import {
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    GridComponent,
    LegendComponent
} from "echarts/components";

import {
    CanvasRenderer
} from "echarts/renderers";

echarts.use([
    TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer,LineChart,ToolboxComponent,LegendComponent
])

export default echarts;