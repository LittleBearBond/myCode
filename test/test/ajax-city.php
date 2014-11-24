<?php sleep(1) ?>
<?php
  $id = $_REQUEST['parentId'];
  switch($id){
   case 0 :
?>
{"status":"SUCCESS","statusCode":0,"data":[{"type":"leafNode","name":"北京","value":"110000"},{"type":"leafNode","name":"天津","value":"120000"},{"type":"next","name":"河北","value":"130000"},{"type":"next","name":"山西","value":"140000"},{"type":"next","name":"内蒙古","value":"150000"},{"type":"next","name":"辽宁","value":"210000"},{"type":"next","name":"吉林","value":"220000"},{"type":"next","name":"黑龙江","value":"230000"},{"type":"leafNode","name":"上海","value":"310000"},{"type":"next","name":"江苏","value":"320000"},{"type":"next","name":"浙江","value":"330000"},{"type":"next","name":"安徽","value":"340000"},{"type":"next","name":"福建","value":"350000"},{"type":"next","name":"江西","value":"360000"},{"type":"next","name":"山东","value":"370000"},{"type":"next","name":"河南","value":"410000"},{"type":"next","name":"湖北","value":"420000"},{"type":"next","name":"湖南","value":"430000"},{"type":"next","name":"广东","value":"440000"},{"type":"next","name":"广西","value":"450000"},{"type":"next","name":"海南","value":"460000"},{"type":"leafNode","name":"重庆","value":"500000"},{"type":"next","name":"四川","value":"510000"},{"type":"next","name":"贵州","value":"520000"},{"type":"next","name":"云南","value":"530000"},{"type":"next","name":"西藏","value":"540000"},{"type":"next","name":"陕西","value":"610000"},{"type":"next","name":"甘肃","value":"620000"},{"type":"next","name":"青海","value":"630000"},{"type":"next","name":"宁夏","value":"640000"},{"type":"next","name":"新疆","value":"650000"},{"type":"leafNode","name":"港澳台","value":"800000"},{"type":"leafNode","name":"海外","value":"810000"},{"type":"leafNode","name":"其它","value":"999999"}],"state":"0"}
<?php
      break;
    case 130000:
?>
{"status":"SUCCESS","statusCode":0,"data":[{"type":"leafNode","name":"石家庄","value":"130100"},{"type":"leafNode","name":"唐山","value":"130200"},{"type":"leafNode","name":"秦皇岛","value":"130300"},{"type":"leafNode","name":"邯郸","value":"130400"},{"type":"leafNode","name":"邢台","value":"130500"},{"type":"leafNode","name":"保定","value":"130600"},{"type":"leafNode","name":"张家口","value":"130700"},{"type":"leafNode","name":"承德","value":"130800"},{"type":"leafNode","name":"沧州","value":"130900"},{"type":"leafNode","name":"廊坊","value":"131000"},{"type":"leafNode","name":"衡水","value":"131100"}],"state":"0"}
<?php
      break;
    case 140000:
?>
{"status":"SUCCESS","statusCode":0,"data":[{"type":"leafNode","name":"太原","value":"140100"},{"type":"leafNode","name":"大同","value":"140200"},{"type":"leafNode","name":"阳泉","value":"140300"},{"type":"leafNode","name":"长治","value":"140400"},{"type":"leafNode","name":"晋城","value":"140500"},{"type":"leafNode","name":"朔州","value":"140600"},{"type":"leafNode","name":"晋中","value":"140700"},{"type":"leafNode","name":"运城","value":"140800"},{"type":"leafNode","name":"忻州","value":"140900"},{"type":"leafNode","name":"临汾","value":"141000"},{"type":"leafNode","name":"吕梁","value":"141100"}],"state":"0"}
<?php
      break;
    default :
?>
{"status":"SUCCESS","statusCode":0,"data":[{"type":"leafNode","name":"太原","value":"140100"},{"type":"leafNode","name":"大同","value":"140200"},{"type":"leafNode","name":"阳泉","value":"140300"},{"type":"leafNode","name":"长治","value":"140400"},{"type":"leafNode","name":"晋城","value":"140500"},{"type":"leafNode","name":"朔州","value":"140600"},{"type":"leafNode","name":"晋中","value":"140700"},{"type":"leafNode","name":"运城","value":"140800"},{"type":"leafNode","name":"忻州","value":"140900"},{"type":"leafNode","name":"临汾","value":"141000"},{"type":"leafNode","name":"吕梁","value":"141100"}],"state":"0"}

<?php
  }
?>
