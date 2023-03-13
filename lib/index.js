// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};
let hasScrolled = false;
const headerHeight = "70"; // px

function scrollFunction() {
    if ($("#header").height() > headerHeight) {
        // Still shrinking, keep window scrolled to top
        window.scrollTo(0, 0);
    }
    
    let isWindowSmall = $(window).width() <= 1000;

    // Anything to do once
    if (!hasScrolled) {
        event.preventDefault();

        $("#bottom").css({
            display: "none",
        });

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
                if (!isWindowSmall) {
                    $("#links").css({
                        display: "flex",
                    })    
                }
                if (isWindowSmall) {
                    $('#menu-toggle').css({
                        display: "block",
                    });
                }
            }
        });

        $(".shrinkable").animate(
        {
            height: headerHeight
        }, {
            duration: 700,
        });

        $("#header-title").animate(
        {
            fontSize: "35px",
            height: "fit-content",
            marginLeft: "0px",
            marginRight: "0px",
        }, {
            duration: 700,
        });

        $("#social").animate(
        {
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

        hasScrolled = true;
    }
}

$(document).ready(function(){
    $('#header-title').typeIt({
        strings: 'ryan laycock',
        speed: 150
    });
});

// Logic needed on landing screen only to override CSS style conditions
// when landing screen is active
$(window).resize(function() {
    if (!hasScrolled) { return; } // Never show if we haven't scrolled yet
    if ($(window).width() > 1000) {
        $('#menu-toggle').css({
            display: "none",
        });
    } else {
        $('#menu-toggle').css({
            display: "block",
        });
    }
});