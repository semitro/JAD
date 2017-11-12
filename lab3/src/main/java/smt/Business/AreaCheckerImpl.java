package smt.Business;


public class AreaCheckerImpl implements AreaChecker {
    @Override
    public boolean doesPointHit(Point p) {
        return p.getX().compareTo(p.getY()) > 0;
    }
}
