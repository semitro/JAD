import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Класс ControllerServlet, судя приходят все запросы,
 * Отсюда они перераспределяются на другие контроллеры
 */
public class mainController extends HttpServlet{
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(isToAreaCheck(req)) {
            // Если запрос связан с проверкой попадания, перенаправляем
            // на нужный сервлет
            req.getRequestDispatcher("checkTheArea").forward(req, resp);
        }
        else // корневая страница
            resp.sendRedirect(" ");

    }
    private boolean isToAreaCheck(HttpServletRequest req){
        if(req == null)
            return false;

        if( req.getParameter("X") != null
            && req.getParameter("Y") != null
            && req.getParameter("R") != null)
            return true;

        return false;
    }
}
