package smt.Business;

import java.math.BigDecimal;


public class Point
{
    public BigDecimal x;
    public BigDecimal y;
    public BigDecimal r;
    public byte hit;
    public Point(Number x, Number y, Number r){
        this.x = new BigDecimal(x.doubleValue());
        this.y = new BigDecimal(y.doubleValue());
        this.r = new BigDecimal(r.doubleValue());
    }
    public Point() {
        
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
    public boolean getHit() {
        return hit==1;
    }

    /**
     * @param hit the hit to set
     */
    public void setHit(boolean hit) {
        this.hit = (byte) (hit ? 1 : 0);
    }
}
