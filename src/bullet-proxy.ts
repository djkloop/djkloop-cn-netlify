window.onload = function () {
  console.log(`bullet-proxy.js loading`);

  class Main {
    constructor() {
      console.log('constructor');
    }
  }


  class Bullet {
    constructor() {
       console.log(`Bullet - constructor`);
    }
  }



  new Main();

}