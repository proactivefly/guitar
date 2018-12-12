$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
    navText("公司动态");
  });

  //获取nid
  var str=location.href;
  var nid=str.substr(str.lastIndexOf("=")+1);

  $.ajax({
    type:"post",
    url:"data/news_detail.php",
    data:{nid:nid},
    success:function(d){
      $(".news_details>h2").html(d.title);
      var t=dateFormat(parseInt(d.pubTime),"-")
      $(".news_details>span").append(t);
      $(".news_content").html(d.content);
    }
  });




});


