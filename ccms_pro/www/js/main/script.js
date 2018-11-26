/**
 * Created by 许东 on 2017/9/27.
 */
$(function(){

    $(".menuFir").click(function () {
        $(this).parent("dl").siblings("dl").children("dd").hide("fast");
         $(this).siblings("dd").slideToggle("fast")  //slideToggle菜单的显示与隐藏

    })
    $(".menuSec").click(function () {
        $(this).siblings("dd").slideToggle("fast")
    })
    $("#hintMenu").click(function () {
        if($(".leftMenu").is(":visible")){//leftMenu是可见的，即是显示的
            $(".leftMenu").hide()
            $(".rightMain").css("left","0")
            $("#hintMenu").text("显示菜单")
        }else{                              //leftMenu是不可见的，即隐藏了
            $(".leftMenu").show()
            $(".rightMain").css("left","200px")
            $("#hintMenu").text("隐藏菜单")
        }
    })
    $(".leftMenu  dl dd ul li").click(function () {
        var _link = $(this).attr("_link")
		$(this).css("color","#00ffff")
        $("#main").attr("src",_link);
        /*$(this).css({"background-color":"#90ed7d"});*/
        $(this).parent("ul").parent("dd").parent("dl").siblings("dl").children("dd").children("ul").
            children("li").css({"color":"#fff"});
       $(this).siblings().css({"color":"#fff"});
        $(this).parent("ul").parent("dd").parent("dl").parent("dd").parent("dl").siblings("dl").
            children("dd").children("dl").children("dd").children("ul").children("li").css({"color":"#fff"});
   	
    })
	/*$(".leftMenu  dl dd dl ul li").click(function(){ 
		$(this).css("color","rgb(0,195,223)")
	})*/
	
	/*$(".leftMenu  dl dd dl ul li").click( function(){
       $(this).css("color","rgb(0,195,223)").siblings().css("color","rgb(255,255,255)"); 
    });*/
 
})

