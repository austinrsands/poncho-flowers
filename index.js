const resolution = 1024;
const interval = 1000;
const stemThickness = 6;
const stemColor = 'green';
const bouqetX = resolution / 2;
const bouqetY = resolution / 1.5;
const bouqetHeight = 200;
const bouqetRadiusHorizontal = 200;
const bouqetRadiusVertical = 150;
const flowerCount = 60;
const upperVaseRadius = 50;
const lowerVaseRadius = 100;
const vaseColor = '#ed6f66';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = resolution;
canvas.height = resolution;

const flowers = {
  'daisy': {
    petalCount: 15,
    petalRadiusHorizontal: 8,
    petalRadiusVertical: 25,
    petalColor: '#f0f5ed',
    seedRadius: 15,
    seedColor: '#c1ff4f',
  },
  'dames rocket': {
    petalCount: 4,
    petalRadiusHorizontal: 8,
    petalRadiusVertical: 12,
    petalColor: '#C075D2',
    seedRadius: 5,
    seedColor: '#c1ff4f',
  },
  'marigold': {
    petalCount: 10,
    petalRadiusHorizontal: 15,
    petalRadiusVertical: 18,
    petalColor: '#F77C1C',
    seedRadius: 8,
    seedColor: '#98410B',
  },
  'blue': {
    petalCount: 5,
    petalRadiusHorizontal: 10,
    petalRadiusVertical: 12,
    petalColor: '#93B6E8',
    seedRadius: 5,
    seedColor: '#F3E049',
  },
  'godetia': {
    petalCount: 6,
    petalRadiusHorizontal: 16,
    petalRadiusVertical: 18,
    petalColor: '#F984C1',
    seedRadius: 10,
    seedColor: '#F1131A',
  }
};

drawFlower = (x, y, flower) => {
  const { petalCount, petalRadiusHorizontal, petalRadiusVertical, petalColor, seedRadius, seedColor } = flower;
  context.save();
  context.fillStyle = petalColor;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const xOffset = Math.cos(angle) * petalRadiusVertical;
    const yOffset = Math.sin(angle) * petalRadiusVertical;
    context.beginPath();
    context.ellipse(x + xOffset, y + yOffset, petalRadiusVertical, petalRadiusHorizontal, angle, 0, Math.PI * 2);
    context.fill();
  }
  context.beginPath();
  context.fillStyle = seedColor;
  context.ellipse(x, y, seedRadius, seedRadius, 0, 0, Math.PI * 2);
  context.fill();
  context.restore();
};

const drawStem = (startX, startY, endX, endY) => {
  context.save();
  context.lineCap = 'round';
  context.lineWidth = stemThickness;
  context.strokeStyle = stemColor;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
  context.restore();
};

const drawVase = (rootX, rootY) => {
  context.save();
  context.fillStyle = vaseColor;
  context.beginPath();
  context.ellipse(rootX, rootY, upperVaseRadius, upperVaseRadius, 0, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.ellipse(rootX, rootY + lowerVaseRadius, lowerVaseRadius, lowerVaseRadius, 0, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

const drawBouquet = (x, y, height, radiusHorizontal, radiusVertical, flowerCount) => {
  const points = [];
  for (let i = 0; i < flowerCount; i++) {
    const rho = Math.random();
    const phi = Math.random() * Math.PI * 2;
    const xOffset = Math.sqrt(rho) * Math.cos(phi) * radiusHorizontal;
    const yOffset = Math.sqrt(rho) * Math.sin(phi) * radiusVertical;
    const flowerX = x + xOffset;
    const flowerY = y - height + yOffset;
    drawStem(x, y, flowerX, flowerY);
    points.push([flowerX, flowerY]);
  }

  drawVase(x, y);
  
  for (const point of points) {
    const [flowerX, flowerY] = point;
    const flower = getRandomFlower();
    drawFlower(flowerX, flowerY, flower);
  }
};

const getRandomFlower = () => {
  const keys = Object.keys(flowers);
  return flowers[keys[(keys.length * Math.random()) << 0]];
};

const clear = () => context.clearRect(0, 0, resolution, resolution);

const update = () => {
  clear();
  drawBouquet(bouqetX, bouqetY, bouqetHeight, bouqetRadiusHorizontal, bouqetRadiusVertical, flowerCount);
};

update();
setInterval(update, 1000);
