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
        series1.setLabel("Зависимость секунд от секунд");
        LineChartSeries series2 = new LineChartSeries();
        series2.set(System.currentTimeMillis()/1000 -initSeconds, new Date().getMinutes());
        series2.setLabel("Зависимость минут от секунд");
        LineChartSeries series3 = new LineChartSeries();
        series3.set(System.currentTimeMillis()/1000 -initSeconds, new Date().getHours());
        series3.setLabel("Зависимость часов от секунд");

        chartClock.addSeries(series1);
        chartClock.addSeries(series2);
        chartClock.addSeries(series3);
        chartClock.setAnimate(true);
        chartClock.setLegendPosition("se");
        Axis yAxis = chartClock.getAxis(AxisType.Y);
        yAxis.setMin(0);
        yAxis.setMax(70);
        yAxis.setLabel("Время времени");
        chartClock.getAxis(AxisType.X).setMin(0);
        chartClock.getAxis(AxisType.X).setLabel("Время на сайте (сек)");

        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(1);
        executor.scheduleAtFixedRate(()->{
            this.chartClock.getSeries().get(0)
                    .set(System.currentTimeMillis()/1000 - initSeconds,new Date().getSeconds());
            this.chartClock.getSeries().get(1)
                    .set(System.currentTimeMillis()/1000 - initSeconds,new Date().getMinutes());
            this.chartClock.getSeries().get(2)
                    .set(System.currentTimeMillis()/1000 - initSeconds,new Date().getHours());

        }
                       ,
                0,5000, TimeUnit.MILLISECONDS);

    }

}