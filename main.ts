radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 1) {
        //  Her kan du endre lys, tute, litt forskjellig.
        Mode = 1
    }
    
    if (receivedNumber == 2) {
        Mode = 2
    }
    
    if (receivedNumber == 3) {
        bitbot.setLedColor(0x00FF00)
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
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    //  Dette er kalibrering av styringen.
    Bias += 1
    bitbot.BBBias(BBRobotDirection.Left, Bias)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    Bias += -1
    bitbot.BBBias(BBRobotDirection.Left, Bias)
})
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    //  Dette er koden for manuell styring.
    if (Mode == 1) {
        if (name == "x") {
            Left_gaz = value / -10
            Right_gaz = value / 10
        } else if (name == "y") {
            Left_gaz += value / 8
            Right_gaz += value / 8
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
let Right_gaz = 0
let Left_gaz = 0
let Mode = 0
let Bias = 0
basic.showLeds(`
    . # # # .
        . # . # #
        # # # # #
        # . # # #
        . # # . .
`)
Bias = 0
Mode = 1
radio.setGroup(208)
bitbot.select_model(BBModel.XL)
bitbot.buzz(true)
basic.pause(100)
//  BitBotten sier beep når den starter.
bitbot.buzz(false)
basic.forever(function on_forever() {
    if (Mode == 2) {
        //  Mathias sin selvkjøringskode.
        if (bitbot.sonar(BBPingUnit.Centimeters) > 20) {
            bitbot.go(BBDirection.Forward, 60)
        } else if (bitbot.sonar(BBPingUnit.Centimeters) < 20) {
            bitbot.rotatems(BBRobotDirection.Left, 60, 500)
        }
        
    }
    
})
