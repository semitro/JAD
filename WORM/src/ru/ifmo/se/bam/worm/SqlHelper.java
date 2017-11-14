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

import ru.ifmo.se.bam.worm.autoincrement.AutoIncrementInteger;
import ru.ifmo.se.bam.worm.autoincrement.AutoIncrementShort;
import ru.ifmo.se.bam.worm.autoincrement.AutoIncrementLong;
import java.lang.reflect.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>Class to help create and execute SQL statements for a RelationalClass.</p>
 * <p>Provides CREATE TABLE, INSERT, UPDATE, DELETE and SELECT statements.
 * All statements except CREATE TABLE are intended to be used in 
 * {@link java.sql.PreparedStatement}.</p>
 * <p>Warning: columns in SQL statements are always in alphabetical order.</p>
 * @author Alexandr Bulantsov
 * @see RelationalClass
 * @see DbmsDataTypesProvider
 */
public class SqlHelper {
    
    /**
     * <p>Creates an instace of ORMHelper for specified class.</p>
     * <p>The class must be annotated with {@link RelationalClass} and
     * follow the stated contract or an exception will be thrown.</p>
     * <p>The class name will be used as name of the table in database.
     * Data types depend on the target DBMS.</p>
     * @param cl the class to map
     * @param dbms the target DBMS
     * @throws IllegalArgumentException if class is not suitable
     * @throws UnsupportedOperationException if {@code dbms} is not supported
     * @see DbmsDataTypesProvider
     */
    public SqlHelper(Class cl, String dbms) {
        checkClass(cl);
        this.cl = cl;
        name = cl.getSimpleName();
        fields = cl.getFields();
        Arrays.parallelSort(fields, 
                (Member o1, Member o2) -> o1.getName().compareTo(o2.getName()));
        primary = new ArrayList<>();
        for(Field f: fields) {
            if(f.getAnnotation(PrimaryKey.class)!=null)
                primary.add(f.getName());
        }
        this.dbms = dbms;
        help = DbmsDataTypesProvider.inst();
        if(help.get(dbms, String.class)==null)
            throw new UnsupportedOperationException(
                    "Requested DBMS is not supported");
    }
    
    /**
     * <p>Returns a Class object for which this instance was
     * created.</p>
     * @return a {@link Class} object
     */
    public Class getHelpedClass() {
        return cl;
    }
    
    /**
     * <p>Gets the index of this field in the sequence of fields sorted
     * by name.</p>
     * <p>Warning: indexes start with 1.</p>
     * @param fieldName
     * @return index of field {@code fieldName}
     * @throws NoSuchFieldException if {@code fieldName} does not match a
     * public field
     */
    public int getOrderIndex(String fieldName) throws NoSuchFieldException {
        if(fieldOrder==null) {
            fieldOrder = new HashMap<>();
            for(int i=0; i<fields.length; i++) {
                fieldOrder.put(fields[i].getName(), i+1);
            }
        }
        if(!fieldOrder.containsKey(fieldName))
            throw new NoSuchFieldException(fieldName);
        return fieldOrder.get(fieldName);
    }
    
    /**
     * <p>Gets the number of public fields of the class.</p>
     * <p>This method always returns positive number.</p>
     * @return number of public fields
     */
    public int getFieldsNumber() {
        return fields.length;
    }
    
    /**
     * <p>Gets the index of this field in the sequence of fields annotated
     * with PrimaryKey sorted by name.</p>
     * <p>Warning: indexes start with 1.</p>
     * @param fieldName
     * @return index of field {@code fieldName}
     * @throws NoSuchFieldException if {@code fieldName} does not match a
     * primary key field
     */
    public int getPrimaryOrderIndex(String fieldName) throws NoSuchFieldException {
        if(!primary.contains(fieldName))
            throw new NoSuchFieldException(fieldName);
        return primary.indexOf(fieldName)+1;
    }
    
    /**
     * <p>Gets the number of primary key fields of the classs.</p>
     * <p>If no public fields in the class are annotated with
     * {@link PrimaryKey}, this method will return 0.</p>
     * @return number of primary key fields or 0
     */
    public int getPrimaryFieldsNumber() {
        return primary.size();
    }
    
