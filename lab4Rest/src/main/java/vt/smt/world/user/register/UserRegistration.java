package vt.smt.world.user.register;

import javax.persistence.*;

/**
 * Created by semitro on 14.12.17.
 *  * create table users( id integer primary key unique, name varchar(100), password text);
 *
 */
@Entity
@Table(name="Users")
@TableGenerator(name="Users")
public class UserRegistration {
    @Id
    @GeneratedValue
    private Integer id;


    @Column(unique = true)
    private String name;

    private String password;

    public UserRegistration(){}

    public UserRegistration(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
