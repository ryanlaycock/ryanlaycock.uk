// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};
let hasScrolled = false;
const headerHeight = "70"; // px

function scrollFunction() {
    if ($("#header").height() > headerHeight) {
        // Still shrinking, keep window scrolled to top
        window.scrollTo(0, 0);
    }
    
    if (!hasScrolled) {
        event.preventDefault();
        $("#bottom").css({
            display: "none",
        });

        if ($(window).width() > 1000) {
            $("#left").animate(
            {
                left: "0px",
                marginLeft: "40px",
            }, {
                duration: 700,
                complete: function(){
                    $("#header-title").css({
                        float: "left",
                    })
                    $("#left a").css({
                        pointerEvents: "auto",
                    })
                    $("#links").css({
                        display: "flex",
                    })
                }
            });

            $("#social").animate(
            {
                display: "block",
                fontSize: "35px",
                height: "fit-content",
                marginRight: "0px",
            }, {
                duration: 700,
            });

            $("#right").animate(
            {
                top: "25%",
                width: "250px",
                maxWidth: "fit-content",
                right: "0px",
                marginRight: "40px",
            }, {
                duration: 700,
            });
        } else {
            $("#left").animate(
            {
                left: "0px",
                marginLeft: "0px",
            }, {
                duration: 700,
                complete: function(){
                    $("#header-title").css({
                        float: "left",
                    })
                    $("#left a").css({
                        pointerEvents: "auto",
                    })
                    $("#menu-toggle").css({
                        display: "block",
                    });
                }
            });

            $("#social").css({
                display: "none",
                position: "fixed",
                bottom: "20px",
                right: "0px",
                width: "100%",
                fontSize: "35px",
            });

            $(".menu-header-link-div").css({
                textAlign: "center",
                fontSize: "40px",
                marginTop: "20px",
            });

        }

        $("#links").css({
            display: "none",
        })

        $("#left").css({
            width: "100%",
            top: "18px",
        })

        $("#header-title").animate(
        {
            fontSize: "35px",
            height: "fit-content",
            marginLeft: "20px",
            marginRight: "0px",
        }, {
            duration: 700,
        });

        $(".shrinkable").animate(
        {
            height: headerHeight
        }, {
            duration: 700,
        });
        hasScrolled = true;
    }
}

$(document).ready(function(){
    $('#header-title').typeIt({
        strings: 'ryan laycock',
        speed: 150
    });
});
