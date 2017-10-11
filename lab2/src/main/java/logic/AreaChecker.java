package logic;

import java.math.BigDecimal;

/**
 * Created by semitro on 11.10.17.
 */
public class AreaChecker implements AreaCheckerInterface {
    public Boolean inTheArea(Number x, Number y, Number R) {
       BigDecimal big_x = (BigDecimal)x;
       BigDecimal big_y = (BigDecimal)y;
       BigDecimal big_R = (BigDecimal)R;
       // Если y >= 0 
       if(big_y.compareTo(BigDecimal.ZERO) >= 0) {
           // Первая четверть
           if(big_x.compareTo(BigDecimal.ZERO) >= 0
              &&big_x.compareTo(big_R) <= 0
              &&big_y.compareTo(big_R) <= 0)
               return true;
           // Вторая четверть или не попали
           return false;
       }
       // Третья четверть
       if(big_x.compareTo(BigDecimal.ZERO) <= 0){
		   if(big_y.compareTo(big_x.negate().subtract(big_R))>=0)
			   return true;
			return false;
       }
       if(big_x.pow(2).add(big_y.pow(2)).compareTo(big_R.divide(new BigDecimal(2)).pow(2)) <= 0)
			return true;
       return false;
    }
}
