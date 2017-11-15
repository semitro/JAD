/* 
 * Copyright (C) 2017 Alexandr Bulantsov
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package ru.ifmo.se.bam.worm;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * <p>CRAWLING IN MY SKIN</p>
 * <p>Let the WORM crawl into JDBC instead of you! You will need to provide
 * Java type as class parameter, its class, database {@link Connection} and
 * {@link SqlHelper} instance for the same class (optionally (but
 * recommended)).</p>
 * <p>Supplying different types for different parametres results in
 * {@link IllegalArgumentException} being thrown at some unspecified time,
 * but even this should not be relied upon.</p>
 * <p>Typical usage example:<blockquote><pre>
 * url = "jdbc:postgresql://localhost/mydatabase?user=user&password=password";
 * Connection conn = DriverManager.getConnection(url);
 * SqlHelper sqlHelper = new SqlHelper(MyClass.class, "psql");
 *{@code WORM<MyClass>} worm = new WORM<>(MyClass.class, conn, sqlHelper);
 * MyClass myObject = new MyClass();
 * worm.insert(myObject);
 * </pre></blockquote></p>
 * @param <Type> the type of object for mapping
 * @author Alexandr Bulantsov
 */
public class WORM<Type> {
    
    /**
     * <p>Creates a new instance with the supplied SqlHelper instance.</p>
     * @param cl class to map into database
     * @param conn connection to database
     * @param helper SqlHelper instance
     */
    public WORM(Class cl, Connection conn, SqlHelper helper) {
        this.cl = cl;
        this.conn = conn;
        if(helper.getHelpedClass()!=cl)
            throw new IllegalArgumentException(
                    "SqlHelper instance does not match the provided class");
        help = helper;
    }

    /**
     * <p>Creates a new instance.</p>
     * <p>Tries to create an {@link SqlHelper} instance automatically,
     * using driver name from the connection for the DBMS name. This may very
     * well fail, casuing an exception to be thrown./p>
     * @param cl class to map into database
     * @param conn connection to database
     * @throws SQLException if driver metadata can not be acquired
     * @see SqlHelper#SqlHelper(java.lang.Class, java.lang.String) 
     */
    public WORM(Class cl, Connection conn)
            throws SQLException {
        this(cl, conn, new SqlHelper(cl, conn.getMetaData().getDriverName()));
    }
    
    /**
     * <p>Executes an INSERT statement.</p>
     * <p>Uses a prepared statement to protect against SQL injections and
     * to possibly increase speed of many executions in a row.</p>
     * @param obj object to be inserted
     * @return the affected row count (should be 1)
     * @throws SQLException if a database error occurs
     * @throws IllegalArgumentException if Type parameter and class differ
     * @see Connection#prepareStatement
     * @see PreparedStatement#executeUpdate()
     */
    public int insert(Type obj)
            throws SQLException {
        if(insertStmt == null) {
            insertStmt = conn.prepareStatement(help.makeInsertStatement());
        }
        bindValues(obj, null, insertStmt);
        return insertStmt.executeUpdate();
    }
    
    /**
     * <p>Executes a DELETE statement.</p>
     * <p>Uses a prepared statement to protect against SQL injections and
     * to possibly increase speed of many executions in a row.</p>
     * @param obj object to be deleted
     * @return the affected row count (should be 1)
     * @throws SQLException if a database error occurs
     * @throws IllegalArgumentException if Type parameter and class differ
     * @see Connection#prepareStatement
     * @see PreparedStatement#executeUpdate()
     */
    public int delete(Type obj)
            throws SQLException {
        if(deleteStmt == null) {
            deleteStmt = conn.prepareStatement(help.makeDeleteStatement());
        }
        bindValues(null, obj, deleteStmt);
        return deleteStmt.executeUpdate();
    }
    
