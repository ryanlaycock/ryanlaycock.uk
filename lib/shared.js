function toggleMenu() {
    if ($("#header").hasClass("responsive")) {
        $("#header").removeClass("responsive")
    } else {
        $("#header").addClass("responsive")
    }
}