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
package smt.Beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import smt.Business.Point;

/**
 *
 * @author Alexandr Bulantsov
 */
@ManagedBean
@RequestScoped
public class ImageInteraction {
    
    private Point point;
    private boolean hit;
    private MainModel model;
    private double xoffset;
    private double yoffset;
    
    public ImageInteraction() {
        point = new Point();
    }
    
    public void setPoint(Point p) {
        point = p;
    }
    
    public Point getPoint() {
        return point;
    }
    
    public void handle_click()
            throws Exception {
        model.addPoint(point);
    }
    
    public MainModel getModel() {
        return model;
    }

    public void setModel(MainModel model) {
        this.model = model;
    }

    /**
     * @return the xoffset
     */
    public double getXoffset() {
        return xoffset;
    }

    /**
     * @param xoffset the xoffset to set
     */
    public void setXoffset(double xoffset) {
        this.xoffset = xoffset;
    }

    /**
     * @return the yoffset
     */
    public double getYoffset() {
        return yoffset;
    }

    /**
     * @param yoffset the yoffset to set
     */
    public void setYoffset(double yoffset) {
        this.yoffset = yoffset;
    }
}
