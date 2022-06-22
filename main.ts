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
	
})
let Mode = 0
Mode = 2
radio.setGroup(208)
basic.forever(function () {
	
})
