package vt.smt.world;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by semitro on 06.12.17.
 */
@ApplicationPath("/api")
public class kotik extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> s = new HashSet<Class<?>>();
        s.add(PointChecker.class);
        return s;
    }
}
