package vt.smt.world;

import vt.smt.Business.AreaChecker;
import vt.smt.Business.DataBaseInteraction;
import vt.smt.Business.Point;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.math.BigDecimal;
/**
* points/add
* -> {"authtoken": String, "points": Array[ {"x":String, "y":String, "r":String, "xoff":String, "yoff":String} ]}
* <- {"success": Boolean, "points": Array[ {"x":String, "y":String, "r":String, "xoff":String, "yoff":String, "hit": Boolean} ]}
*
* points/get
* -> {"authtoken": String}
* <- {"success": Boolean, "points": Array[ {"x":String, "y":String, "r":String, "hit": Boolean} ]}
*
***/
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
    @javax.ws.rs.POST
    @Path("/hit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Point doesItHit(Point p){
//        Point ans = new Point();
//        ans.setHit(true);
        p.setY(new BigDecimal(142.));
        p.setHit(true);
        return p;
       // return Response.ok(json, MediaType.APPLICATION_JSON).build();
       // ans.setHit(areaCheker.doesPointHit(p));
    }
}
