package controller;

import com.google.gson.Gson;
import dao.YijiDao;
import vo.Erji;
import vo.Yiji;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet(urlPatterns = "queryyiji.do")
public class Queryyiji extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String yijiCode=request.getParameter("yiji_code");
        String jsonStr = "";
        YijiDao dao=new YijiDao();
        if (yijiCode==null){
            //û�������������ʾ��ѯ����һ���б�
            ArrayList<Yiji> list=dao.queryYiji();
            jsonStr = new Gson().toJson(list);
        }else{
            //��yijicode��ѯ��Ӧ���б�
            ArrayList<Erji>  list=dao.queryErji(yijiCode);
            jsonStr = new Gson().toJson(list);
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out = response.getWriter();
            System.out.println(jsonStr);
            out.print(jsonStr);
            out.flush();
            out.close();
        }




    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {

    }
}
