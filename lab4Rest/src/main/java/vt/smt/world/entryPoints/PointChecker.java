package vt.smt.world.entryPoints;

import vt.smt.Business.AreaChecker;
import vt.smt.Business.AreaCheckerImpl;
import vt.smt.Business.Point;
import vt.smt.world.PointTransport;
import vt.smt.world.user.register.User;
import vt.smt.world.user.session.Session;
import vt.smt.db.DBUtil;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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

    @EJB
    private AreaChecker areaChecker = new AreaCheckerImpl();

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
        p.setHit(areaChecker.doesPointHit(p));
        return p;
    }

    @javax.ws.rs.POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PointTransport savePoints(PointTransport points){
        PointTransport response = points;

        response.setSuccess(false);
        if(points.getAuthToken() == null){
            response.setError("Where's auth token?");
            return response;
        }

        Integer owner_id = Session.getIdByToken(points.getAuthToken());
        if(owner_id == null){
            response.setError("There's no your token in session-table!");
            return response;
        }

        response.setSuccess(true);
        User owner = new User();
        owner.setId(owner_id);
        for (Point point : points.getPoints()) {
            point.setHit(areaChecker.doesPointHit(point));
            point.setOwner(owner);
            DBUtil.save(point);
        }

        return response;
    }

    @javax.ws.rs.POST
    @Path("/get")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

    public PointTransport getPoints(User owner){
        PointTransport response = new PointTransport();
        response.setSuccess(false);
        if(owner.getAuthToken() == null){
            response.setError("Where's auth token?");
            return response;
        }

        Integer owner_id = Session.getIdByToken(owner.getAuthToken());
        if(owner_id == null){
            response.setError("There's no your token in session-table!");
            return response;
        }

        owner = DBUtil.findUserById(owner_id);
        response.setPoints(DBUtil.findThisGuysPoints(owner));
        for (Point point : response.getPoints()) {
            point.setOwner(null); // we don't want to transfer this information to front-end
        }
        response.setSuccess(true);

        return response;
    }
}
