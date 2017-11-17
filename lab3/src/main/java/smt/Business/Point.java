package smt.Business;

import java.math.BigDecimal;


public class Point
{
    public BigDecimal x;
    public BigDecimal y;
    public BigDecimal r;
    public boolean hit;
    public Point(Number x, Number y, Number r){
        this.x = new BigDecimal(x.doubleValue());
        this.y = new BigDecimal(y.doubleValue());
        this.r = new BigDecimal(r.doubleValue());
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
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
    public boolean isHit() {
        return hit;
    }

    /**
     * @param hit the hit to set
     */
    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
