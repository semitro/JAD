package vt.smt.db;

import vt.smt.Business.Point;
import vt.smt.world.user.register.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class DBUtil {
    static Query getUserByNameQuery;
    static Query getPointByOwnerId;
    static EntityManagerFactory emfactory;
    static {
       emfactory =
                Persistence.createEntityManagerFactory( "LocalPersist" );

       EntityManager entitymanager = emfactory.createEntityManager();
       getUserByNameQuery = entitymanager.createQuery("select u from User u where u.name = :name");

       getPointByOwnerId  = entitymanager.createQuery("select p from Point p where p.owner = :user");
    }

    public static void save(Object o){
        EntityManager entitymanager = emfactory.createEntityManager();
        try{
            entitymanager.getTransaction().begin();
            entitymanager.persist(o);
            entitymanager.getTransaction().commit();
        }catch (RuntimeException re){
            if(entitymanager.getTransaction().isActive())
                entitymanager.getTransaction().rollback();
            entitymanager.close();
            throw re;
        }
        entitymanager.close();
    }

    public static User findUserById(Integer id){
        EntityManager entitymanager = emfactory.createEntityManager();
        try {
            User u = entitymanager.find(User.class, id);
            entitymanager.close();
            return u;
        }catch (RuntimeException e){
            entitymanager.close();
            throw e;
        }
    }

    public static User findUserByName(String name){
        return (User)getUserByNameQuery.setParameter("name", name).getSingleResult();
    }

    public static List<Point> findThisGuysPoints(User guy){
        return getPointByOwnerId.setParameter("user", guy).getResultList();
    }
}
