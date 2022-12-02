//

timeout()

function timeout() {
    setTimeout
    (
        function () {
            check();
            timeout();
        }, 
        1300
    );
}