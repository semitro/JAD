package vt.smt.Business;

import javax.ejb.Stateless;
import java.math.BigDecimal;

/**
 * Created by semitro on 20.12.17.
 */
@Stateless
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

		// First quarter
        if(x.compareTo(BigDecimal.ZERO) > 0 && y.compareTo(BigDecimal.ZERO) > 0){
            return false;
        }
        else // Second quarter
        if(x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) > 0){
           // y <= x+r/2
            return y.compareTo( x.add( r.divide(BigDecimal.valueOf(2)) ) ) <= 0;
        }
        else // Third quarter
        if(x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0){
              // y >= -r and x >= -r
               return y.compareTo(r.negate()) >= 0 && x.compareTo(r.negate()) >= 0;
        }
        else // Fourth quarter
        if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <=0){
            // x^2 + y^2 <= (R/2)^2
			return x.multiply(x).add(y.multiply(y)).compareTo(
				r.divide(BigDecimal.valueOf(2)).multiply(r.divide(BigDecimal.valueOf(2))))
				<= 0;
        }

        return false;
    }

    public AreaCheckerImpl4(){}
}
