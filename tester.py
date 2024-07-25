# import usb
# import usb.util
# dev = usb.core.find(idVendor=0x0403, idProduct=0x6014)
# print(dev)

import board
# print(dir(board))
import digitalio

pzo = digitalio.DigitalInOut(board.C2)
pzo.direction = digitalio.Direction.INPUT
print(pzo.value)