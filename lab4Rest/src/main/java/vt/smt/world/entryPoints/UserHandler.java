package vt.smt.world.entryPoints;

import vt.smt.Business.AreaChecker;
import vt.smt.Business.DataBaseInteraction;
import vt.smt.Business.Point;

import javax.ejb.Stateless;
import javax.persistence.RollbackException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import vt.smt.db.DBUtil;
import vt.smt.world.user.register.RegistrationAnswer;
import vt.smt.world.user.register.UserRegistration;
import vt.smt.world.user.session.*;
import vt.smt.world.user.security.*;
/**
 * Created by semitro on 14.12.17.
 *
 * user/login
 * -> {"name": String, "password": String}
 * <- {"success": Boolean, "authtoken":String } (токен только при успехе)
 *
 * user/logout
 * -> {"authtoken": String} (имей в виду, что следует его делать именно строкой)
 * <- {"success": Boolean}
 *
 **/
@Stateless
@Path("/user")
public class UserHandler{

    private DataBaseInteraction db;
    private AreaChecker areaCheker;
    private static final int miminal_password_lenght = 2;
    @GET
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String login(UserRegistration newUser){

        return "Hello";
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public RegistrationAnswer register(UserRegistration newUser){
        //
        RegistrationAnswer response = new RegistrationAnswer();
        response.setError(checkValidationError(newUser));
        // if the string is not null, it's succeed
        response.setSuccees( (response.getError() == null) );

        if(!response.isSuccees()) // Validation error -> there's no reason to continue
            return response;
        // saving hash of the password into the database
        newUser.setPassword(Hasher.getHash(newUser.getPassword()));
        try {
            DBUtil.save(newUser);

        }catch (RollbackException e){ // handling the unique name constraint
            response.setSuccees(false);
            response.setError("Sorry, user with such name already exists");
            return response;
        }
        // absolutely everything is already ok because we're still alive!
        response.setAuthToken(Session.generateToken(newUser.getId()));
        return response;
    }


    @javax.ws.rs.POST
    @Path("/hit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Point doesItHit(Point p){
//        Point ans = new Point();
//        ans.setHit(true);
        p.setHit(true);
        return p;
        // return Response.ok(json, MediaType.APPLICATION_JSON).build();
        // ans.setHit(areaCheker.doesPointHit(p));
    }

    // if everything is ok, returns null
    private String checkValidationError(UserRegistration user){
        if(user.getPassword().length() < miminal_password_lenght)
            return "The length of the password is to small (At least 2 symbols are required)";
        if(user.getName().isEmpty())
            return "You've forgotten your name.";

        return null;
    }

}