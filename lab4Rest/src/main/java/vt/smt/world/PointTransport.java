package vt.smt.world;

import vt.smt.Business.Point;

import java.util.LinkedList;
import java.util.List;

/**
 * Класс-Обёртка для взаимодействия с JSON по поводу передачи массивов точек
 */
public class PointTransport {
    private String authToken;
    private boolean success;
    private String error;
    private List<Point> points = new LinkedList<>();

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
