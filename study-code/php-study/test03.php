<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>title</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta content="telephone=no" name="format-detection">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="description" content="">
	<meta name="keywords" content="">

</head>
<body>
	<?php
	echo  $_SERVER [ 'HTTP_USER_AGENT' ];
	echo  var_dump($_SERVER);
	if ( strpos ( $_SERVER [ 'HTTP_USER_AGENT' ],  'MSIE' ) !==  FALSE ) {
		echo  '正在使用 Internet Explorer。<br />' ;
	}
	?>
	<!--stripos不区分大小写-->
	<?php	if ( strpos ( $_SERVER [ 'HTTP_USER_AGENT' ],  'Chrome' ) !==  FALSE ) {?>
	<h3>strpos() 肯定没有返回假 (FALSE)</h3>
	<p>正在使用 Chrome</p>
	<?php } else {?>
	<h3>strpos() 肯定返回假 (FALSE)</h3>
	<center><b>没有使用Chrome</b></center>
	<?php } ?>
	<form action="action-form.php" method="post">
		<p>姓名: <input type="text" name="name" /></p>
		<p>年龄: <input type="text" name="age" /></p>
		<p><input type="submit" /></p>
	</form>
</body>
</html>
