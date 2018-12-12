<?php
/**
*查询指定用户的购物车内容
*请求参数：
  uid-用户ID，必需
*输出结果：
  {
    "uid": 1,
    "products":[
      {"pid":1,"title1":"xxx","pic":"xxx"},
      {"pid":3,"title1":"xxx","pic":"xxx"},
      ...
      {"pid":5,"title1":"xxx","pic":"xxx"}
    ]
  }
*/
@$uid = $_REQUEST['uid'] or die('uid required');
$output['uid'] = $uid;

require('init.php');

$sql = "SELECT pid,title1,pic FROM mf_product WHERE pid IN (SELECT productId FROM mf_cart_detail WHERE cartId=(SELECT cid FROM mf_cart WHERE userId=$uid))";
$result = mysqli_query($conn,$sql);
$output['products'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($output);