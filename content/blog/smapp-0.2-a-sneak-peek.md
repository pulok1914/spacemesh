+++
aliases = ["/smapp-0-2-sneak-peek/"]
author = "Aviv Eyal"
categories = ["Technology"]
cover = "/uploads/0001.webp"
date = 2021-05-31T12:13:49Z
description = ""
tags = ["spacemesh tech", "smapp"]
title = "Smapp 0.2 - a Sneak Peek"

+++
Smapp (short for the Spacemesh App) is a [Spacemesh](#term:spacemesh) [cryptocurrency](#term:cryptocurrency) wallet and an interface for running a Spacemesh full p2p node on Windows, macOS, and Linux desktops.

Smapp is designed to enable people who are not comfortable with using command-line apps to smesh (participate in Spacemesh consensus protocol and mine Spacemesh coins) and to send and receive Spacemesh coins.

This short visual post provides a quick overview of some of the new features and improvements coming your way in Smapp Release 0.2, which will launch along with the Spacemesh Tweedledum open testnet.

Thanks to the awesome [Global Spacemesh Community](https://chat.spacemesh.io/) for your feedback on Smapp for the current open Spacemesh Testnet. Keep it coming, Keep it real!

## Just Click to Smesh

![](/uploads/pos_setup_low-1.gif)

Smapp's first time user experience is designed to get you smeshing (mining Spacemesh coins) quickly and effortlessly. You create a wallet, protect it with a password, and continue to create Proof of Space data on your hard-drive.  
Proof of Space data is what enables you to participate in the Spacemesh protocol and smesh Spacemesh coins.

When the one-time setup is complete, your computer joins the Spacemesh network and starts participating in the Spacemesh consensus protocol. After that, you start earning Spacemesh coins as your reward for participating.

> We spent some effort trying to make it so that this interaction can be completed with as few clicks as possible, without compromising on security. Wallet files should be password protected and users should be able to control how much space they want to commit to Spacemesh, as well as being able to select which processor they want to create the data with.

## A Streamlined User Interface

We streamlined the main user interface based on users' feedback on earlier releases of Smapp. Gone is the much-loved (and honestly sometimes less-than-loved) big status bar at the top of the screen. Status and commands now have homes in four main screens - Network, Smeshing, Dashboard and Wallet.

![wallet](/uploads/wallet_screen_tidyup.png)

The revamped wallet screen displays your account balance and recent transactions, and enables you to quickly send Spacemesh coins to any other account. Notice the new purple square button next to your account. Clicking on it opens the Spacemesh explorer in your web browser where you can see more details about your account and transactions.

![smeshing](/uploads/smeshing.png)

The all-new Smeshing screen provides you with information about your Proof of Space setup. It enables you to easily increase or decrease your proof of space data size, view your current Proof of Space status and check when you are eligible to participate in the Spacemesh consensus protocol, so that you can earn coin rewards for participation.

![network](/uploads/network_synced.png)

The all-new network screen ID is dedicated to displaying thereal-time operational status of your managed Spacemesh node as well as general information about the Spacemesh network. Previous releases of Smapp mixed this information with smeshing-related information, making it hard for users to parse, as there were too many kinds of information condensed in one screen.

![network](/uploads/network_node_error.png)

When your node fails due to an issue, you can now also restart it from this screen with a click of a button. It is no longer needed to restart the whole app to do this, as was the case in previous Smapp releases.

***

## An Improved Transaction Details View

![tx](/uploads/tx_log_tidy_up.png)

We revamped the transaction's details view in the transactions log screen which was not very clear in previous releases of Smapp. We added links to the Spacemesh Explorer for additional in-depth information about the transaction and about the sender's and the receiver's accounts.

***

## Hello Wallet-only Mode

With previous releases of Smapp, Smapp always started a managed Spacemesh p2p full node on your computer. This is great for smeshing and for participating in the Spacemesh consensus protocol, but not so great if you only want to use Smapp's wallet features for Spacemesh coins.

We changed this with this release. You can now set up Smapp as a wallet without running a locally-managed Spacemesh p2p node on your computer.

![wallet](/uploads/wallet_only.png)

![synced](/uploads/synced_pub_api.png)

Wallet-only mode is useful when you just want to have a functional Spacemesh wallet on your computer, but you don't want to run a Spacemesh p2p full node or smesh on it.  
In wallet-only mode, you can check your account balance, review the status of your past transactions, see new incoming transactions, and even submit new transactions to the network for processing. And as a bonus, Smapp consumes much less computer resources in this mode so it is less demanding on even old and slow computers.

> For this convenience you lose some of the strong security guarantees provided to you by running your own Spacemesh full p2p node, as you need to trust the Spacemesh API provider that your Smapp is connected to, which will provide you with correct information and submit your transactions on your behalf for processing.

You can easily configure which API provider you want to connect to from available providers on the Internet, and you can start a local p2p full node at any time.

***

## A New Dashboard Screen

![dash](/uploads/dash.png)

The all-new dashboard screen provides users a high-level view of key Spacemesh network stats using real-time infographics. The dashboard is useful for checking the overall network health, total coin circulation, total security (measured in proof of space time committed to the network, and more... Each infographic is clickable to open the Spacemesh network explorer in a web browser where additional detailed data is available for browsing. The dashboard and explorer for the current Spacemesh testnet are also available on the web at [https://dash.spacemesh.io](https://dash.spacemesh.io "https://dash.spacemesh.io") and on [https://explorer.spacemesh.io](https://explorer.spacemesh.io "https://explorer.spacemesh.io")

***

## Going Deeper...

Smapp is a 100% open source software [available on github](https://github.com/spacemeshos/smapp), and we design it fully in the open on Figma. Check out additional new screens, design flows, and interactive prototypes on the public [Spacemesh Figma](https://medium.com/r/?url=https%3A%2F%2Fwww.figma.com%2Ffile%2F6bbFkIAzVu36bIpUNnMqoy%2FSmapp-Designs%3Fnode-id%3D7503%253A36011). Smapp is an Electron App. If you are a Electron developer who's interested in working on Smapp full time, then please [get in touch with us](mailto:jobs@spacemesh.io).