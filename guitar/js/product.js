$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
    navText("产品中心");
  });


  var pageNum=1;//请求页面
  var type=1;   //产品类型
  var pageC=0;  //总页码数
  //获取type值
  var str=location.href;
  if(str.lastIndexOf('=')==-1){
    type=1;
  }else{
    type=str.substr(str.lastIndexOf('=')+1);
  }
  $(".pl_header a").eq(type-1).addClass("cur");
  pList(pageNum,type);

  //点击切换类型的时候
  $(".pl_header a").click(function(e){
    e.preventDefault();
    var index=$(this).index();
    $(".pl_header a").removeClass();
    $(this).addClass("cur");
    pageNum=1;
    type=index+1;
    pList(pageNum,type);
  });

  //点击分页页码的时候
  $(".pages").on('click',"a",function(e){
    e.preventDefault();
    var index=$(this).index();
    console.log(pageC);
    if(index==0){//点击的是“上一页”时
      if(pageNum==1) return;
      pageNum--;
    }else if(index==pageC+1){//点击的是“下一页”时
      console.log(index);
      if(pageNum==pageC) return;
      pageNum++;
    }else{
      pageNum=index;
    }
    pList(pageNum,type);
  });

  function pList(pageNum,type){
    $.ajax({
      type:"post",
      url:"data/product_select.php",
      data:{pageNum:pageNum,type:type},
      success:function(d){
        //console.log(d);
        //产品列表
        var data= d.data;
        var n=d.data.length;
        var htmlText='';
        for(var i=0;i<n;i++){
            htmlText+='<li><a href="product_details.html?pid='
                +data[i].pid
                +'"><img src="'
                +data[i].pic
                +'" alt=""/></a><div class="pdlist_text clearfloat"><h3><p>'
                +data[i].model
                +'</p><span>'
                +data[i].title2
                +'</span></h3><a href="product_details.html?pid='
                +data[i].pid
                +'">查看详情</a></div></li>';
        }
        $(".product_list").html(htmlText);
        //页码
        var pageHtml='<a href="">上一页</a>';
        pageC= d.pageCount;
        for(var i=1;i<pageC+1;i++){
          pageHtml+='<a href="">'+i+'</a>';
        }
        pageHtml+='<a href="">下一页</a>';
        $(".pages").html(pageHtml);
        $(".pages a").eq(pageNum).addClass("cur");
        if(pageNum==1){
          $(".pages a:first").addClass("default");
        }
        if(pageNum==pageC){
          $(".pages a:last").addClass("default");
        }
      }
    });
  }




});





