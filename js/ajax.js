var loading=1;
function main_base(filename){
    if(loading){
        loading = 0;
        if(filename == "home"){
            document.body.style.background="";
            document.getElementById("ajax_body").style.height="0px";
            ajax_body("0s","inherit","15vh","");
            history.pushState(null, filename, "/");
            loading = 1;
        }else{
            filename = filename.replace("..","");
            filename = filename.replace("./","");
            filename = filename.replace("../","");
            $.ajax({
                url:'./ajax/'+filename+".html",
                beforeSend:function(){
                    document.getElementById('main_body').style.width = "15vh";
                    document.getElementById("ajax_body").style.height="";
                    document.getElementById("ajax_body").innerHTML="";
                    $(".loading").attr('id','loading');
                    $("#main_body").css("z-index",10);
                    $('#ajax_body').hide();
                    $('.loading').fadeIn(800);
                },
                success:function(text){           
                    //document.getElementById("loading").style="animation: scale-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;";   
                    setTimeout(function(){
                        document.body.style.background="rgb(29, 29, 29)"
                        $('#loading').fadeOut(600,function(){
                            $("#main_body").css("z-index",5);
                        });
                        $('#ajax_body').fadeIn(400);
                        ajax_body("0s","hidden","100%",text);
                        loading = 1;
                    },1300);
                }
            })
            history.pushState(null, filename, filename);
        }
    }else{
        return ;
    }
}
function ajax_body(sec,status,size,body){
    document.getElementById("git_button").style.transition = "all "+sec+" ease 0s";
    document.getElementById("blog_button").style.transition = "all "+sec+" ease 0s";
    document.getElementById('mainpage_design').style.visibility = status;
    document.querySelector('#ajax_body').innerHTML = body; 
    document.getElementById('main_body').style.width = size;
}