$(function(){
    navBarOption.init();
    carousel.init();
    footer.init();
    fullpage.init();
});


//导航条内容加载
var navBarOption={
    bianLiang:{"navContent":["首页","关于我们","新闻动态","产品中心","成功案例","招纳贤士","服务项目","联系我们"]},
    contentReload:function(){
        var li=null;
        for(var i=0;i<this.bianLiang.navContent.length;i++){
            li=$("<li class='navItem'></li>");
            if(i==3){
                var span=$("<span class='dropHover' style='display: block;top: 52px'></span>");
                li.addClass("liHover");
                li.html(this.bianLiang.navContent[i]);
                li.append(span);

            }else{
                li.html(this.bianLiang.navContent[i]);
            }

            $(".nav_header .menu").append(li);
        }
    },
    menuToggleClick:function(){
        var flag=true;
        $(".nav_header .menu_toggle").click(function(){
            var li=null;
            var width=$(window).width();
            var height=$(window).height();
            var menuToggle=$("<ul class='menu_toggle_dropDown_con'></ul> ");
            for(var i=0;i<navBarOption.bianLiang.navContent.length;i++){
                li=$("<li class='navItemToggle'></li>");
                li.html(navBarOption.bianLiang.navContent[i]);
                menuToggle.append(li);
            }
            $("header .nav_header").append(menuToggle);
            if(width>399){
                if(flag){
                    $(".menu_toggle_dropDown_con").css({"height":height+"px"});
                    $("body").animate({"right":"200px"},600);
                    menuToggle.show();
                    flag=false;
                }else{
                    $("body").animate({"right":"0px"},600,function(){$("header .nav_header .menu_toggle_dropDown_con").remove();});
                    flag=true;
                }
            }else{
                if(flag){
                    $(".menu_toggle_dropDown_con").css({"right":-width+"px","height":height-67+"px"}).animate({"right":0},600);
                    menuToggle.show();
                    flag=false;
                }else{
                    $(".menu_toggle_dropDown_con").animate({"right":-width+"px"},600,function(){$("header .nav_header .menu_toggle_dropDown_con").remove();});
                    flag=true;
                }
            }

        });
    },
    screenChange:function(){
        $(window).resize(function(){
            var width=$(window).width();
            if(width>399){
                $(".menu_toggle_dropDown_con").css({"right":-"200px"});
            }
        });
    },
    menuHover:function(){
        $("header .nav_header ul.menu li").mouseover(function(){
            $(this).siblings(".liHover").removeClass();
            $(".dropHover").remove();
            $(this).addClass("liHover");
            var dropHover=$("<span class='dropHover'></span>");
            $(this).append(dropHover);
            dropHover.fadeIn(function(){$(this).animate({"top":"52px"})});

        });
    },
    init:function(){
        this.contentReload();
        this.menuToggleClick();
        this.menuHover();
        //this.screenChange();
    }
};

var carousel= {
    bianliang: {"src": ["assets/images/lunboImg/img1.jpg", "assets/images/lunboImg/img2.jpg", "assets/images/lunboImg/img3.jpg", "assets/images/lunboImg/img4.jpg", "assets/images/lunboImg/img5.jpg"]},
    carouselOption:function(){
        var ul=$("<ul class='rslides'></ul>");
        for(var i=0;i<this.bianliang.src.length;i++){
            var li=$("<li></li>");
            var img=$("<img src='"+this.bianliang.src[i]+"'' alt=''>");
            li.append(img);
            ul.append(li);
        }
        $(".responsiveImgPlay").append(ul);
    },
    init: function () {
        this.carouselOption();
    }
};


