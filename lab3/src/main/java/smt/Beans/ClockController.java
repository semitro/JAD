package smt.Beans;

import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.LineChartModel;
import org.primefaces.model.chart.LineChartSeries;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.util.Date;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;


@ManagedBean
public class ClockController implements Serializable {
    //This plot is a clock
    private LineChartModel chartClock;

    private long initSeconds;
    public LineChartModel getChartClock() {
        return chartClock;
    }

    public void setChartClock(LineChartModel chartClock) {
        this.chartClock = chartClock;
    }

    @PostConstruct
    void init(){
        chartClock = new LineChartModel();
        initSeconds = System.currentTimeMillis()/1000;
        // Гавно. Как перенести в разметку?
        chartClock.setTitle("Часы");
        LineChartSeries series1 = new LineChartSeries();
        series1.set(System.currentTimeMillis()/1000 -initSeconds, new Date().getSeconds());
        series1.setLabel("Зависимость");

        chartClock.addSeries(series1);
        chartClock.setAnimate(true);
        chartClock.setLegendPosition("se");
        Axis yAxis = chartClock.getAxis(AxisType.Y);
        yAxis.setMin(0);
        yAxis.setMax(70);
        yAxis.setLabel("Секунды времени");
        chartClock.getAxis(AxisType.X).setMin(0);
        chartClock.getAxis(AxisType.X).setLabel("Время на сайте (сек)");

        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(1);
        executor.scheduleAtFixedRate(()->{
            this.chartClock.getSeries().get(0)
                    .set(System.currentTimeMillis()/1000 - initSeconds,new Date().getSeconds());

        }
                       ,
                0,5000, TimeUnit.MILLISECONDS);

    }


}