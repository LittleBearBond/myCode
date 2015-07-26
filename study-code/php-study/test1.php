<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>01认证已提交</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
</head>
<body>

<?php
	echo "hello word";
	echo "我的第一段 PHP 脚本！";
	$color="red";
	echo "My car is " . $color . "<br>";
	echo "My house is " . $COLOR . "<br>";
	echo "My boat is " . $coLOR . "<br>";
?>
<?php
// 这是单行注释
# 这也是单行注释
/*
这是多行注释块
它横跨了
多行
*/
$x=5; // 全局作用域

function myTest() {
  $y=10; // 局部作用域
  echo "<p>测试函数内部的变量：</p>";
  echo "变量 x 是：$x";
  echo "<br>";
  echo "变量 y 是：$y";
}

myTest();

echo "<p>测试函数之外的变量：</p>";
echo "变量 x 是：$x";
echo "<br>";
echo "变量 y 是：$y";
?>

</body>
</html>
