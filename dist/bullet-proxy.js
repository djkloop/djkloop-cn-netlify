window.onload = function () {
    console.log("bullet-proxy.js loading");
    var Main = /** @class */ (function () {
        function Main() {
            console.log('constructor');
        }
        return Main;
    }());
    var Bullet = /** @class */ (function () {
        function Bullet() {
            console.log("Bullet - constructor");
        }
        return Bullet;
    }());
    new Main();
};
