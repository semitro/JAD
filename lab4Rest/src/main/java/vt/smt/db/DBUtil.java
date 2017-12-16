package vt.smt.db;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DBUtil {
    static EntityManager entitymanager;
    static {
        EntityManagerFactory emfactory =
                Persistence.createEntityManagerFactory( "LocalPersist" );
        entitymanager = emfactory.createEntityManager();
//        Persistence.generateSchema("LocalPersist", null);
//                emfactory.close();
    }

    public static void save(Object o){
        entitymanager.getTransaction().begin();
        entitymanager.persist(o);
        //before update
        entitymanager.getTransaction().commit();

        //after update

    }
    public static void closeSession(){
        entitymanager.close();

    }
}
