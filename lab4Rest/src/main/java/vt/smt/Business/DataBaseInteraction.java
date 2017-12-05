package vt.smt.Business;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by semitro on 12.11.17.
 */
public interface DataBaseInteraction {
    List<Point> loadPoints() throws SQLException;
    void savePoints(List<Point> points) throws SQLException;
    void savePoint(Point point) throws SQLException;
}