var footer={
    bianliang:{"产品中心":["预设填充","预设填充","预设填充","预设填充","预设填充","预设填充","预设填充","预设填充","预设填充"],"企业简介":["董事长致辞","组织结构","品质保障","公司简介","资质荣誉"],"成功案例":["成功案例"],"服务项目":["服务项目","AO登陆"],"招纳贤士":["社会招聘","校园招聘"]},
    address:["武汉盛帆电子股份有限公司版权所有 鄂ICP备06778号","中国·武汉市江夏区经济开发区阳光大道9号"],
    tel:"15255646666",
    footerOption:function(){
        for(o in this.bianliang){
            var item_tit=$("<div class='item_tit'></div>");
            var item_add=$("<div class='item_add' style='position:absolute;right:0;top:0;display: none'>＋</div>");
            item_tit.html(o);
            for(var i=0;i<footer.bianliang[o].length;i++){
                var item=$("<div class='item'></div>");
                item.html(footer.bianliang[o][i]);
                item_tit.append(item);
                item_tit.append(item_add);
            }
            $("footer .introduce").append(item_tit);
        }
        var address=$("<div class='address'></div>");
        for(var j=0;j<this.address.length;j++){
            var addressItem=$("<div class='addressItem'></div>");
            addressItem.html(this.address[j]);
            address.append(addressItem);
        }
        $("footer .bottom .left").append(address);
        $("footer .bottom .right .tel").html(this.tel);
    },
    addClick:function(){
        $("footer .item_add").each(function(x){
            $(this).click(function(){
               $(this).siblings(".item").slideToggle();
            });
        });
    },
    init:function(){
        this.footerOption();
        this.addClick();
    }
};

var fullpage={
    cssRemake:function(){
        $(".aboutUs .header").css({"top":"-57px"});
        $(".aboutUs .introduce").hide();
        $(".aboutUs .introduce_idea li").eq(0).css({"left":-$(window).width()/2});
        $(".aboutUs .introduce_idea li").eq(2).css({"left":$(window).width()/2});
        $(".aboutUs .introduce_idea li").eq(1).css({"top":200});
        $("html").attr("style","none");
    },
    reload:function(){
            autoScrolling();
            $(window).resize(function(){
                autoScrolling();
            });
            $('#fullpage').fullpage({
                scrollingSpeed:1000,
                'verticalCentered': false,
                'css3': false,
                anchors: ['page1', 'page2','page3'],
                'navigation': false,
                'navigationPosition': 'right',
                afterLoad: function(anchorLink, index){
                    if(index==1){
                        $("article .header").animate({"left":0},1000);
                        $("article .content").animate({"left":0},1000);
                    }
                    if(index==2){
                        $(".aboutUs .header").animate({"top":0},1000);
                        $(".aboutUs .introduce").fadeIn(1000);
                        $(".aboutUs .introduce_idea li").eq(0).animate({"left":0},1000);
                        $(".aboutUs .introduce_idea li").eq(2).animate({"left":0},1000);
                        $(".aboutUs .introduce_idea li").eq(1).animate({"top":0},1000);
                    }
                },
                onLeave:function(index ,nextIndex,direction){
                    if(nextIndex==2 ){
                        $("article .header").animate({"left":$(window).width()},1000);
                        $("article .content").animate({"left":-$(window).width()},1000);
                    }
                    if(nextIndex==1){
                        $(".aboutUs .header").animate({"top":"-57px"},1000);
                        $(".aboutUs .introduce").fadeOut(1000);
                        $(".aboutUs .introduce_idea li").eq(0).animate({"left":-$(window).width()/2},1000);
                        $(".aboutUs .introduce_idea li").eq(2).animate({"left":$(window).width()/2},1000);
                        $(".aboutUs .introduce_idea li").eq(1).animate({"top":200},1000);
                    }
                }
            });
            function autoScrolling(){
                var $ww = $(window).width();
                if($ww < 993){
                    //$('#fullpage').fullpage({"onLeave":function(){return false},"afterLoad":function(){return false}});
                    $.fn.fullpage.destroy('all');
                }
            }

    },
    init:function() {
        fullpage.cssRemake();
        if($(window).width()>993){
            fullpage.reload()
        }else{
            $(".aboutUs .header").css({"top":0});
            $(".aboutUs .introduce").show();
            $(".aboutUs .introduce_idea li").eq(0).css({"left":0});
            $(".aboutUs .introduce_idea li").eq(2).css({"left":0});
            $(".aboutUs .introduce_idea li").eq(1).css({"top":0});
        }
        $(window).resize(function(){
            if($(this).width()>993){
                //fullpage.cssRemake();
                fullpage.reload();
            }else{
                $(".aboutUs .header").css({"top":0});
                $(".aboutUs .introduce").show();
                $(".aboutUs .introduce_idea li").eq(0).css({"left":0});
                $(".aboutUs .introduce_idea li").eq(2).css({"left":0});
                $(".aboutUs .introduce_idea li").eq(1).css({"top":0});
                $(".fullpage").remove();
                location.reload();
            }
        });
    }
};

