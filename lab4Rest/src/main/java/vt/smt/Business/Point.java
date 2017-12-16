package vt.smt.Business;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
public class Point implements Serializable{

    @Id
    private Integer point_id;

    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean hit;
    
    public Point(Number x, Number y, Number r){
        this.x = new BigDecimal(x.toString());
        this.y = new BigDecimal(y.toString());
        this.r = new BigDecimal(r.toString());
    }
    public Point() {}
    public Point(Point p){
        this.x = p.getX();
        this.y = p.getY();
        this.r = p.getR();
        this.hit = p.getHit();
    }
    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public Integer getPoint_id() {
        return point_id;
    }

    public void setPoint_id(Integer id) {
        this.point_id = id;
    }


    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    /**
     * @return the hit
     */
    public boolean getHit() {
        return hit;
    }

    /**
     * @param hit the hit to set
     */
    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
