import logic.AreaChecker;
import logic.AreaCheckerInterface;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;

// Обращается к areChecker'у
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start_time = System.currentTimeMillis();
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write("<tr>");
        if(areaChecker.inTheArea(
                new BigDecimal(req.getParameter("X")),
                new BigDecimal(req.getParameter("Y")),
                new BigDecimal(req.getParameter("R"))
        ))
            resp.getWriter().write("<td>Да</td>");
        else
            resp.getWriter().write("<td>Нет</td>");


        resp.getWriter().write(
                       "<td>" + req.getParameter("X") + "</td>"
                        + "<td>" + req.getParameter("Y") + "</td>"
                        + "<td>" + req.getParameter("R") + "</td>"
        );
        resp.getWriter().write(
                "<td>" + Long.toString(System.currentTimeMillis() - start_time) + " мс</td>"
                        + "<td> Server's os: "  + System.getProperty("os.name") + "</td>"
                +"</tr>"

        );


    }
    AreaCheckerInterface areaChecker = new AreaChecker();

}
