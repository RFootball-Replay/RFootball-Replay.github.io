/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { drawStadium } from './StadiumCanvas';

function HeatMap() {

  const match = useSelector(state => state.gameStats.matches)
  const mtc = useSelector(state => state.gameStats.selectedMatch)
  const playerPos = useSelector(state => state.gameStats.playerPos)
  const playerList = useSelector(state => state.gameStats.playerList)
  const selectedPlayer = useSelector(state => state.gameStats.selectedPlayer)
  const selectedHeatmap = useSelector(state => state.gameStats.selectedHeatmap)
  const stadium = match[mtc].stadium
  const canvasRef = useRef(null);

  function drawArrow(ctx, from, to) {
    var headlen = 30; // length of head in pixels
    var dx = to.x - from.x;
    var dy = to.y - from.y;
    var angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  function draw(ctx) {

    drawStadium(ctx, stadium);

    var player = selectedPlayer;
    if (player === -1) player = match[mtc].redTeam[0];

    if (selectedHeatmap === '히트맵') {
      ctx.fillStyle = "rgba(255, 0, 0, 0.006)";
      const pos = playerPos[mtc][playerList.indexOf(player)];
      if (pos === undefined) return;
      for (var i = 0; i < pos.length; i++) {
        ctx.beginPath();
        ctx.arc(pos[i].x, pos[i].y, 25, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else {
      const stat = selectedHeatmap.split(' ')[0];
      if (stat === '골') {
        for (let goal of match[mtc].goals) {
          if (goal.scorer == player) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            ctx.moveTo(goal.shot.x, goal.shot.y);
            ctx.lineTo(goal.ballCoord.x, goal.ballCoord.y);
            ctx.stroke();
          }
        }
      } else if (stat === '도움') {
        for (let goal of match[mtc].goals) {
          if (goal.assist?.player === player) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            ctx.moveTo(goal.assist.shot.x, goal.assist.shot.y);
            ctx.lineTo(goal.shot.x, goal.shot.y);
            ctx.lineTo(goal.ballCoord.x, goal.ballCoord.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(goal.shot.x, goal.shot.y, 20, 0, 2 * Math.PI)
            ctx.fillStyle = 'red'
            ctx.fill();
          }
        }
      } else if (stat === '킥') {
        for (let kick of match[mtc].kicks) {
          if (kick.player === player) {
            ctx.beginPath();
            ctx.fillStyle = 'red'
            ctx.arc(kick.x, kick.y, 20, 0, 2 * Math.PI)
            ctx.fill();
          }
        }
      } else if (stat === '패스') {
        for (let pass of match[mtc].passes) {
          if (pass.player === player) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            drawArrow(ctx, pass.lastShot, pass.shot)
          }
        }
      } else if (stat === '슈팅') {
        for (let shot of match[mtc].shots) {
          if (shot.player === player) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 10;
            drawArrow(ctx, shot.from, shot.to)
          }
        }
      }
    }
  };

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context)
  }, [draw])

  return (
    <canvas ref={canvasRef} width={1060} height={650} style={{ margin: 'auto', display: 'block', top: '135%', bottom: 0, left: 0, right: 0 }} ></canvas>
  );
}

export default HeatMap;