    /**
     * <p>Executes an UPDATE statement.</p>
     * <p>Uses a prepared statement to protect against SQL injections and
     * to possibly increase speed of many executions in a row.</p>
     * @param oldObj object to be replaced
     * @param newObj object to be inserted
     * @return the affected row count (should be 1)
     * @throws SQLException if a database error occurs
     * @throws IllegalArgumentException if Type parameter and class differ
     * @see Connection#prepareStatement
     * @see PreparedStatement#executeUpdate()
     */
    public int update(Type oldObj, Type newObj)
            throws SQLException {
        if(updateStmt == null) {
            updateStmt = conn.prepareStatement(help.makeUpdateStatement());
        }
        bindValues(newObj, oldObj, updateStmt);
        return updateStmt.executeUpdate();
    }
    
    /**
     * <p>Executes a SELECT statement.</p>
     * <p>Uses a prepared statement to protect against SQL injections and
     * to possibly increase speed of many executions in a row.</p>
     * @param obj object to be selected
     * @return a ResultSet containing quieried object
     * @throws SQLException if a database error occurs
     * @throws IllegalArgumentException if Type parameter and class differ
     * @see Connection#prepareStatement
     * @see PreparedStatement#executeQuery()
     */
    public ResultSet select(Type obj)
            throws SQLException {
        if(selectStmt == null) {
            selectStmt = conn.prepareStatement(help.makeSelectStatement());
        }
        bindValues(null, obj, selectStmt);
        return selectStmt.executeQuery();
    }
    
    /**
     * <p>Executes a SELECT statement for every row.</p>
     * @param obj object to be selected
     * @return a ResultSet containing all rows in the table
     * @throws SQLException if a database error occurs
     * @throws IllegalArgumentException if Type parameter and class differ
     * @see Connection#createStatement() 
     * @see Statement#executeQuery()
     */
    public ResultSet selectAll(Type obj) 
            throws SQLException {
        Statement stmt = conn.createStatement();
        return stmt.executeQuery(help.makeSelectStatementForEveryRow());
    }
    
    private void bindValues(Type newObject, Type selectObject, PreparedStatement stmt)
            throws SQLException {
        Class fType;
        int nFields;
        if(newObject != null)
            nFields = help.getFieldsNumber();
        else
            nFields = 0;
        try {
            for(Field f: cl.getFields()) {
                fType = f.getType();
                if(newObject != null) {
                    bindValue(stmt, fType, help.getOrderIndex(f.getName()), f.get(newObject));
                }
                if(selectObject != null && f.isAnnotationPresent(PrimaryKey.class)) {
                    bindValue(stmt, fType,
                            nFields+help.getPrimaryOrderIndex(f.getName()),
                            f.get(newObject));
                }
            }
        } catch(NoSuchFieldException|IllegalAccessException e) {
            throw new IllegalArgumentException(e);
        }
    }
    
    private void bindValue(PreparedStatement stmt, Class fType, int fOrder, Object value)
            throws SQLException {
        if(fType==Byte.class || fType==Byte.TYPE) {
            stmt.setByte(fOrder, (Byte)value);
        } else if(fType==Short.class || fType==Short.TYPE) {
            stmt.setShort(fOrder, (Short)value);
        } else if(fType==Integer.class || fType==Integer.TYPE) {
            stmt.setInt(fOrder, (Integer)value);
        } else if(fType==Long.class || fType==Long.TYPE) {
            stmt.setLong(fOrder, (Long)value);
        } else if(fType==Float.class || fType==Float.TYPE) {
            stmt.setFloat(fOrder, (Float)value);
        } else if(fType==Double.class || fType==Double.TYPE) {
            stmt.setDouble(fOrder, (Double)value);
        } else if(fType==Character.class || fType==Character.TYPE) {
            stmt.setNString(fOrder, String.valueOf((Character)value));
        } else if(fType==String.class) {
            stmt.setNString(fOrder, (String)value);
        } else {
            throw new IllegalArgumentException();
        }
    }
    
    private PreparedStatement insertStmt;
    private PreparedStatement deleteStmt;
    private PreparedStatement updateStmt;
    private PreparedStatement selectStmt;
    
    private final Class cl;
    private final Connection conn;
    private final SqlHelper help;
}
