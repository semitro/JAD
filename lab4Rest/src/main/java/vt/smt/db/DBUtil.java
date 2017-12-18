package vt.smt.db;

import vt.smt.world.user.register.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class DBUtil {
    static EntityManager entitymanager;
    static Query getUserByNameQuery;
    static {
        EntityManagerFactory emfactory =
                Persistence.createEntityManagerFactory( "LocalPersist" );
        entitymanager = emfactory.createEntityManager();
//        Persistence.generateSchema("LocalPersist", null);
//                emfactory.close();
       getUserByNameQuery =  entitymanager.createQuery("select u from User u where u.name like :name");

    }

    public static void save(Object o){
        entitymanager.getTransaction().begin();
        entitymanager.persist(o);
        //before update
        entitymanager.getTransaction().commit();

        //after update

    }

    public static Object find(Object o){
       return entitymanager.find(o.getClass(),o);
    }

    public static User findUserByName(String name){
        return (User)getUserByNameQuery.setParameter("name", name).getSingleResult();
    }
    public static void closeSession(){
        entitymanager.close();
    }
}
