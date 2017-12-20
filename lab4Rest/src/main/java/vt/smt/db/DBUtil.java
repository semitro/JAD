package vt.smt.db;

import vt.smt.Business.Point;
import vt.smt.world.user.register.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class DBUtil {
    static EntityManager entitymanager;
    static Query getUserByNameQuery;
    static Query getPointByOwnerId;
    static {
        EntityManagerFactory emfactory =
                Persistence.createEntityManagerFactory( "LocalPersist" );
        entitymanager = emfactory.createEntityManager();
//        Persistence.generateSchema("LocalPersist", null);
//                emfactory.close();
       getUserByNameQuery = entitymanager.createQuery("select u from User u where u.name = :name");

       getPointByOwnerId  = entitymanager.createQuery("select p from Point p where p.owner = :user");
    }

    public static void save(Object o){
        entitymanager.getTransaction().begin();
        try {
            entitymanager.persist(o);
        }catch (RuntimeException re){
            entitymanager.getTransaction().rollback();
            throw re;
        }
        //before update
      //  entitymanager.getTransaction().commit();
        //after update
    }

    public static User findUserById(Integer id){
        return entitymanager.find(User.class, id);
    }
    public static User findUserByName(String name){
        return (User)getUserByNameQuery.setParameter("name", name).getSingleResult();
    }

    public static List<Point> findThisGuysPoints(User guy){
        return getPointByOwnerId.setParameter("user", guy).getResultList();
    }
    public static void closeSession(){
        entitymanager.close();
    }
}
