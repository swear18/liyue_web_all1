package dao;

import vo.Erji;
import vo.Yiji;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class ErjiDao {
    public ArrayList<Yiji> queryProvince() {
        ArrayList<Yiji> list = new ArrayList<Yiji>();
        Connection con = null;
        try {
            Class.forName("");
            con = DriverManager.getConnection("", "", "");
            String sql = "select * from yiji";
            PreparedStatement pst = con.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();
            while (rs.next()) {
                Yiji yiji = new Yiji();
                yiji.setYiji_code(rs.getString("yiji_code"));
                yiji.setYiji(rs.getString("yiji"));
                list.add(yiji);
            }
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;

    }

    public ArrayList<Erji> queryErji(String erji_code) {
        ArrayList<Erji> list = new ArrayList<Erji>();

        return list;

    }
}