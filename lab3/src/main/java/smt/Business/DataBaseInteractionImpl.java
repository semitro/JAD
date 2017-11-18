package smt.Business;



import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.*;
import java.util.LinkedList;
import java.util.List;

public class DataBaseInteractionImpl implements DataBaseInteraction , Serializable{

    private Connection conn;
    // create table point(id serial primary key, x varchar(80), y varchar(80), r varchar(80), hit integer);
    // create user xaroxx with password 'xxx123';
    private String usr         = "xaroxx";
    private String password    = "xxx123";
    private String psql_URL    = "jdbc:postgresql://localhost:5432/iad_lab3";
    private String oracle_URL  = " ";
    private String insPointSql = "insert into point(x, y, r, hit) values (?, ?, ?, ?)";
    private String getAllSql   = "select x, y, r, hit from point";
    private PreparedStatement insPointStatement;
    private PreparedStatement getAllStatement;
    @Override
    public List<Point> loadPoints() throws SQLException{
        List<Point> l = new LinkedList<>();
        ResultSet resultSet = getAllStatement.executeQuery();
        while (resultSet.next()){
            Point p = new Point();
            p.setX(new BigDecimal(resultSet.getString(1)));
            p.setY(new BigDecimal(resultSet.getString(2)));
            p.setR(new BigDecimal(resultSet.getString(3)));
            // the boolean 'true' is kept as '1' in the database
            p.setHit(1 == resultSet.getInt(4));
            l.add(p);

        }
        return l;
    }

    public DataBaseInteractionImpl() throws SQLException, ClassNotFoundException{

       // conn = Driver
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(psql_URL, usr, password);
        }catch (SQLException | ClassNotFoundException e){
            conn = DriverManager.getConnection(oracle_URL, usr, password);
        }

        insPointStatement = conn.prepareStatement(insPointSql);
        getAllStatement   = conn.prepareStatement(getAllSql  );
    }

    @Override
    public void savePoints(List<Point> points) throws SQLException{
        for (Point p : points)
            savePoint(p);
    }

    @Override
    public void savePoint(Point point) throws SQLException {
        insPointStatement.setString(1, point.getX().toString());
        insPointStatement.setString(2, point.getY().toString());
        insPointStatement.setString(3, point.getR().toString());
        insPointStatement.setInt   (4, point.getHit() ? 1 : 0 );
        insPointStatement.execute();

    }
}
