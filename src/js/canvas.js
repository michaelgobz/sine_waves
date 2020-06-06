import {gui} from 'dat.gui';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth * 2;
canvas.height = innerHeight * 2;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () =>  {
  canvas.width = innerWidth
  canvas.height = innerHeight
// we draw out wave
wave();
})


// Implementation
const gui_Dat = new gui.GUI();
const waveProperties ={
  y:canvas.height /2,
  waveLength: 0.01,
  amplitude : 100,
  frequency  : 0.01
}
const color ={
  h:200,
  s:50,
  l:50
}
const background ={
  r:100,
  g:100,
  b:100,
  a:0.01
}
const waveFolder = gui_Dat.addFolder('waveProperties');
waveFolder.add(waveProperties,'y',0, canvas.height);
waveFolder.add(waveProperties,'waveLength',-0.01 ,0.01);
waveFolder.add(waveProperties,'amplitude',-300 , 900);
waveFolder.add(waveProperties ,'frequency', -0.01 , 3)
waveFolder.open();

const colorFolder =  gui_Dat.addFolder ('color');
colorFolder.add(color ,'h' , 0 ,Math.random() * 255 );
colorFolder.add(color,'s',0,Math.random() * 100);
colorFolder.add(color, 'l',0,Math.random() * 100);
colorFolder.open();

const backgroundFolder  = gui_Dat.addFolder('background');
backgroundFolder.add(background,'r',0,255);
backgroundFolder.add(background,'g',0,255);
backgroundFolder.add(background,'b',0,255);
backgroundFolder.add(background,'a',0,0.9);
// we begin to work with  the  sine waves
// lets get  started
console.log(gui_Dat);
let increme = waveProperties.frequency;
function wave(){
 c.beginPath();
 c.moveTo(0 ,canvas.height /  2);
 for (let i = 0; i < canvas.width; i++){
  c.lineTo(i ,
     waveProperties.y  +
     ((Math.sin(i * waveProperties.waveLength + increme)*
     waveProperties.amplitude)  / i ) * 159);
}
c.strokeStyle = `hsl(${color.h} ,${color.s}%,${color.l}%)`;
c.stroke();
increme += waveProperties.frequency;
}

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(0,0,0,0.01)`;
  c.fillRect(0,0,canvas.width ,canvas.height);
  wave();
}
//init()
animate()
