function ensure(condition, msg) {
  if (!condition) {
    console.error(msg);
  }
}

function testQueue() {
  const q = new Queue();
  q.enqueue("1");
  ensure(q.getItem(0) === "1", "fail queue");
}

function testQueue1() {
  const q = new Queue();
  q.enqueue("1");
  q.enqueue("2");
  q.enqueue("1");
  q.enqueue("2");

  const res = q.dequeue();
  const len = q.length();
  ensure(res === "1", "fail queue1");
  ensure(len === 3, "fail queue1");
}

function testElement() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const a = (img) => {
    const ele = new Element(img, 0, 0, 200, 200, "q");
    ele.draw(context);
  };

  loadImage("./assets/skillimg/ice.png", a);
}

function testLoadAllImage() {
  loadAllImage(() => {
    console.log("加载完成");
    console.log(assetsImg)
  });
}

function mainTest() {
  testQueue();
  testQueue1();
  // testElement();
  testLoadAllImage();

}

mainTest();
