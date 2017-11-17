package smt.Beans;

import smt.Business.AreaChecker;
import smt.Business.AreaCheckerImpl;
import smt.Business.DataBaseInteraction;
import smt.Business.Point;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedProperty;


public class MainModel {
    private AreaChecker areaChecker;
    // inject dbimpl to here
    @ManagedProperty(value = "#{dbImpl}")
    private DataBaseInteraction database;

    @PostConstruct
    void init(){
        areaChecker = new AreaCheckerImpl();
       // database.loadPoints();
        database.savePoints(null);
    }

    boolean doesItHit(Point point){
        return areaChecker.doesPointHit(point);
    }


    public DataBaseInteraction getDatabase() {
        return database;
    }

    public void setDatabase(DataBaseInteraction database) {
        this.database = database;
    }
}
