package dao;

import tools.DatabaseConnection;
import vo.Good;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class GoodDao {
    public boolean insert(Good good){
        boolean success = false;

        DatabaseConnection dbc = new DatabaseConnection();
        Connection con = dbc.getConnection();
        try {

            // 3.创建语句
            String sql = "insert into good(idName,goodBarcode,goodChineseName,location,danwei_code,yiji_code,erji_code,yiji,erji,danwei)";
            sql += " values(?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement pst = con.prepareStatement(sql);

            pst.setString(1, good.getIdName());
            pst.setString(2, good.getGoodBarcode());
            pst.setString(3, good.getGoodChineseName());
            pst.setString(4, good.getLocation());
            pst.setString(5, good.getDanwei_code());
            pst.setString(6, good.getYiji_code());
            pst.setString(7, good.getErji_code());
            pst.setString(8, good.getYiji());
            pst.setString(9, good.getErji());
            pst.setString(10, good.getDanwei());
            // 4.执行语句
            int i = pst.executeUpdate();
            // 5.结果处理
            if (i > 0) {
                success = true;
            }

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            // 6.关闭连接
            dbc.close();
        }

        return success;


    }
}
