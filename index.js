/**
 * 1. 定义队列， 放入技能数据，顺序出来目标技能图片 3：18
 *
 */
//

// 2. 按键 同时出现对应元素图片  最多3个，继续按就移除第一个，先进先出（队列）；
// 3. 按r 判断当前队列是否和当前技能匹配
// 4. 若匹配，元素栏清空，技能队列出列，进列；否则，下方显示当前错误技能

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(item) {
    this.data.push(item);
  }
  dequeue() {
    return this.data.shift();
  }
  getItem(index) {
    return this.data[index];
  }
  length() {
    return this.data.length;
  }
  forEach(callback) {
    this.data.forEach(callback);
  }
  log() {
    console.log(JSON.stringify(this.data));
  }
}

function loadImage(path, callback) {
  const img = new Image();
  img.src = path;
  img.onload = () => {
    callback(img);
  };
}

const assetsImg = {};

function loadAllImage(callback) {
  const assets = [
    {
      key: "ice",
      path: "./assets/skillimg/ice.png",
    },
    {
      key: "fire",
      path: "./assets/skillimg/fire.png",
    },
    {
      key: "thunder",
      path: "./assets/skillimg/thunder.png",
    },
    {
      key: "alacrity",
      path: "./assets/skillimg/alacrity.png",
    },
    {
      key: "chaosmeteor",
      path: "./assets/skillimg/chaosmeteor.png",
    },
    {
      key: "coldsnap",
      path: "./assets/skillimg/coldsnap.png",
    },
    {
      key: "deafening",
      path: "./assets/skillimg/deafening.png",
    },
    {
      key: "emp",
      path: "./assets/skillimg/emp.png",
    },
  ];
  let count = 0;
  let len = assets.length;
  assets.forEach((v) => {
    loadImage(v.path, (img) => {
      count += 1;
      assetsImg[v.key] = img;
      if (count === len) {
        // 说明所有图片都加载完成
        callback();
      }
    });
  });
}
/**
 * 冰火雷元素
 */
class Element {
  constructor(img, x, y, w, h, key) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.key = key;
  }
  draw(canvasContext) {
    canvasContext.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

class MyCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}

const myCanvas = new MyCanvas(document.getElementById("canvas"));

// 初始化三元素 以及事件
function initELe() {
  /**
   * 循环修改队列元素的x值，画队列中的元素
   * @param {*} queue
   */
  function drawElementQueue(queue) {
    queue.forEach((v, i) => {
      v.x = i * 100;
      v.draw(myCanvas.context);
    });
  }

  const ice = new Element(assetsImg.ice, 0, 0, 100, 100, "q");
  const fire = new Element(assetsImg.fire, 100, 0, 100, 100, "w");
  const thunder = new Element(assetsImg.thunder, 200, 0, 100, 100, "e");

  const queue = new Queue();
  queue.enqueue(ice);
  queue.enqueue(fire);
  queue.enqueue(thunder);

  drawElementQueue(queue);

  /**
   * 每个元素按键处理
   */
  function elementHandler(ev, queue, key, ele) {
    if (ev.key === key) {
      if (queue.length() === 3) {
        queue.dequeue();
      }
      queue.enqueue(ele);
      // queue.log();
      // myCanvas.clear();
      drawElementQueue(queue);
    }
  }
  // 绑定按键
  document.addEventListener("keydown", (ev) => {
    elementHandler(ev, queue, "q", ice);
    elementHandler(ev, queue, "w", fire);
    elementHandler(ev, queue, "e", thunder);
  });

  return queue
}

// 初始化技能，最多出现4个
function initSkill() {
  /**
   * 循环修改队列元素的x值，画队列中的元素
   * @param {*} queue
   */
  function drawElementQueue(queue) {
    queue.forEach((v, i) => {
      v.x = i * 100;
      v.draw(myCanvas.context);
    });
  }

  const alacrity = new Element(assetsImg.alacrity, 400, 400, 100, 100, "qqq");
  const chaosmeteor = new Element(
    assetsImg.chaosmeteor,
    300,
    400,
    100,
    100,
    "qwe"
  );
  const coldsnap = new Element(assetsImg.coldsnap, 200, 400, 100, 100, "eee");
  const deafening = new Element(assetsImg.deafening, 100, 400, 100, 100, "www");

  const queue = new Queue();
  queue.enqueue(alacrity);
  queue.enqueue(chaosmeteor);
  queue.enqueue(coldsnap);
  queue.enqueue(deafening);

  drawElementQueue(queue);

  return {queue, drawElementQueue}
}
function main() {
  loadAllImage(() => {
    const eleQeuue = initELe();
    const ski= initSkill();
    const skillQueue = ski.queue
    const skillDrawElementQueue = ski.drawElementQueue
    document.addEventListener("keydown", (ev) => {
      if (ev.key === 'r') {
        // 判断当前队列是否等于第一个技能的key
        const pressKey = []
        eleQeuue.forEach(v => {
          pressKey.push(v.key)
        })
        const pressKeyStr = pressKey.join('')
        console.log(pressKeyStr, pressKey)
        console.log(skillQueue.getItem(0), 'fa')
        if ( pressKeyStr === skillQueue.getItem(0).key) {
          console.log('match')
          skillQueue.dequeue()
          skillDrawElementQueue(skillQueue)
        }
      }
    });
  });
}

main();
