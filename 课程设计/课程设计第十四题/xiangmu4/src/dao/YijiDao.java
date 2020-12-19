package dao;

import tools.DatabaseConnection;
import vo.Erji;
import vo.Yiji;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class YijiDao {
    public ArrayList<Yiji> queryYiji(){
        ArrayList<Yiji> list=new ArrayList<Yiji>();
        DatabaseConnection dbc = new DatabaseConnection();
        System.out.println(dbc);
        Connection con = dbc.getConnection();
        try {

            // 3.创建语句
            String sql = "select * from yiji ";
            PreparedStatement pst = con.prepareStatement(sql);
            // 4.执行语句
            ResultSet rs = pst.executeQuery();
            // 5.结果处理
            while (rs.next()) {
                Yiji yiji = new Yiji();
                yiji.setYiji_code(rs.getString("yiji_code"));
                yiji.setYiji(rs.getString("yiji"));

                list.add(yiji); // 将对象存放于集合中
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 6.关闭连接
            dbc.close();
        }

        return list;
    }


    public ArrayList<Erji> queryErji(String yiji_code){
        ArrayList<Erji> list=new ArrayList<Erji>();
        DatabaseConnection dbc = new DatabaseConnection();
        Connection con = dbc.getConnection();

        try {

            // 3.创建语句
            String sql = "select * from Erji where yiji_code=?";
            PreparedStatement pst = con.prepareStatement(sql);
            pst.setString(1, yiji_code);
            // 4.执行语句
            ResultSet rs = pst.executeQuery();
            // 5.结果处理
            while (rs.next()) {
                Erji erji=new Erji();
                erji.setErji_code(rs.getString("erji_code"));
                erji.setErji(rs.getString("erji"));
                erji.setYiji_code(rs.getString("yiji_coode"));


                list.add(erji); // 将对象存放于集合中
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 6.关闭连接
            dbc.close();
        }

        return list;
    }



}
