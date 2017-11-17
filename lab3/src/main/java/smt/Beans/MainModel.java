package smt.Beans;

import smt.Business.AreaChecker;
import smt.Business.AreaCheckerImpl;
import smt.Business.DataBaseInteraction;
import smt.Business.Point;

import javax.annotation.PostConstruct;
import java.util.LinkedList;
import java.util.List;


public class MainModel {
    private AreaChecker areaChecker;
    // inject dbimpl to here
    private DataBaseInteraction database;
    private List<Point> points;

    public MainModel(){

    }
    @PostConstruct
    void init(){
        areaChecker = new AreaCheckerImpl();
        points = new LinkedList<>(database.loadPoints());
    }

    void addPoint(Point point){
        point.setHit(areaChecker.doesPointHit(point));
        points.add(point);
        database.savePoint(point);
    }

    /**
     * @return the points
     */
    public List<Point> getPoints() {
        return points;
    }


    public DataBaseInteraction getDatabase() {
        return database;
    }

    public void setDatabase(DataBaseInteraction database) {
        this.database = database;
    }
}
