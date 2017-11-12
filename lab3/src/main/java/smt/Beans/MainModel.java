package smt.Beans;

import smt.Business.AreaChecker;
import smt.Business.AreaCheckerImpl;
import smt.Business.DataBaseInteraction;
import smt.Business.Point;

import javax.annotation.PostConstruct;

public class MainModel {
    private AreaChecker areaChecker;
    private DataBaseInteraction database;

    @PostConstruct
    void init(){
        areaChecker = new AreaCheckerImpl();

    }

    boolean doesItHit(Point point){
        return areaChecker.doesPointHit(point);
    }

}
