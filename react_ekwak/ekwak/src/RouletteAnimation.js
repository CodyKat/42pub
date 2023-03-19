import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';

function RouletteAnimation() {
  useEffect(() => {
    const app = new PIXI.Application({
      width: 1500,
      height: 1500,
      antialias: true
    });

    app.renderer.backgroundColor = 0x202020;

    app.renderer.view.style.position = 'absolute';

    document.body.appendChild(app.view);

    const loginform = document.getElementById('login-form');

    const aliens = [];

    const totalDudes = 20;

    for (let i = 0; i < totalDudes; i++) {
      const dude = PIXI.Sprite.from('/img/건-항아리.png');

      dude.anchor.set(0.5);

      dude.scale.set(0.8 + Math.random() * 0.3);

      dude.x = Math.random() * app.screen.width;
      dude.y = Math.random() * app.screen.height;

      dude.tint = Math.random() * 0xFFFFFF;

      dude.direction = Math.random() * Math.PI * 2;

      dude.turningSpeed = Math.random() - 0.8;

      dude.speed = 2 + Math.random() * 2;

      aliens.push(dude);
      app.stage.addChild(dude);
    }

    // create a bounding box box for the little dudes
    const dudeBoundsPadding = 100;
    const dudeBounds = new PIXI.Rectangle(
      -dudeBoundsPadding,
      -dudeBoundsPadding,
      app.screen.width + dudeBoundsPadding * 2,
      app.screen.height + dudeBoundsPadding * 2
    );

    app.ticker.add(() => {
      // iterate through the dudes and update their position

      for (let i = 0; i < aliens.length; i++) {
        const dude = aliens[i];
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * dude.speed;
        dude.y += Math.cos(dude.direction) * dude.speed;

        // wrap the dudes by testing their bounds...
        if (dude.x < dudeBounds.x) {
          dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
          dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
          dude.y += dudeBounds.height;
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
          dude.y -= dudeBounds.height;
        }
      }
    });
  }, []);
  return <div id="roulette-animation"></div>;
}

export default RouletteAnimation;