    /**
     * <p>Generates a CREATE TABLE statement based on the class.</p>
     * <p>Name of the table in the statement will be the same as name of the
     * class, and its columns will be named after fields of the class.</p>
     * <p>If no fields of the class are annotated with {@link PrimaryKey}
     * an {@code CLASS_NAME_id} column of type {@code integer} will be added
     * automatically.</p>
     * <p>Fields are sorted by name to counteract possible unpredictable order.</p>
     * <p>The statement string is generated lazily and is cached afterwards.</p>
     * @return a CREATE TABLE SQL statement
     * @see PrimaryKey
     * @see NotNull
     * @see AutoIncrement
     */
    public String makeCreateTableStatement() {
        if(createS==null) {
            StringBuilder ret = new StringBuilder();
            Class fieldType;
            ret.append("CREATE TABLE ").append(name).append('(');
            for(Field f: fields) {
                ret.append(f.getName()).append(' ');
                fieldType = f.getType();
                if(f.getAnnotation(AutoIncrement.class)!=null 
                        && isIntegerClass(fieldType)) {
                    if(fieldType.equals(Short.class) || fieldType.equals(Short.TYPE))
                        ret.append(help.get(dbms, AutoIncrementShort.class));
                    else if(fieldType.equals(Integer.class) || fieldType.equals(Integer.TYPE))
                        ret.append(help.get(dbms, AutoIncrementInteger.class));
                    else if(fieldType.equals(Long.class) || fieldType.equals(Long.TYPE))
                        ret.append(help.get(dbms, AutoIncrementLong.class));
                } 
                else {
                    ret.append(help.get(dbms, fieldType));
                }
                if(f.getAnnotation(NotNull.class)!=null)
                    ret.append(" not null");
                if(f.getAnnotation(Unique.class)!=null)
                    ret.append(" unique");
                ret.append(',');
            }
            if(!primary.isEmpty()) {
                ret.append("primary key(");
                for(String f: primary) {
                    ret.append(f).append(',');
                }
                ret.deleteCharAt(ret.length()-1) // Delete last comma
                        .append(')');
            }
            else {
                ret.append(name).append("_id ")
                        .append(help.get(dbms, AutoIncrementLong.class))
                        .append(" primary key");
            }
            ret.append(')');
            createS = ret.toString();
        }
        return createS;
    }
    
    /**
     * <p>Generates a prepared insert statement for the class.</p>
     * <p>Name of the table in the statement will be the same as name of the
     * class, and its columns will be named after fields of the class.</p>
     * <p>Generated statement will contain every public field of this class
     * except those annotated with {@link AutoIncrement}, sorted by name.</p>
     * <p>The statement string is generated lazily and is cached afterwards.</p>
     * @return an INSERT SQL statement (for PreparedStatement)
     */
    public String makeInsertStatement() {
        if(insertS==null) {
            StringBuilder ret = new StringBuilder();
            List<Field> flds = new ArrayList<>();
            for(Field f: fields) {
                if(f.getAnnotation(AutoIncrement.class)==null)
                    flds.add(f);
            }
            ret.append("INSERT INTO ").append(name);
            if(flds.size()!=fields.length) {
                ret.append('(');
                for(Field f: flds) {
                    ret.append(f.getName()).append(',');
                }
                ret.deleteCharAt(ret.length()-1) // Delete last comma
                        .append(')');
            }
            ret.append(" values (");
            for(Field f: flds) {
                ret.append("?,");
            }
            ret.deleteCharAt(ret.length()-1)
                    .append(')');
            insertS = ret.toString();
        }
        return insertS;
    }
    
    /**
     * <p>Generates a prepared delete statement for the class.</p>
     * <p>Name of the table in the statement will be the same as name of the
     * class, and its columns will be named after fields of the class.</p>
     * <p>Generated statement will contain only fields annotated with
     * {@link PrimaryKey}, sorted by name. If class has no such fields,
     * statement will contain column {@code CLASS_NAME_id}.</p>
     * <p>The statement string is generated lazily and is cached afterwards.</p>
     * @return a DELETE SQL statement (for PreparedStatement)
     */
    public String makeDeleteStatement() {
        if(deleteS==null) {
            StringBuilder ret = new StringBuilder();
            ret.append("DELETE FROM ")
                    .append(name)
                    .append(" WHERE ");
            if(!primary.isEmpty()) {
                for(String name: primary) {
                    ret.append(name)
                            .append("=? AND ");
                }
                ret.delete(ret.length()-5, ret.length());   // Delete AND 
            }
            else {
                ret.append(name).append("_id=?");
            }
            deleteS = ret.toString();
        }
        return deleteS;
    }
    
