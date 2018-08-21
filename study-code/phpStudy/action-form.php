<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><?php  echo  htmlspecialchars ( $_POST [ 'name' ]);  ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	<meta content="telephone=no" name="format-detection">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="description" content="">
	<meta name="keywords" content="">

</head>
<body>
	你好，<?php  echo  htmlspecialchars ( $_POST [ 'name' ]);  ?>。
	你 <?php  echo (int) $_POST [ 'age' ];  ?> 岁了。
	<br>
	<hr>

	<?php
	error_reporting ( E_ALL );
	$array1  = array(
		"foo"  =>  "bar" ,
		"bar"  =>  "foo" ,
		);
	echo  var_dump($array1);
	echo '<hr>';
	$array  = array(
		1     =>  "a" ,
		"1"   =>  "b" ,
		1.5   =>  "c" ,
		true  =>  "d" ,
		);
	var_dump ( $array );
	echo '<hr>';
	$array2  = array( "foo" ,  "bar" ,  "hallo" ,  "world" );
	echo var_dump ( $array2 );
	?>
</body>
</html>
