const BLUE = `#371efa`;
const PINK = `#ce185e`;
const GREEN = `#91d119`;
const WHITE = `#afafaf`;
const BLACK = `#181922`;
const NONE = `transparent`;
const colorsAll = [BLUE, PINK, GREEN, WHITE, BLACK];
const colorsNoWhite = [BLUE, PINK, BLACK, BLACK];
const colorsNoBlack = [BLUE, PINK, GREEN, WHITE];

var canvas = $("#wrapper-canvas").get(0);

var dimensions = {
  width: $(window).width(),
  height: $(window).height(),
};

Matter.use("matter-attractors");
Matter.use("matter-wrap");

function runMatter() {
  // module aliases
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies;

  Common._seed = new Date().valueOf();

  // create engine
  var engine = Engine.create();

  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  // create renderer
  var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      showVelocity: false,
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: BLACK,
    },
  });

  // create runner
  var runner = Runner.create();

  // Runner.run(runner, engine);
  // Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  let fillColor = Common.choose(colorsNoWhite);
  let strokeColor = fillColor === BLACK ? Common.choose(colorsNoBlack) : NONE;
  // create a body with an attractor
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    400,
    {
      render: {
        fillStyle: fillColor,
        strokeStyle: strokeColor,
        lineWidth: 3,
      },
      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            var force = {
              x: (bodyA.position.x - bodyB.position.x) * 1e-7,
              y: (bodyA.position.y - bodyB.position.y) * 1e-7,
            };

            // apply force to both bodies
            Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
            Body.applyForce(bodyB, bodyB.position, force);
          },
        ],
      },
    }
  );
  World.add(world, attractiveBody);

  // add some bodies that to be attracted
  for (var i = 0; i < 10; i += 1) {
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let s =
      Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
    let r = Common.random(300, 700);
    let fillColor = Common.choose(colorsNoWhite);
    let strokeColor = fillColor === BLACK ? Common.choose(colorsNoBlack) : NONE;
    var circle = Bodies.circle(x, y, r, {
      mass: Common.random(5, 21),
      friction: 0,
      frictionAir: 0,
      render: {
        fillStyle: fillColor,
        strokeStyle: strokeColor,
        lineWidth: 3,
      },
    });
    World.add(world, circle);
  }

  // add mouse control
  var mouse = Mouse.create(document.getElementById("slider"));

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) return;

    var distX = mouse.position.x - attractiveBody.position.x;
    var distY = mouse.position.y - attractiveBody.position.y;
    Body.translate(attractiveBody, {
      x: distX * 0.12,
      y: distY * 0.12,
    });
  });

  // return a context for MatterDemo to control
  let data = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    play: function () {
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    },
  };
  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);
  return data;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setWindowSize() {
  let dimensions = {};
  dimensions.width = $(window).width();
  dimensions.height = $(window).height();

  m.render.canvas.width = $(window).width();
  m.render.canvas.height = $(window).height();
  return dimensions;
}

let m = runMatter();
setWindowSize();
$(window).resize(debounce(setWindowSize, 250));
