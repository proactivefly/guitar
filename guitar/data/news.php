<?php

/*
请求参数：pageNum,请求的页码，默认为1
响应数据：
{
    totalRecord:60,新闻总条数
    pageSize:4,每页显示的条数
    pageCount:5,一共有多少页
    pageNum:1,响应的页码
    data:[{},{},{}]返回的数据
}
*/
require('init.php');
@$pageNum=$_REQUEST['pageNum'] or $pageNum=1;

$output['pageNum']=intval($pageNum);
$output['pageSize']=6;
//获取总条数和总页数
$sql="SELECT COUNT(*) FROM mf_news";
$result=mysqli_query($conn,$sql);
$output['totalRecord']=intval(mysqli_fetch_row($result)[0]);
$output['pageCount']=ceil($output['totalRecord']/$output['pageSize']);
//获取数据
$start=($output['pageNum']-1)*$output['pageSize'];
$count=$output['pageSize'];
$sql="SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT $start,$count";
$result=mysqli_query($conn,$sql);
$output['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);







