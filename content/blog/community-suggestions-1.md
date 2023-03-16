+++
aliases = []
author = "team spacemesh"
categories = ["Community"]
cover = "/uploads/night-mode02_2021-11-02.png"
date = 2021-11-02T08:22:03Z
description = ""
tags = ["suggestions"]
title = "Community Suggestions: November 2021"

+++
We take suggestions from our community seriously. In the past, we’ve dealt with them on the fly, but this has become less practical as the community has grown. As such, we’re going to compile the viable ones every few months and address them all at once. These are the first batch, with responses from the team.

---

**Suggestion (from @ChiaChia#8570):** I wonder if the official Spacemesh will be posted how to participate in on Youtube like they already posted how to start it as instruction

**Response:** We already have tutorial videos up for [testnet 0.1](https://www.youtube.com/watch?v=RLhKz0XiH0A&list=PL5BszCNLCnMPSGJliF6WzdCPX9O6z16YX&ab_channel=TeamSpacemesh), and community members sometimes like to make their own. We’ll make more for 0.2, when it’s ready.

---

**Suggestion (from @Gaba#3535):** Change the phrase, "Creating proof of space data on more than one volume is not yet supported." to "Creating a single proof of space data on more than one volume is not yet supported." would make more clear, since some people (including me) thinks it says that you can only use PoST files from one drive.

**Response:** Thank you. We’ll update the docs.

---

**Suggestion (from @P2#5922):** I suggest a lockup period after mainnet launch, in which no transactions are possible. This will create an anticipation and a hype which will push price up. Another seriously positive outcome regards taxation. Since at this limited period the mined coins have no value, income tax is zero. When these specific coins will be sold, there will be only capital gain tax. At least this is how it is in many countries - income tax on value of mined coins at time of mining and capital gain tax on the difference between value at time of sell and value at time of mining.

**Response:** The Spacemesh protocol works in two-week intervals called epochs. After initializing their PoST storage, Smeshers generate a proof of held storage and submit it to a PoET server which creates a proof of sequential work - showing that an epoch has passed. Smeshers then combine the PoET proof with yet another proof that they still hold their storage. Together these three proofs can be independently verified and show that the smesher indeed held their storage for an entire epoch. Only then, in the following epoch, does the smesher become eligible to produce blocks and participate in the Hare protocol.

In the first epoch after the launch of the network the first Smeshers will submit their proofs of storage to the PoET and wait, until they eventually publish an activation transaction making them eligible to produce blocks only in the second epoch. So no blocks of transactions can be produced during the first two weeks.

---

**Suggestion (from @Krayton#0401):** I noticed in testnet discussion, that the Twitter relay has been removed from announcements; not all of us have Twitter if there is going to be exclusive information posted there maybe have a discord channel for the tweet bot?

**Response:** There is no exclusive information on Twitter. Quite the opposite: exclusive information goes on discord. Nothing that goes on Twitter is excluded from discord announcements.

---

**Suggestion (from @Neo#9256):** Suggestion for the 🧪testnet_discussion channel: perhaps a pinned message indicating a downed network could reduce the frequency of queries. I know the history is available in 📢announcements , but it's actually pretty well buried (relatively speaking, given people's impatience) by other posts

**Response:** [Done](https://discord.com/channels/623195163510046732/623195511331225620/904655601320214558).

---

**Suggestion (from @judy#1032):** Could someone tell me where to see the current version number inside the wallet app? If it's not there, can it be added? I couldn't check my current wallet version against the new wallet version to verify if I was really behind.

**Response:** For the Smapp version, click on settings icon top-right. It is displayed in the settings screen. It is also displayed at the bottom-left corner of every screen so bug reports screen-shots always indicate the app version. In addition, upcoming versions of Smapp are going to display the Spacemesh network ID that is currently used in the new dashboard screen and in the new network screen so it will be clearer which devnet/testnet Smapp is configured to use.

---

**Suggestion (from @judy#1032):** Beyond that, I'm wondering if something is being put into place to push update notifications to smeshers. I haven't had any wallet application on any coin that I've played with so far give me those kinds of notices. Even an iframe on a tab that links to the right page on spacemesh.io would go a long way.

**Response:** We will add an “update available” notification to Smapp release 0.2 once the core features that we are working on are done.

---

**Suggestion (from @Turbo#6892):** Hey, I wonder if it's worth having a #mainnet channel up now with one pinned post saying that it will be announced in due course or Q4 or whatever, and than you can point the hundreds of 'when mainnet' questions to that channel and there is an outside chance that some people will check the channel before asking the 'when mainnet' question in all the other rooms/channels ?

**Response:** We still think it's too premature for a mainnet channel. Its existence might cause more confusion in the long term. For now, we'll keep responding on an individual basis.

---

**Suggestion (from @Krayton#0401):** This is less a suggestion for space mash, and more for discord; maybe some of the more common questions and issues that pop up repeatedly and are addressed just as repeatedly in the various channels could be pinned? Like a faq?

**Response:** Yes, this is a very good idea and we're working on it.

---

**Suggestion (from @hernejj#8306):** It would be cool if the main interface could show some sort of "progress" perhaps, while we're waiting for the initial 48 hour period before we're eligible for processing blocks. I don't know what happens during this time but maybe a percentage complete or something? Some indicator that the process is really progressing and not hung up somewhere. This would make the user feel much better while waiting.

**Response:** There's a new activations screen in the product pipeline which will provide this info.

---

**Suggestion (from @johnreese#2265):** Hi, everyone. It'd be nice to be able to store the Wallet password on the macOS keychain, to avoid re-typing the password when unlocking. This would be useful especially when running the Wallet app in background and to open it again you need to unlock it. What do you guys think?

**Response:** These kinds of features are definitely nice to have, and will be added after we’ve covered all the core features.

---

**Suggestion (from @Vesna#9838):** I suppose that it would be useful to add in settings email alert when smeshing stopped or goes offline and need to be restarted. If it is possible, of course.

**Response:** There's detailed smeshing status in the upcoming 0.2 smeshing screen. We'd like to keep smapp not dependent on additional web services such as email and keep it private as possible. We’re also going to have desktop notifications so when smapp is minimized you will get notifications on smeshing status changes.

---

**Suggestion (from @Vesna#9838):** In settings menu in Wallet settings part, when I push the button 'CHECK FOR UPDATES' I do not receive any visual response. Just see 0.1.14 No updates available. I suggest to add some response after clicking this button. And also to add 'Last check: date, time' and 'Last update: date, time

**Response:** This feature is not yet fully implemented. We’ll remove it from the UI until it is ready.

---

**Suggestion (from @v2g9zMnvKwotIdKlg#4844):** It's not a big deal, but here's a suggestion if you have some spare front-end dev time... It would be nice if an alternative Spacemesh app GUI is offered in the future, e.g., simpler and/or modern. And that one could choose which theme he wants in app settings. I understand and appreciate the current design, but sometimes it becomes a bit hard to parse/read.

**Response:** We are going to be adding a new more modern-looking skin to Smap 0.2 - it is in our roadmap of GUI features to add once the app is working properly and is feature complete. We are not there yet.

---

**Suggestion (from @sdooweloc314#8877):** So I know that having to put in the passcode to open the wallet is for security stuff and such but can we at least see like our balance and a yes/no status for smeshing without needing the password? Very cumbersome if I just want to check in on the wallet and make sure nothing broke

**Response:** Not being able to see your wallet balance without a password input is a privacy feature, but we will add an option via the settings to turn off this requirement, leaving it up to the user’s discretion.

---

Thank you all for these great suggestions, and please give us more by dropping them in the [#suggestions](https://discord.gg/Ke8ydCJPBm) channel on our Discord server.