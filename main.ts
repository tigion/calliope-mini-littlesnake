function eatMushroomAndGrowSnake () {
    if (snakeTail.length == 0) {
        x = snakeHead.get(LedSpriteProperty.X)
        y = snakeHead.get(LedSpriteProperty.Y)
    } else {
        x = snakeTail[snakeTail.length - 1].get(LedSpriteProperty.X)
        y = snakeTail[snakeTail.length - 1].get(LedSpriteProperty.Y)
    }
    snakeTail.push(game.createSprite(x, y))
    mushroom.delete()
    if (gameScore > 0 && (gameScore % 2 == 0 && snakeSpeed > 100)) {
        snakeSpeed += -25
    }
}
input.onButtonPressed(Button.A, function () {
    snakeHead.turn(Direction.Left, 90)
})
function moveSnake () {
    saveSnakeHeadX = snakeHead.get(LedSpriteProperty.X)
    saveSnakeHeadY = snakeHead.get(LedSpriteProperty.Y)
    snakeHead.move(1)
    if (snakeHead.get(LedSpriteProperty.X) != saveSnakeHeadX || snakeHead.get(LedSpriteProperty.Y) != saveSnakeHeadY) {
        if (snakeTail.length > 0) {
            snakeTail.unshift(game.createSprite(saveSnakeHeadX, saveSnakeHeadY))
            snakeTail.pop().delete()
        }
        for (let snakeTailPart of snakeTail) {
            if (snakeHead.isTouching(snakeTailPart)) {
                snakeCrash = 1
            }
        }
    } else {
        snakeCrash = 1
    }
    if (snakeCrash) {
        game.setScore(gameScore)
        game.gameOver()
    }
}
input.onButtonPressed(Button.B, function () {
    snakeHead.turn(Direction.Right, 90)
})
function setMushroom () {
    x = randint(0, 4)
    y = randint(0, 4)
    mushroom = game.createSprite(x, y)
    mushroom.set(LedSpriteProperty.Blink, 100)
}
let saveSnakeHeadY = 0
let saveSnakeHeadX = 0
let mushroom: game.LedSprite = null
let y = 0
let x = 0
let gameScore = 0
let snakeCrash = 0
let snakeSpeed = 0
let snakeTail: game.LedSprite[] = []
let snakeHead: game.LedSprite = null
snakeHead = game.createSprite(2, 4)
snakeHead.turn(Direction.Left, 90)
snakeTail = []
snakeSpeed = 500
snakeCrash = 0
gameScore = 0
let fruitCountdown = -1
setMushroom()
basic.pause(500)
basic.forever(function () {
    moveSnake()
    if (snakeHead.isTouching(mushroom)) {
        eatMushroomAndGrowSnake()
        gameScore += 1
        fruitCountdown = 3
    }
    if (fruitCountdown == 0) {
        setMushroom()
    }
    fruitCountdown += -1
    basic.pause(snakeSpeed)
})
