package logic;

import java.math.BigDecimal;

/**
 * Created by semitro on 11.10.17.
 */
public class areaCheker implements areaChekerInterface {
    public Boolean inTheArea(Number x, Number y, Number R) {
       BigDecimal xDec = (BigDecimal)x;
       return xDec.compareTo((BigDecimal)y) == 1;
    }
}
