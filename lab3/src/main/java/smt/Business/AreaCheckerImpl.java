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
            // x^2 + y^2 not greater than (r/2)^2
            return x.pow(2).add( y.pow(2) ).compareTo( r.divide(BigDecimal.valueOf(2.)).pow(2)) != 1 ;
        }
        else // 2'st quoter
        if(x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) >=0){
            // x >= -r && y <= r/2
            return x.compareTo(r.negate()) >= 0 && y.compareTo(r.divide(BigDecimal.valueOf(2.))) <= 0;
        }
        else // 3'st quoter
        if(x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) < 0){
            // y >= -r + x
            return y.compareTo(r.negate().add(x)) >= 0;
        }
        else // 4'st quoter
        if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <0){
            // always false, nothing to check
        }
        return false;
    }
}
