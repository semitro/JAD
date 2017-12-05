package vt.smt.world;

import vt.smt.Business.AreaChecker;
import vt.smt.Business.DataBaseInteraction;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Stateless
@Path("/points")
public class PointChecker {


    private DataBaseInteraction db;
    private AreaChecker areaCheker;

    @GET
    @Path("/sayHello")
    public String sayHello(){
        return "Hello";
    }
    //@javax.ws.rs.POST
//    @javax.ws.rs.GET
//    public Point doesItHit(Point p){
//        Point ans = new Point(p);
//        ans.setHit(true);
//        return ans;
//       // ans.setHit(areaCheker.doesPointHit(p));
//    }
}
