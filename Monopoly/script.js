$(document).ready(function() {
    let posX = 0, posY = 0;
    let direction = "right"; // 初始方向
    const tileSize = 90; // 每邊的長度
    const boardSize = 9; // 0~9 共 10 格

    $("#rollDice").click(function() {
        // 顯示動畫
        $(".dice").css("animation", "roll 0.5s infinite");

        setTimeout(() => {
            // 擲骰子
            let dice1 = Math.floor(Math.random() * 6) + 1;
            let dice2 = Math.floor(Math.random() * 6) + 1;
            let dice3 = Math.floor(Math.random() * 6) + 1;
            let steps = dice1 + dice2 + dice3;

            // 停止動畫
            $(".dice").css("animation", "none");

            // 更新骰子數字
            $("#dice1").text(dice1);
            $("#dice2").text(dice2);
            $("#dice3").text(dice3);
            $("#diceResult").text(`骰子點數：${steps}`);

            movePlayer(steps);
        }, 1000);
    });
});

const player = document.querySelector('.player');
let posX = 0, posY = 0; // 角色位置
let direction = 'right'; // 預設向右移動

const gridSize = 90;  // 一格大小 90px
const boardWidth = 10;  // 地圖寬度 (10x10)
const boardHeight = 10; // 地圖高度 (10x10)

// 定義拐角處的座標 (根據你的地圖設置)
const corners = [
    { x: 9, y: 0, turn: 'down' },  // 右上角 → 向下
    { x: 9, y: 9, turn: 'left' },  // 右下角 → 向左
    { x: 0, y: 9, turn: 'up' },    // 左下角 → 向上
    { x: 0, y: 0, turn: 'right' }  // 左上角 → 向右
];

function movePlayer(steps) {
    let remainingSteps = steps;

    function step() {
        if (remainingSteps <= 0) {
            player.classList.remove('walking-' + direction);
            return; // 停止移動
        }

        // **檢查是否快到拐角**
        let nextPosX = posX, nextPosY = posY;
        switch (direction) {
            case 'right': nextPosX += gridSize; break;
            case 'left': nextPosX -= gridSize; break;
            case 'down': nextPosY += gridSize; break;
            case 'up': nextPosY -= gridSize; break;
        }

        let corner = corners.find(c => c.x * gridSize === nextPosX && c.y * gridSize === nextPosY);
        
        // **如果即將到達拐角，先走到拐角再轉向**
        if (corner && remainingSteps >= 1) {
            posX = corner.x * gridSize;
            posY = corner.y * gridSize;
            direction = corner.turn; // **到達拐角後轉向**
            updateSpriteDirection();
        } else {
            // **正常移動**
            posX = nextPosX;
            posY = nextPosY;
        }

        player.style.transform = `translate(${posX}px, ${posY}px)`;
        player.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

        remainingSteps--;
        setTimeout(step, 300); // 逐步移動
    }

    player.classList.add('walking-' + direction);
    step();
}

function updateSpriteDirection() {
    player.classList.remove('walking-up', 'walking-down', 'walking-left', 'walking-right');
    player.classList.add('walking-' + direction);
}

// 觸發擲骰子，移動角色 (假設骰子結果是 10)
document.querySelector('.roll-dice').addEventListener('click', () => {
    let diceResult = Math.floor(Math.random() * 18) + 3; // 3~18
    movePlayer(diceResult);
});
