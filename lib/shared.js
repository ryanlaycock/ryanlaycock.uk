function toggleMenu() {
    if ($("#header").hasClass("responsive")) {
        $("#header").removeClass("responsive")

        $("#social").css({
            display: "none",
        });

        $("#header").css({
            height: "70px",
        });

        $("#links").css({
            display: "none",
            flexDirection: "row",
            width: "fit-content",
        });

        $("#links.a").css({
            width: "fit-content",
        });

        $("#header-link-div").css({
            display: "none",
        });
    } else {
        $("#header").addClass("responsive")

        $("#social").css({
            display: "block",
        });

        $("#header").css({
            height: "100%",
        });

        $("#links").css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        });

        $("#links.a").css({
            width: "100%",
        });

        $("#header-link-div").css({
            width: "fitContent",
            margin: "auto",
        });
        
        $(".menu-header-link-div").css({
            textAlign: "center",
            fontSize: "40px",
            marginTop: "20px",
        });
    }
}

let lastWidth = 0;

$(document).ready(function(){
    waitForElm('.menu-header-link-div').then((elm) => {
        waitForElm('#social').then((elm) => {
            lastWidth = $(window).width();
            if ($(window).width() <= 1000) {
                setMobile();
                return
            }
            setNotMobile();
        });
    });
});

$(window).resize(function() {
    updateForMobile()
    lastWidth = $(window).width();
});

function updateForMobile() {
    if (lastWidth <= 1000 && $(window).width() > 1000) {
        // Gone from mobile to NOT mobile
        setNotMobile();
    } else if (lastWidth > 1000 && $(window).width() <= 1000) {
        // Gone from NOT mobile to mobile
        setMobile();
    }
}

function setMobile() {
    console.log("setMobile");
    // Don't update anything if landingPage still open
    // that's handled by landing.css and scrollFunction() in index.js
    if ($("#header").height() > 70) { return; }

    $("#menu-toggle").css({
        display: "block",
    });

    $("#links").css({
        display: "none",
        float: "none",
        textAlign: "left",
    });

    $("#social").css({
        display: "none",
        margin: "auto",
        bottom: "20px",
        position: "fixed",
        right: "0px",
        width: "100%",
    });

    $("#right").css({
        top: "unset",
        width: "100%",
        marginRight: "0px",
    });

    $("#left").css({
        marginLeft: "0px",
    });

    $("#title-div").css({
        marginLeft: "20px",
    });

    $(".header-link-div").css({
        paddingLeft: "0px",
    });

    $(".menu-header-link-div").css({
        textAlign: "center",
        fontSize: "40px",
        marginTop: "20px",
    });
}

function setNotMobile() {
    console.log("setNotMobile");
    // Don't update anything if landingPage still open
    // that's handled by landing.css and scrollFunction() in index.js
    if ($("#header").height() > 70) { return; }

    $("#menu-toggle").css({
        display: "none",
    });

    $("#links").css({
        display: "flex",
        float: "left",
    });

    $("#social").css({
        display: "block",
        margin: "auto",
        bottom: "unset",
        position: "unset"
    });

    $("#right").css({
        top: "18px",
        maxWidth: "fit-content",
        width: "250px",
        marginRight: "40px",
    });

    $("#left").css({
        marginLeft: "40px",
    });

    $(".header-link-div").css({
        paddingLeft: "0px",
    });

    $(".menu-header-link-div").css({
        textAlign: "unset",
        fontSize: "unset",
        marginTop: "unset",
    });
}

