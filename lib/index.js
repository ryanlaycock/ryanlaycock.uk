// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};
let hasScrolled = false;
const headerHeight = "70"; // px

function scrollFunction() {
    if ($("#header").height() > headerHeight) {
        // Still shrinking, keep window scrolled to top
        window.scrollTo(0, 0);
    }

    // Anything to do once
    if (!hasScrolled) {
        event.preventDefault();
        // Set header details
//        let header = document.getElementById("header");
//        header.style.fontSize = "18px";
//
//        // Shrink header and content padding
//        let shrinkables = document.getElementsByClassName("shrinkable");
//        const toShrink = Array.prototype.filter.call(
//            shrinkables,
//            (shrinkable) => shrinkable.style.height = headerHeight
//        );

        $("#title-div").animate(
        {
            marginLeft: "0px",
            marginRight: "0px",
            paddingLeft: "15px",
            top: "0px",
        }, {
            duration: 700,
            complete: function(){
                $("#title-div").css({
                    "display": "inline-block",
                    "float": "left",
                });
                $("#right"). css("display", "inline-block");
            },
        });

        $(".shrinkable").animate(
        {
            height: headerHeight
        }, {
            duration: 700,
        });

        $("#title").animate(
        {
            fontSize: "40px",
            height: "fit-content",
        }, {
            duration: 700,
        });

        hasScrolled = true;
    }
}

$(document).ready(function(){
    $('#title').typeIt({
        strings: 'ryan laycock',
        speed: 150
    });
});