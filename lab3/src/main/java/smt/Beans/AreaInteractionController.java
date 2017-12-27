package smt.Beans;

import smt.Business.Point;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedProperty;


public class AreaInteractionController {

    private MainModel model;

    @ManagedProperty("point")
    private Point point;

    @PostConstruct
    void init(){
//        FacesContext fc = FacesContext.getCurrentInstance();
//        model = fc.getApplication().evaluateExpressionGet(fc,"#{model}",MainModel.class);
        point = new Point(0, 0, 0.1);
    }

    public AreaInteractionController(){

    }
    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public void handle_sususu() throws Exception{
        model.addPoint(point);
    }

    public MainModel getModel() {
        return model;
    }

    public void setModel(MainModel model) {
        this.model = model;
    }
}
