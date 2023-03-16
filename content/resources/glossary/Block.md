+++
custom_id = ""
hidden = false
hide_button = false
order = 0
term = "Block"

+++
Blocks contain lists of transactions to be added to the [ledger](#term:ledger) and additional data to achieve consensus. Technically, each block belongs to a single [layer](#term:layer), and the [Smesher](#term:smesher) that creates it knows the correct time to publish it. Blocks explicitly state which blocks in previous layers they extend, an action called [voting](#term:vote).