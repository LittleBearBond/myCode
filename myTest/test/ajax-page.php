<?php
$status = $_REQUEST['error'] ? 1 : 0;
$message = $status == 1 ? "验证码好像不对哦" : "SUCCESS";
//phpinfo();
//print_r('2132132');
//print('sdfdsfds');
//var_dump($_REQUEST);
if (!empty($_REQUEST['msg'])) {
	$msg=$_REQUEST['msg'];
	/*if ((string)$_REQUEST['error'] == "3") {*/
		$message = $msg;
		$status  = $_REQUEST['error'];
		/*}*/
	}

$d=array("result"=>$status,"message"=>$message,"status"=>$_REQUEST['error']);
$c=$_REQUEST['callback'];
$rd;
if ($c===null || $c==='') {
	echo json_encode($d);
}else{
	$rd=$c+"("+json_encode($d)+")";
	echo  $c."(".json_encode($d).")";
}
// var_dump($d);
// echo '<br/>';
//echo json_encode($c);
?>

