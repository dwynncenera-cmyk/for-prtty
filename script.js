const flowerLayer = document.querySelector("#flowers");

const blooms = [
  { x: 300, y: 190, scale: 0.82 },
  { x: 205, y: 250, scale: 0.64 },
  { x: 395, y: 250, scale: 0.64 }
];

function svgElement(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  return element;
}

blooms.forEach(({ x, y, scale }) => {
  const swayGroup = svgElement("g", { class: "flower-sway" });
  const flower = svgElement("g", {
    transform: `translate(${x} ${y}) scale(${scale})`
  });

  for (let i = 0; i < 6; i++) {
    const rotation = i * 60;

    flower.appendChild(svgElement("path", {
      class: "petal",
      d: "M0 8 C-30 -18 -72 -75 -55 -128 C-43 -166 -18 -160 0 -112 C18 -160 43 -166 55 -128 C72 -75 30 -18 0 8Z",
      transform: `rotate(${rotation})`
    }));

    flower.appendChild(svgElement("path", {
      class: "petal-vein",
      d: "M0 0 C-2 -38 0 -78 0 -119",
      transform: `rotate(${rotation})`
    }));
  }

  const stamenTips = [
    [-28, -48], [-18, -64], [-7, -70],
    [7, -70], [18, -64], [28, -48]
  ];

  stamenTips.forEach(([tipX, tipY]) => {
    flower.appendChild(svgElement("line", {
      class: "stamen",
      x1: 0,
      y1: 5,
      x2: tipX,
      y2: tipY
    }));

    flower.appendChild(svgElement("ellipse", {
      class: "anther",
      cx: tipX,
      cy: tipY,
      rx: 5,
      ry: 3
    }));
  });

  flower.appendChild(svgElement("circle", {
    class: "flower-center",
    cx: 0,
    cy: 5,
    r: 8
  }));

  swayGroup.appendChild(flower);
  flowerLayer.appendChild(swayGroup);
});