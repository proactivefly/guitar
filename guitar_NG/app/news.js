$(function(){
    $(".header_box").load("header.html",function(){
        main();
        navText("公司动态");
    });
    $(".footer").load("footer.html");

    var pageCur=1;//当前页码
    var pageC=0;//总页数
    newList(pageCur);
    //页码点击事件
    $(".pages").on('click','a',function(e){
        e.preventDefault();//清除a标记的默认行为
        var pageN=$(this).index();
        //console.log(pageN);
        if(pageN==0){//当点击的是“上一页”的时候
            if(pageCur==1) return;
            pageCur--;
        }else if(pageN==pageC+1){//当点击的是下一页”的时候
            if(pageCur==pageC) return;
            pageCur++;
        }else{
            pageCur=pageN;
        }
        //console.log(pageCur)
        newList(pageCur);
    });
    function newList(pageCur){
        $.ajax({
            type:"post",
            url:"data/news_select.php",
            data:{pageNum:pageCur},
            success:function(d){
                //console.log(d);
                //动态添加新闻列表
                var data= d.data;
                var n= data.length;
                //console.log(n);
                var htmlText="";
                for(var i=0;i<n;i++){
                    var t=dateFormat(parseInt(data[i].pubTime));
                    htmlText+='<li><span>'+t+'</span><a href="news_details.html?nid='+data[i].nid+'">'+data[i].title+'</a></li>';
                }
                $(".news>ul").html(htmlText);

                //动态添加页码
                var pageHtml='<a href="prev">上一页</a>';
                pageC=d.pageCount;
                for(var i=1;i<pageC+1;i++){
                    pageHtml+='<a href="'+i+'">'+i+'</a>';
                }
                pageHtml+='<a href="next">下一页</a>';
                $(".pages").html(pageHtml);
                if(pageCur==1){
                    $(".pages a:first").addClass("default");
                }
                if(pageCur==pageC){
                    $(".pages a:last").addClass("default");
                }
                $(".pages a").eq(pageCur).addClass("cur");
            }

        });
    }


});