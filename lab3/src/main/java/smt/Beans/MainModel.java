package smt.Beans;

import smt.Business.AreaChecker;
import smt.Business.AreaCheckerImpl;
import smt.Business.DataBaseInteraction;
import smt.Business.Point;

import javax.annotation.PostConstruct;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;


public class MainModel {
    private AreaChecker areaChecker;
    // here dbimpl is injected
    private DataBaseInteraction database;

    private List<Point> points;

    public MainModel(){

    }

    @PostConstruct
    void init(){
        areaChecker = new AreaCheckerImpl();
        try {
            points = new LinkedList<>(database.loadPoints());
        }catch (SQLException e){
            points.add(new Point(-1, -1, -1));
        }
    }

    void addPoint(Point point) throws SQLException{
        point.setHit(areaChecker.doesPointHit(point));
        database.savePoint(point);
        points.add(point);
//        try {
//        }catch (SQLException  e){
//            // !! УБРАТЬ !! //
//            points.add(new Point(7, 7, 7));
//        }
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
