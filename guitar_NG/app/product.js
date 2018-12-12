$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("产品中心");
    });
    $(".footer").load("footer.html");

    var type=1;//产品类型
    var pageNum=1;//当前页码
    var pageC=0;//总页数

    //获取type
    var str=window.location.href;
    if(str.lastIndexOf("=")==-1){
        type=1;
    }else{
        type=str.substr(str.lastIndexOf("=")+1);
        //pList(type,pageNum);
    }
    proType(type);

    //切换类型函数
    function proType(type){
        pageNum=1;
        $(".pl_header a").removeClass();
        $(".pl_header a").eq(type-1).addClass("cur");
        pList(type,pageNum);
    }
    $(".pl_header a").click(function(e){
        e.preventDefault();
        //$(".pl_header a").removeClass();
        //$(this).addClass("cur");
        type=$(this).attr("href");
        proType(type);
        //pList(type,pageNum);

    });
    //页码点击事件
    $(".pages").on('click','a',function(e){
        e.preventDefault();//清除a标记的默认行为
        var pageN=$(this).index();
        //console.log(pageN);
        if(pageN==0){//当点击的是“上一页”的时候
            if(pageNum==1) return;
            pageNum--;
        }else if(pageN==pageC+1){//当点击的是下一页”的时候
            if(pageNum==pageC) return;
            pageNum++;
        }else{
            pageNum=pageN;
        }
        //console.log(pageCur)
        pList(type,pageNum);
    });
    function pList(type,pageNum){
        $.ajax({
            type:"post",
            url:"data/product_select.php",
            data:{type:type,pageNum:pageNum},
            success:function(d){
                //console.log(d);
                var data= d.data;
                var n= d.data.length;
                var liHtml="";
                //产品列表
                for(var i=0;i<n;i++){
                    liHtml+='<li><a href="product_details.html?pid='
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
                $(".product_list").html(liHtml);

                //页码
                var pageHtml='<a href="prev">上一页</a>';
                pageC=d.pageCount;
                for(var i=1;i<pageC+1;i++){
                    pageHtml+='<a href="'+i+'">'+i+'</a>';
                }
                pageHtml+='<a href="next">下一页</a>';
                $(".pages").html(pageHtml);
                if(pageNum==1){
                    $(".pages a:first").addClass("default");
                }
                if(pageNum==pageC){
                    $(".pages a:last").addClass("default");
                }
                $(".pages a").eq(pageNum).addClass("cur");
            }
        });
    }
})
