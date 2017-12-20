package vt.smt.world.user.register;

import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by semitro on 14.12.17.
 *  * create table users( id integer primary key unique, name varchar(100), password text);
 *
 */
@Entity
@Table(name="users3")
@TableGenerator(name="Users2")
@SequenceGenerator(name="users_seq", sequenceName="usr_seq")
public class User implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="users_seq")
    private Integer id;


    @Column(unique = true)
    private String name;

    private String password;

    @Transient // do not store into the db
    private String authToken;

    public User(){}

    public User(String name) {
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

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User that = (User) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(password, that.password) &&
                Objects.equals(authToken, that.authToken);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, password, authToken);
    }
}
