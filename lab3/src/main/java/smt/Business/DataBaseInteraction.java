package smt.Business;

import java.util.List;

/**
 * Created by semitro on 12.11.17.
 */
public interface DataBaseInteraction {
    List<Point> loadPoints();
    void savePoints(List<Point> t);
}
