import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.LineChartModel;
import org.primefaces.model.chart.LineChartSeries;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;

/**
 * Created by semitro on 31.10.17.
 */
@ManagedBean
public class ClockController implements Serializable {
    //This plot is a clock
    private LineChartModel chartClock = new LineChartModel();

    public LineChartModel getChartClock() {
        return chartClock;
    }

    public void setChartClock(LineChartModel chartClock) {
        this.chartClock = chartClock;
    }

    @PostConstruct
    void init(){
        LineChartModel model = new LineChartModel();

        LineChartSeries series1 = new LineChartSeries();
        series1.setLabel("Series 1");

        series1.set(1, 2);
        series1.set(2, 1);
        series1.set(3, 3);
        series1.set(4, 6);
        series1.set(5, 8);

        LineChartSeries series2 = new LineChartSeries();
        series2.setLabel("Series 2");

        series2.set(1, 6);
        series2.set(2, 3);
        series2.set(3, 2);
        series2.set(4, 7);
        series2.set(5, 9);

        model.addSeries(series1);
        model.addSeries(series2);
        this.chartClock = model;

        chartClock.setTitle("Line Chart");
        chartClock.setAnimate(true);
        chartClock.setLegendPosition("se");
        Axis yAxis = chartClock.getAxis(AxisType.Y);
        yAxis.setMin(0);
        yAxis.setMax(10);

    }
}