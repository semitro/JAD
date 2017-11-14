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
 * <p>Marks class as ready to be mapped to a database table.</p>
 * <p>The class must follow the contract:
 * <ul>
 * <li>class must have at least one public field;</li>
 * <li>every public field must be a primitive type,
 * a wrapper class or a String.</li>
 * </ul>
 * All public fields will be mapped to columns in the table.</p>
 * <p>Fields may be annotated with:
 * <ul>
 * <li>{@link PrimaryKey} to be a part of the primary key;</li>
 * <li>{@link NotNull} to have {@code not null} constraint applied in
 * the database;</li>
 * <li>{@link Unique} to have {@code unique} constraint applied in
 * the database;</li>
 * <li>{@link AutoIncrement} to be auto-assigned (only applicable to 
 * short, int and long types).</li>
 * </ul>
 * </p>
 * @author Alexandr Bulantsov
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface RelationalClass {}
