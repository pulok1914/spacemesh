+++
count = 26
date = 2019-04-22T22:14:15Z
highlights = ""
title = "Update #26 - Week 4 - April 2019"
[[updates]]
body = "<p>Finalized blockchain projects participation for our tech-focused meetup in NYC blockchain week. there's still some open spots. <a href=\"https://www.eventbrite.com/e/nyc-blockchain-deep-tech-fireside-chat-tickets-60679107845\">RSVP</a> soon :-)</p><p>Finalized participation from awesome wasm people for WASM on the blockchain workshop we are helping to put together in Berlin in June. If you care about WASM on the blockchain then you should apply to participate! <a href=\"https://avive.github.io/wasm_on_the_blockchain/#/\" title=\"https://avive.github.io/wasm_on_the_blockchain/#/\">https://avive.github.io/wasm_on_the_blockchain/#/</a></p>"
header = "Community"
[[updates]]
body = "<p>Tal Moran's paper <a href=\"https://eprint.iacr.org/2016/035\">Simple Proofs of Space-Time and Rational Proofs of Storage</a> accepted to <a href=\"https://crypto.iacr.org/2019\">Crypto 2019</a>. The protocols described in the paper are used in the Spacemesh protocol for proofs of Space Time and help Spacemesh create a permissionless, fair cryptocurrency without resorting to POW or PoStake mechanisms.</p>"
header = "Research"
[[updates]]
body = "<p>Added <a href=\"https://github.com/spacemeshos/go-spacemesh/pull/820\">full mining capabilities</a> enabling the creation of activation transactions containing NIPST with POST and POET commitments!</p><p>Added <a href=\"https://github.com/spacemeshos/go-spacemesh/pull/832\">full build and test cycle</a></p><p><a href=\"https://github.com/spacemeshos/go-spacemesh/pull/864\">Updated poet ref</a> to our chosen poet solution</p>"
header = "Tech:  Spacemesh Full Node"
[[updates]]
body = "<p>Connect app to node api to <a href=\"https://github.com/spacemeshos/smapp/pull/90\">retrieve local node status</a></p><p>Connect <a href=\"https://github.com/spacemeshos/smapp/pull/91\">local node settings UI to node api</a></p><p>Connect help links to <a href=\"https://github.com/spacemeshos/smapp/pull/92\">testnet user guide</a></p>"
header = "Spacemesh App"
[[updates]]
body = "<p><a href=\"https://github.com/spacemeshos/ed25519\" title=\"https://github.com/spacemeshos/ed25519\">https://github.com/spacemeshos/ed25519</a></p><p>An open-source drop-in replacement to <a href=\"https://godoc.org/golang.org/x/crypto/ed25519\">golang/crypto/ed25519</a> with additional functionality.</p><p>We have developed this for the Spacemesh protocol since we could not find a good open source alternative. We hope that the open source blockchain dev community will find these capabilities useful in other scenarios and platforms.</p><p>In the ed25519 signature scheme, in order to verify the validity of a given signature, the validator should posses the public key of the signer. It can be sent along with the message and its signature, which means that the overall data being sent includes 256 bits of the public key. <em>Our function allows to extract the public key from the signature (and the message), thus the public key may not be sent, resulting in a smaller transferred data.</em></p>"
header = "ED25519 Public Key Extraction Go Library"

+++
