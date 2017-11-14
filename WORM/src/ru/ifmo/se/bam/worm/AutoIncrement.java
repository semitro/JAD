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
import java.lang.annotation.*;
/**
 * <p>Defines field as being an auto-increment field.</p>
 * <p>The field must be of an integer type (short, int or long or wrapper), 
 * otherwise this annotation will be ignored.
 * Auto-incremented fields are intended to be filled by DBMS, so
 * they do not appear in INSERT or UPDATE statements (except as
 * an old value field).</p>
 * <p>For PostgreSQL this annotation means one of {@code serial} types.</p>
 * @author Alexandr Bulantsov
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoIncrement {}
