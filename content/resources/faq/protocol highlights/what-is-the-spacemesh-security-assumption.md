+++
title = "What is the Spacemesh security assumption?"

+++
The Spacemesh network is safe so long as the basic security assumption holds true. This assumption states that as long as no more than ⅓ of the total storage space committed to the platform by all smeshers who participate in the consensus protocol is controlled by malicious entities who collude to attack the network, the network is secure.

While an attack by more than ⅓ of the storage is ongoing, honest parties may not be able to agree on a canonical transactions history. This means that during the attack  
(i) Users may not able to execute transactions.  
(ii) Honest Smeshers may spend resources and won’t get rewarded due to blocks that seem valid, but turn out to be invalid.  
(iii) A seller may think that a payment was confirmed with a high level of confidence, but in truth it would be reversed after the attack ends. So an attacker may be able to double-spend by paying 2 sellers with the same coin - a history rewind attack.

Once the attack ends, Spacemesh's self-healing method restores both liveness and safety and all honest parties will agree again on a canoncal transaction history that doesn’t include invalid transactions (for example: 2 transactions that spend the same coin) so the attack’s damage is limited to what can happen during the attack as described here.