package vt.smt.Business;

import java.math.BigDecimal;

/**
 * Created by semitro on 20.12.17.
 */
public class AreaCheckerImpl4 implements AreaChecker {
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
            return false;
        }
        else // 2'st quoter
        if(x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) >=0){
           // y <= x+r/2, x >= -r/2
            return x.compareTo(r.divide(BigDecimal.valueOf(2))) <= 0
                    && y.compareTo(x.add(r.negate().divide(BigDecimal.valueOf(2)))) >= 0;
        }
        else // 3'st quoter
        if(x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) < 0){
              // y >= -r and x >= -r
               return y.compareTo(r.negate()) >= 0 && x.compareTo(r.negate()) >= 0;
        }
        else // 4'st quoter
        if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <0){
            // x

        }

        return false;
    }

    public AreaCheckerImpl4(){}
}
