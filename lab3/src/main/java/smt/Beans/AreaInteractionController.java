package smt.Beans;

import smt.Business.Point;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedProperty;
import javax.faces.context.FacesContext;


public class AreaInteractionController {
    private MainModel model;

    @ManagedProperty("point")
    private Point point;

    @PostConstruct
    void init(){

        FacesContext fc = FacesContext.getCurrentInstance();
        model = fc.getApplication().evaluateExpressionGet(fc,"#{model}",MainModel.class);
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public void handle_submit(){
        model.doesItHit(point);
    }
}
