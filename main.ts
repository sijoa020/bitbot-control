radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        Mode = 1
    }
    if (receivedNumber == 2) {
        Mode = 2
    }
    if (receivedNumber == 3) {
        bitbot.setLedColor(0xFF0000)
    }
    if (receivedNumber == 4) {
        bitbot.ledRainbow()
    }
    if (receivedNumber == 5) {
        bitbot.ledClear()
    }
    if (receivedNumber == 6) {
        bitbot.buzz(true)
        basic.pause(100)
        bitbot.buzz(false)
        basic.pause(200)
    }
})
radio.onReceivedValue(function (name, value) {
    if (Mode == 1) {
        if (name == "x") {
            Left_gaz = value / 10 * -1
            Right_gaz = value / 10
        } else if (name == "y") {
            Left_gaz += value / 10
            Right_gaz += value / 10
            if (Left_gaz < 0) {
                bitbot.move(BBMotor.Left, BBDirection.Reverse, Math.abs(Left_gaz))
            } else {
                bitbot.move(BBMotor.Left, BBDirection.Forward, Math.abs(Left_gaz))
            }
            if (Right_gaz < 0) {
                bitbot.move(BBMotor.Right, BBDirection.Reverse, Math.abs(Right_gaz))
            } else {
                bitbot.move(BBMotor.Right, BBDirection.Forward, Math.abs(Right_gaz))
            }
        }
    }
})
let Max_dist = 0
let Right_gaz = 0
let Left_gaz = 0
let Mode = 0
Mode = 1
radio.setGroup(208)
bitbot.buzz(true)
basic.pause(100)
bitbot.buzz(false)
basic.forever(function () {
    if (Mode == 2) {
        bitbot.rotate(BBRobotDirection.Left, 20)
        for (let index = 0; index < 400; index++) {
            if (bitbot.sonar(BBPingUnit.Centimeters) > Max_dist) {
                Max_dist = bitbot.sonar(BBPingUnit.Centimeters)
            }
        }
        Max_dist += -10
        while (!(bitbot.sonar(BBPingUnit.Centimeters) > Max_dist)) {
            bitbot.rotate(BBRobotDirection.Left, 20)
        }
        bitbot.goms(BBDirection.Forward, 60, Max_dist * 4)
    }
})
