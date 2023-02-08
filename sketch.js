const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var solo;
var fruta, corda;
var conexao_fruta_corda;
var botao;

var cenarioIMG, frutaIMG, coelhoIMG, coelho;

var piscar, triste, comer;

var botaoVentilador;

function preload() {

    cenarioIMG = loadImage("background.png");
    frutaIMG = loadImage("melon.png");
    coelhoIMG = loadImage("Rabbit-01.png");

    piscar = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
    triste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
    comer = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
    piscar.playing = true;
    triste.playing = true;
    triste.looping = false;
    comer.playing = true;
    comer.looping = false;



}


function setup() {
    createCanvas(500, 700);
    frameRate(80);


    botao = createImg("cut_btn.png");
    botao.position(245, 25);
    botao.size(50, 50);
    botao.mouseClicked(soltar);

    

    engine = Engine.create();
    world = engine.world;
    solo = new Ground(200, 690, 600, 20);

    corda = new Rope(7, { x: 245, y: 30 });
    fruta = Bodies.circle(300, 300, 20);
    Matter.Composite.add(corda.body, fruta);

    conexao_fruta_corda = new Link(corda, fruta);

    piscar.frameDelay = 20;
    comer.frameDelay = 20;
    triste.frameDelay = 20;
    coelho = createSprite(245, 650, 50, 50);
    coelho.addImage(coelhoIMG);
    coelho.addAnimation("chorando", triste);
    coelho.addAnimation("piscando", piscar);
    coelho.addAnimation("comendo", comer);

    coelho.scale = 0.15

    coelho.changeAnimation("piscando");
    rectMode(CENTER);
    ellipseMode(RADIUS);

    textSize(50)


}

function draw() {
    image(cenarioIMG, 0, 0, width, height);
    corda.show();
    imageMode(CENTER);
    coelho.x = mouseX;
    Engine.update(engine);
    solo.show();

    if (fruta !== null) {
        image(frutaIMG, fruta.position.x, fruta.position.y, 60, 60);
    }

    if (collide(fruta, coelho) == true) {
        coelho.changeAnimation("comendo");
    }

    if (collide(fruta, solo.body) == true) {
        coelho.changeAnimation("chorando");

    }

    drawSprites();

}

function soltar() {
    corda.break();
    conexao_fruta_corda.detach();
    conexao_fruta_corda = null;



}

function collide(body, sprite) {

    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (d <= 80) {
            World.remove(engine.world, fruta);
            fruta = null;
            return true;
        } else {
            return false;
        }
    }
}