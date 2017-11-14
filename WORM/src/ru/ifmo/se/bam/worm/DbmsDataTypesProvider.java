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

import ru.ifmo.se.bam.worm.autoincrement.AutoIncrementShort;
import ru.ifmo.se.bam.worm.autoincrement.AutoIncrementInteger;
import ru.ifmo.se.bam.worm.autoincrement.AutoIncrementLong;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>Provider of DBMS-specific data type strings.</p>
 * <p>Currently supports following database management systems (DBMS):
 * <ul>
 * <li>psql - PostgreSQL</li>
 * <li>oracle - Oracle</li>
 * </ul>
 * </p>
 * <p>This is a singleton class.</p>
 * @author Alexandr Bulantsov
 */
public class DbmsDataTypesProvider {
    
    /**
     * <p>Gets the instance of this class.</p>
     * @return instance
     */
    public static DbmsDataTypesProvider inst() {
        return instance;
    }
    
    /**
     * <p>Gets the data type name for specified class.</p>
     * <p>Currently supports following DBMSes:
     * <ul>
     * <li>psql - PostgreSQL</li>
     * <li>oracle - Oracle</li>
     * </ul>
     * </p>
     * <p>Special case of autoincremented integer fields are represented by
     * {@link AutoIncrementShort}, {@link AutoIncrementInteger} and
     * {@link AutoIncrementLong} classes.</p>
     * <p>If no mapping for the specified DBMS or class is found, a {@code null}
     * is returned.</p>
     * @param dbms DBMS driver name (see above)
     * @param type Class of the object for storing in database
     * @return data type string or {@code null}
     */
    public String get(String dbms, Class type) {
       Map<Class, String> db = map.get(dbms);
       return  db==null ? null : db.get(type);
    }
    
    private DbmsDataTypesProvider() {
        map = new HashMap<>();
        
        Map<Class, String> psql = new HashMap<>();
        map.put("psql", psql);
        psql.put(AutoIncrementShort.class, "smallserial");
        psql.put(AutoIncrementInteger.class, "serial");
        psql.put(AutoIncrementLong.class, "bigserial");
        psql.put(Byte.class, "smallint");
        psql.put(Byte.TYPE, "smallint");
        psql.put(Short.class, "smallint");
        psql.put(Short.TYPE, "smallint");
        psql.put(Integer.class, "integer");
        psql.put(Integer.TYPE, "integer");
        psql.put(Long.class, "bigint");
        psql.put(Long.TYPE, "bigint");
        psql.put(Character.class, "character(1)");
        psql.put(Character.TYPE, "character(1)");
        psql.put(Float.class, "real");
        psql.put(Float.TYPE, "real");
        psql.put(Double.class, "double precision");
        psql.put(Double.TYPE, "double precision");
        psql.put(String.class, "text");
        
        Map<Class, String> oracle = new HashMap<>();
        map.put("oracle", oracle);
        oracle.put(AutoIncrementShort.class, "NUMBER(5,0) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1)");
        oracle.put(AutoIncrementInteger.class, "NUMBER(10,0) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1)");
        oracle.put(AutoIncrementLong.class, "NUMBER(19,0) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1)");
        oracle.put(Byte.class, "NUMBER(3,0)");
        oracle.put(Byte.TYPE, "NUMBER(3,0)");
        oracle.put(Short.class, "NUMBER(5,0)");
        oracle.put(Short.TYPE, "NUMBER(5,0)");
        oracle.put(Integer.class, "NUMBER(10,0)");
        oracle.put(Integer.TYPE, "NUMBER(10,0)");
        oracle.put(Long.class, "NUMBER(19,0)");
        oracle.put(Long.TYPE, "NUMBER(19,0)");
        oracle.put(Character.class, "NCHAR(1)");
        oracle.put(Character.TYPE, "NCHAR(1)");
        oracle.put(Float.class, "BINARY_FLOAT");
        oracle.put(Float.TYPE, "BINARY_FLOAT");
        oracle.put(Double.class, "BINARY_DOUBLE");
        oracle.put(Double.TYPE, "BINARY_DOUBLE");
        oracle.put(String.class, "NVARCHAR2(4000)");
    }
    
    private final Map<String, Map<Class, String>> map;
    
    private final static DbmsDataTypesProvider instance = new DbmsDataTypesProvider();
}
