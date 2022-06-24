def on_received_number(receivedNumber):
    global Mode
    if receivedNumber == 1:
        # Her kan du endre lys, tute, litt forskjellig.
        Mode = 1
    if receivedNumber == 2:
        Mode = 2
    if receivedNumber == 3:
        bitbot.set_led_color(0x00FF00)
    if receivedNumber == 4:
        bitbot.led_rainbow()
    if receivedNumber == 5:
        bitbot.led_clear()
    if receivedNumber == 6:
        bitbot.buzz(True)
        basic.pause(100)
        bitbot.buzz(False)
        basic.pause(200)
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global Bias
    # Dette er kalibrering av styringen.
    Bias += 1
    bitbot.bb_bias(BBRobotDirection.LEFT, Bias)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global Bias
    Bias += -1
    bitbot.bb_bias(BBRobotDirection.LEFT, Bias)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global Left_gaz, Right_gaz
    # Dette er koden for manuell styring.
    if Mode == 1:
        if name == "x":
            Left_gaz = value / -10
            Right_gaz = value / 10
        elif name == "y":
            Left_gaz += value / 8
            Right_gaz += value / 8
            if Left_gaz < 0:
                bitbot.move(BBMotor.LEFT, BBDirection.REVERSE, abs(Left_gaz))
            else:
                bitbot.move(BBMotor.LEFT, BBDirection.FORWARD, abs(Left_gaz))
            if Right_gaz < 0:
                bitbot.move(BBMotor.RIGHT, BBDirection.REVERSE, abs(Right_gaz))
            else:
                bitbot.move(BBMotor.RIGHT, BBDirection.FORWARD, abs(Right_gaz))
radio.on_received_value(on_received_value)

Right_gaz = 0
Left_gaz = 0
Mode = 0
Bias = 0
basic.show_leds("""
    . # # # .
        . # . # #
        # # # # #
        # . # # #
        . # # . .
""")
Bias = 0
Mode = 1
radio.set_group(208)
bitbot.select_model(BBModel.XL)
bitbot.buzz(True)
basic.pause(100)
# BitBotten sier beep når den starter.
bitbot.buzz(False)

def on_forever():
    if Mode == 2:
        # Mathias sin selvkjøringskode.
        if bitbot.sonar(BBPingUnit.CENTIMETERS) > 20:
            bitbot.go(BBDirection.FORWARD, 60)
        elif bitbot.sonar(BBPingUnit.CENTIMETERS) < 20:
            bitbot.rotatems(BBRobotDirection.LEFT, 60, 500)
basic.forever(on_forever)
