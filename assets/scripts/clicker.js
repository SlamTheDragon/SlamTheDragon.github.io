// loop thing

timeout()

function timeout() {
    setTimeout(function() {
        document.getElementById("clicker").click();
        timeout();
    }, 5000);
}