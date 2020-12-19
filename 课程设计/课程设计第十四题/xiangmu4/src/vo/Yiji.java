package vo;

public class Yiji {
    private String yiji;
    private String yiji_code;

    public String getYiji() {
        return yiji;
    }

    public void setYiji(String yiji) {
        this.yiji = yiji;
    }

    public String getYiji_code() {
        return yiji_code;
    }

    public void setYiji_code(String yiji_code) {
        this.yiji_code = yiji_code;
    }

    @Override
    public String toString() {
        return "Yiji{" +
                "yiji='" + yiji + '\'' +
                ", yiji_code='" + yiji_code + '\'' +
                '}';
    }
}
