package smt.Business;


import java.math.BigDecimal;

public class AreaCheckerImpl implements AreaChecker {
    @Override
    public boolean doesPointHit(Point p) {
        BigDecimal x = p.getX();
        BigDecimal y = p.getY();
        BigDecimal r = p.getR();
        /*
         * @return -1, 0, or 1 as this {@code BigDecimal} is numerically
         * less than, equal to, or greater than {@code val}.
         */
        // 1'st quoter
        if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0){
           // return x.pow(2).plus( y.pow(2) ).
        }
        else // 2'st quoter
        if(x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) >=0){

        }
        else // 3'st quoter
        if(x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) < 0){

        }
        else // 4'st quoter
        if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <0){

        }
        return false;
    }
}
