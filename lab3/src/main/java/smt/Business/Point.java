package smt.Business;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;


public class Point
{
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    public Point(){

    }

    @PostConstruct
    void init(){
        x = new BigDecimal(0);
        y = new BigDecimal(0);
        r = new BigDecimal(0);
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
}
