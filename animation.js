const BLUE = "#371efa";
const PINK = "#ce185e";
const GREEN = "#91d119";

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
      background: "#181922",
    },
  });

  // create runner
  var runner = Runner.create();

  // Runner.run(runner, engine);
  // Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 4, dimensions.height / 4) / 2,
    {
      render: {
        fillStyle: `transparent`,
        strokeStyle: `transparent`,
        lineWidth: 0,
      },
      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    }
  );

  World.add(world, attractiveBody);

  // add some bodies that to be attracted
  for (var i = 0; i < 15; i += 1) {
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let s =
      Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
    let poligonNumber = Common.random(3, 6);
    var body = Bodies.polygon(
      x,
      y,
      poligonNumber,
      s,

      {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.03,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: "transparent",
          strokeStyle: `#DDDDDD`,
          lineWidth: 2,
        },
      }
    );

    World.add(world, body);

    let r = Common.random(0, 1);
    var circle = Bodies.circle(x, y, Common.random(20, 40), {
      mass: Common.random(10, 20),
      friction: 0,
      frictionAir: 0.01,
      render: {
        fillStyle: r > 0.3 ? BLUE : GREEN,
        strokeStyle: `transparent`,
        lineWidth: 2,
      },
    });
    World.add(world, circle);

    var circle = Bodies.circle(x, y, Common.random(30, 50), {
      mass: Common.random(10, 20),
      friction: 0,
      frictionAir: 0.2,
      render: {
        fillStyle: r > 0.3 ? PINK : BLUE,
        strokeStyle: `transparent`,
        lineWidth: 4,
      },
    });
    World.add(world, circle);

    var circle = Bodies.circle(x, y, Common.random(20, 60), {
      mass: Common.random(10, 20),
      friction: 0.6,
      frictionAir: 0.8,
      render: {
        fillStyle: `#181922`,
        strokeStyle: `#FFFFFF`,
        lineWidth: 3,
      },
    });
    World.add(world, circle);
  }

  // add mouse control
  var mouse = Mouse.create(render.canvas);

  Events.on(engine, "afterUpdate", function (e) {
    if (!e.clientX) return;
    console.log("here");
    Body.translate(attractiveBody, {
      x: (e.clientX - attractiveBody.position.x) * 0.12,
      y: (e.clientY - attractiveBody.position.y) * 0.12,
    });
  });
  $(".slider").on("mousemove", function (e) {
    Matter.Events.trigger(engine, "afterUpdate", e);
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
