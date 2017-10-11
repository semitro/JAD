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

       // Если y >= 0 and y <= R
       if(        big_y.compareTo(BigDecimal.ZERO) >= 0
               && big_y.compareTo(big_R) <= 0){

           // Первая четверть
           if(big_x.compareTo(BigDecimal.ZERO) >= 0
              &&big_x.compareTo(big_R) <= 0)
               return true;
           // Вторая четверть
           return false;
       }

       // Третья четверть
       if(big_x.compareTo(BigDecimal.ZERO) < 0){
           // Допилить на свежую голову
       }
       return true;
    }
}
