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

        $("#bottom").css({
            display: "none",
        });

        $("#left").animate(
        {
            left: "0px",
            width: "900px",
        }, {
            duration: 700,
            complete: function(){
                $("#title").css({
                    float: "left",
                    width: "260px",
                })
                $("#links").css({
                    float: "left",
                    display: "inline-block",
                })
            }
        });

        $(".shrinkable").animate(
        {
            height: headerHeight
        }, {
            duration: 700,
        });

        $("#title").animate(
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
            width: "fit-content",
            right: "0px",
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