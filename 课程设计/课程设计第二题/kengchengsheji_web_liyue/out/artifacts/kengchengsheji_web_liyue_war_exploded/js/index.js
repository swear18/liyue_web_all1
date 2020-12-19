function fillyiji() {
    $.ajax({
        type: "post",
        url: "queryyiji.do",
        data: {},
        dataType: "json",
        success: function(response) {
            var yijiElement = document.getElementById("yiji");
            //清除select的所有option
            yijiElement.options.length = 0;
            //增加一个选项
            yijiElement.add(new Option("一级目录", ""));
            //循环增加其他所有选项
            for (index = 0; index < response.length; index++) {
                yijiElement.add(new Option(response[index].yijiName,
                    response[index].yijiCode));
            }
        }
    });
}

var goodBarcode_correct = false;
var idName_correct = false;
var goodChineseName_correct = false;
var yiji_correct = false;
var erji_correct = false;
var password_correct = false;
var password1_correct = false;

$(document).ready(function() {
    fillyiji(); //调用函数，填充省份下拉框

    /**
     * 省份下拉框选择发生改变事件：
     * 清空城市下拉框选项，增加默认提示项
     * 检查是否选择了省份，没有选择则给出错误提示并返回
     * 否则，清除错误提示信息，查询被选择省份对应的城市信息，增加到城市下拉框的选择列表中
     */
    $("#yiji").change(function(e) {
        if ($(this).val() == "") {
            $("#yijiError").css("color", " #c00202");
            $("#yijiError").text("必须选择一级目录！");
            return;
        }
        yiji_correct = true;
        $("#yijiError").text("");
        $("#erji").empty();
        $("#erji").append($("<option>").val("").text("请选择二级目录"));

        var yijiCode = $("#yiji").val();
        $.ajax({
            type: "post",
            url: "queryyijierji.do",
            data: { yijiCode: yijiCode },
            dataType: "json",
            success: function(response) {
                for (index = 0; index < response.length; index++) {
                    var option = $("<option>").val(response[index].erjiCode)
                        .text(response[index].erjiName);
                    $("#erji").append(option);
                }
            }
        });
    });

    $("#yiji").blur(function(e) {
        if ($(this).val() == "") {
            $("#yijiError").css("color", " #c00202");
            $("#yijiError").text("必须选择一级目录！");
        } else {
            $("#yijiError").text("");
            yiji_correct = true;
        }
    });

    /**
     * 城市下拉框选择项变化事件：检查是否选择了二级目录
     */
    $("#erji").blur(function(e) {
        if ($(this).val() == "") {
            $("#erjiError").css("color", " #c00202");
            $("#erjiError").text("必须选择二级目录！");
        } else {
            $("#erjiError").text("");
            erji_correct = true;
        }
    });

    //条形码输入框离开事件
    $('#goodBarcode').blur(function(event) {
        if ($(this).val() == "") {
            $("#goodBarcodeError").css("color", " #c00202");
            $("#goodBarcodeError").text("条形码不能为空");
            return;
        }
        if (/^[a-zA-Z][a-zA-Z\d]{3,14}$/.test(this.value) == false) {
            $("#goodBarcodeError").css("color", " #c00202");
            $("#goodBarcodeError").text("条形码只能使用英文字母和数字，以字母开头，长度为4到15个字符");
            return;
        }
        $.ajax({
            type: "post",
            url: "checkExist.do",
            data: { goodBarcode: $(this).val() },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    $("#goodBarcodeError").css("color", "green");
                    $("#goodBarcodeError").text("条形码可以用来注册");
                    goodBarcode_correct = true;
                } else {
                    $("#goodBarcodeError").css("color", "#c00202");
                    $("#goodBarcodeError").text("条形码已存在");
                }
            }
        });
    });
    /**
     * 商品货号输入框离开事件
     * 使用正则表达式表达式检查输入是否符合要求（必须为中文，长度2-4）
     */
    $('#idName').blur(function(event) {
        if ($(this).val() == "") {
            $("#idNameError").css("color", " #c00202");
            $("#idNameError").text("商品货号不能为空");
            return;
        }
        if (/^[\u4e00-\u9fa5]{2,4}$/.test(this.value) == false) {
            $("#idNameError").css("color", " #c00202");
            $("#idNameError").text("商品货号只能使用中文，长度为2到4个字符");
        } else {
            idName_correct = true;
            $("#idNameError").text("");
        }
    });
    /**
     * 商品中文名字地址输入框离开事件
     * (1)使用正则表达式表达式检查输入是否符合要求
     * (2)使用ajax检查商品中文名字地址是否已存在
     */
    $("#goodChineseName").blur(function(event) {
        if ($(this).val() == "") {
            $("#goodChineseNameError").css("color", " #c00202");
            $("#goodChineseNameError").text("商品中文名字不能为空");
            return;
        }
        if (/^[a-zA-Z0-9]+([._\\]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.value) == false) {
            $("#goodChineseNameError").css("color", " #c00202");
            $("#goodChineseNameError").text("商品中文名字格式不对");
            return;
        }

        $.ajax({
            type: "post",
            url: "checkExist.do",
            data: { goodChineseName: $(this).val() },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    $("#goodChineseNameError").css("color", "green");
                    $("#goodChineseNameError").text("商品中文名字地址可以用来注册");
                    goodChineseName_correct = true;
                } else {
                    $("#goodChineseNameError").css("color", "#c00202");
                    $("#goodChineseNameError").text("商品中文名字必须唯一");
                }
            }
        });
    });

    //密码输入框离开事件：
    $("#password").blur(function() {
        var password_min_length = 3
        if ($("#password").val().length >= password_min_length) {
            $("#passwordError").css("color", "green");
            $("#passwordError").text("密码设置成功");
            password_correct = true;
        } else {
            $("#passwordError").css("color", "#c00202");
            $("#passwordError").text("密码长度至少为3");
        }
    });

    //确认密码离开事件
    $("#password1").blur(function() {
        var password_min_length = 3;
        if ($("#password").val() == $("#password1").val() && $("#password").val().length >= password_min_length) {
            $("#password1Error").css("color", "green");
            $("#password1Error").text("密码设置成功");
            password1_correct = true;
        } else {
            $("#password1Error").css("color", "#c00202");
            $("#password1Error").text("密码不一致或长度不够");

        }
    });

    /**
     * 注册按钮点击事件
     */
    $("#btLogin").click(function(e) {
        if (goodBarcode_correct && idName_correct && goodChineseName_correct && yiji_correct && erji_correct && password_correct && password1_correct) {
            $.ajax({
                type: "post",
                url: "register.do",
                data: $("#registerForm").serialize(), //将表单内容序列化成一个URL 编码字符串
                dataType: "json",
                success: function(response) {
                    if (response.code == 0) {
                        alert("注册成功，将自动跳转到登录页面");
                        window.location.href = "login.jsp";
                    }
                }
            });
        } else {
            $("#goodBarcode").blur();
            $('#idName').blur();
            $("#goodChineseName").blur();
            $("#password").blur();
            $("#password1").blur();
            $("#yiji").blur();
            $("#erji").blur();
        }
    });
});