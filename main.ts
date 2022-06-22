radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        Mode = 1
    }
    if (receivedNumber == 2) {
        Mode = 2
    }
    if (receivedNumber == 3) {
    	
    }
    if (receivedNumber == 4) {
    	
    }
    if (receivedNumber == 5) {
    	
    }
    if (receivedNumber == 6) {
    	
    }
})
radio.onReceivedValue(function (name, value) {
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
})
let Right_gaz = 0
let Left_gaz = 0
let Mode = 0
Mode = 1
radio.setGroup(208)
basic.forever(function () {
	
})