    /**
     * <p>Generates a prepared update statement for the class.</p>
     * <p>Name of the table in the statement will be the same as name of the
     * class, and its columns will be named after fields of the class.</p>
     * <p>Generated statement will contain every public field of this class
     * sorted by name for SET clause and only fields annotated with 
     * {@link PrimaryKey} for WHERE clause, also sorted by name.
     * If no fields are annotated with {@code PrimaryKey}, a 
     * {@code CLASS_NAME_id} column will be present instead.</p>
     * <p>The statement string is generated lazily and is cached afterwards.</p>
     * @return an UPDATE SQL statement (for PreparedStatement)
     */
    public String makeUpdateStatement() {
        if(updateS==null) {
            StringBuilder ret = new StringBuilder();
            List<Field> flds = new ArrayList<>();
            for(Field f: fields) {
                if(f.getAnnotation(AutoIncrement.class)==null)
                    flds.add(f);
            }
            ret.append("UPDATE ")
                    .append(name)
                    .append(" SET ");
            for(Field f: flds) {
                ret.append(f.getName())
                        .append("=?,");
            }
            ret.deleteCharAt(ret.length()-1)
                    .append(" WHERE ");
            if(!primary.isEmpty()) {
                for(String name: primary) {
                    ret.append(name)
                            .append("=? AND ");
                }
                ret.delete(ret.length()-5, ret.length());
            }
            else {
                ret.append(name).append("_id=?");
            }
            updateS = ret.toString();
        }
        return updateS;
    }
    
    /**
     * <p>Generates a select statement for the class quering every row.</p>
     * <p>Name of the table in the statement will be the same as name of the
     * class.</p>
     * <p>The statement string is generated lazily and is cached afterwards.</p>
     * @return a SELECT SQL statement
     */
    public String makeSelectStatementForEveryRow() {
        if(selectAllS==null) {
            StringBuilder ret = new StringBuilder();
            ret.append("SELECT * FROM ")
                    .append(name);
            selectAllS = ret.toString();
        }
        return selectAllS;
    }
    
    /**
     * <p>Generates a prepared select statement for the class.</p>
     * <p>Name of the table in the statement will be the same as name of the
     * class, and its columns will be named after fields of the class.</p>
     * <p>Generated statement will contain only fields annotated with
     * {@link PrimaryKey}, sorted by name. If class has no such fields,
     * statement will contain column {@code CLASS_NAME_id}.</p>
     * <p>The statement string is generated lazily and is cached afterwards.</p>
     * @return a SELECT SQL statement (for PreparedStatement)
     */
    public String makeSelectStatement() {
        if(selectS==null) {
            StringBuilder ret = new StringBuilder();
            ret.append("SELECT * FROM ")
                    .append(name)
                    .append(" WHERE ");
            if(!primary.isEmpty()) {
                for(String name: primary) {
                    ret.append(name)
                            .append("=? AND ");
                }
                ret.delete(ret.length()-5, ret.length());
            }
            else {
                ret.append(name).append("_id=?");
            }
            selectS = ret.toString();
        }
        return selectS;
    }
    
    /**
     * <p>Checks if class is suitable as a {@link RelationalClass}.</p>
     * <p>If this method does not throw an exception, then the class passed
     * the test. Following checks are made: <ul>
     * <li>class has {@link RelationalClass} annotation;</li>
     * <li>class has public fields;</li>
     * <li>all public fields are either primitive types, wrappers or Strings.</li>
     * </ul>
     * If class doesn't pass the test, then an {@link IllegalArgumentException}
     * is thrown with relevant message.</p>
     * @param cl class to check
     * @throws IllegalArgumentException if class did not pass the checks
     */
    public static void checkClass(Class cl) {
        if(cl.getAnnotation(RelationalClass.class)==null)
            throw new IllegalArgumentException("Class "+cl.getName()+" is not a RelationalClass");
        Field[] fields = cl.getFields();
        if(fields.length==0)
            throw new IllegalArgumentException("Class "+cl.getName()+" has no public fields");
        if(!Arrays.stream(fields).allMatch(
                (f)->supportedTypes.contains(f.getType()))
                )
            throw new IllegalArgumentException("Class "+cl.getName()+" has public fields of unsupported types");
    }
    
    /**
     * <p>Checks if class is an integer type.</p>
     * <p>The class is considered an integer type if it is a class of 
     * {@code int}, {@code short}, {@code long} or their wrappers.</p>
     * @param cl Type in question
     * @return 
     */
    public static boolean isIntegerClass(Class cl) {
        if(
                cl.equals(int.class) || cl.equals(Integer.class) ||
                cl.equals(short.class) || cl.equals(Short.class) ||
                cl.equals(long.class) || cl.equals(Long.class)
                )
            return true;
        return false;
    }
    
    private final Class cl;
    private final String name;
    private final Field[] fields;
    private final List<String> primary;
    private String createS;
    private String insertS;
    private String deleteS;
    private String updateS;
    private String selectAllS;
    private String selectS;
    private Map<String,Integer> fieldOrder;
    private final DbmsDataTypesProvider help;
    private final String dbms;
    
    private static final List<Class> supportedTypes = Arrays.asList(
            Byte.class, Byte.TYPE, Short.class, Short.TYPE, Integer.class,
            Integer.TYPE, Long.class, Long.TYPE, Float.class, Float.TYPE,
            Double.class, Double.TYPE, Boolean.class, Boolean.TYPE,
            Character.class, Character.TYPE, String.class);
}
