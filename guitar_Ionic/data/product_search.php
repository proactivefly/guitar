<?php
/**
*根据关键字搜索
*请求参数：
  kw-搜索关键字
*输出结果：
  {
    totalRecord: 37,
    data: [{},{} ... {}]
  }
*/
require('init.php');

@$kw = $_REQUEST['kw'];

//获取总记录数和总页数
$sql = "SELECT * FROM mf_product WHERE title1 like '%$kw%' or title2 like '%$kw%' or detail like '%$kw%'";
$result = mysqli_query($conn,$sql);
$output['totalRecord'] = intval( mysqli_fetch_row($result)[0] );

//获取数据
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($output);