---
title: testing page
layout: master
description: this is a testing page for master layout
slug: testing page
page_sections:
  - template: section-top-nav
    top_btn:
      label: EVENT INFO
      link: '#'
  - template: section-hero
    hero:
      body: Download the app,<br> enter the crypto world
      btn_download_link: '/start'
      btn_download_title: Join the Testnet
      btn_more_link: '/#term:hello'
      btn_more_title: Meet @Arley
      headline:
        <a href="#term:spacemesh">Spacemesh</a> is the <a href="#term:crypto">crypto</a>
        you can mine from your computer
      intro: '<span>Spacemesh</span> is a community of builders,<br> thinkers and artists '
    creators:
      featured:
        - creators/hiroshi-kondo.md
        - creators/maria.md
        - creators/pattarapol.md
        - creators/elf.md
        - creators/Celebrating-10k.md
      intro: Listen to the spacemesh <span>community</span>
    update:
      cta: See All
      intro: Monthly <span>updates</span>
    discord:
      cta: JOIN
      intro: '<span>community</span>-driven'
      link: https://chat.spacemesh.io/
    hidden:
      top:
        - enabled: true
          image: '/uploads/archimedes_2021-10-28.png'
          link: https://spacemesh.io/winning-together/
          position: A
          template: hidden-generic
          text: '#winning_together'
          type: generic
  - template: section-community
    hidden:
      main:
        - enabled: false
          image: '/uploads/screen-shot-2021-10-04-at-14-04-24_2021-10-04.png'
          link: https://www.youtube.com/watch?v=PJAgPF5FNTQ
          position: A
          template: hidden-generic
          text:
            '"We were a land of opportunity. You can never have equal outcomes, but
            you can have equal opportunity." ~ Jamie Dimon'
          type: generic
    breaker:
      cta: Join the community
      intro:
        '<span>Spacemesh</span> is for everyone. Our mission is to create a coin
        that rewards the many over the few.'
    cases:
      intro:
        '<span>Our community</span> is a harmony<br> Listen to the many voices
        of Spacemesh'
    subtitle:
      headline: Innovate<br> with us
      intro: "<span>help create</span> the world's most decentralized cryptocurrency"
      links:
        - link: https://github.com/spacemeshos
          name: the Open Source project
          newtab: true
        - link: https://chat.spacemesh.io
          name: Dev discussion on discord
          newtab: true
    connect:
      intro:
        '<span>Smeshers</span> are everywhere. Talk to other community members
        from around the world '
      links:
        - channel: Discord
          color: '#D0021B'
          link: https://discord.gg/C65p9cUzNT
          name: हिंदी
        - channel: Discord
          color: '#F8E71C'
          link: https://discord.gg/VcUdKaFba3
          name: español
        - channel: Telegram
          color: '#BD10E0'
          link: https://t.me/Spacemesh_rus
          name: pусский
        - channel: Discord
          color: '#8B572A'
          link: https://discord.gg/2yeZnuzcUZ
          name: română
        - channel: Discord
          color: '#7ED321'
          link: https://discord.gg/HJHFw6FtNr
          name: italiano
        - channel: Discord
          color: '#417505'
          link: https://discord.gg/FMQkN3fJv9
          name: français
        - channel: Discord
          color: '#BD10E0'
          link: https://discord.gg/XAFz5MAsSB
          name: 한국어
        - channel: Discord
          color: '#F5A623'
          link: https://discord.gg/3wxny488Xb
          name: polski
        - channel: Telegram
          color: '#417505'
          link: https://t.me/spacemeshthai
          name: ไทย
        - channel: 'Discord '
          color: '#000000'
          link: https://discord.gg/HN3DxmTs
          name: 日本語
        - channel: Discord
          color: '#9013FE'
          link: https://discord.gg/D2g3v8w6d5
          name: 中文
        - channel: Discord
          color: '#4A90E2'
          link: https://discord.gg/9MpXaSxtF8
          name: türkçe
    repos:
      intro: '<span>Spacemesh</span> is an open-source project. Visit our GitHub'
      links:
        - description: Go Implementation of the Spacemesh protocol full node.
          link: https://github.com/spacemeshos/go-spacemesh
          name: go-spacemesh
        - description:
            This repo contains the Spacemesh protocol specifications and related
            documentation.
          link: https://github.com/spacemeshos/protocol
          name: protocol
    creator:
      creator: creators/protocol-intro.md
      intro: Spacemesh <span>Protocol</span>
    blogLink:
      intro: '<span>Spacemesh blog:</span> Our collective stream of consciousness'
  - template: section-crypto
    hidden:
      bottom:
        - enabled: false
          image: '/uploads/equal-opportunities_2021-10-04.webp'
          link: https://fivethirtyeight.com/features/rich-kids-stay-rich-poor-kids-stay-poor/
          position: A
          template: hidden-generic
          text:
            No two individuals are ever the same. You cannot equate people. You can
            only create equal opportunity. Jaggi Vasudev
          type: generic
    testnet:
      dashboardURL: https://dash.spacemesh.io/
      endpoint: https://explorer-api-devnet221.spacemesh.io/network-info
      intro: '<span>Testnet 0.2</span> dashboard and overview <br> '
    news:
      endpoint: https://zen-elion-aba44c.netlify.app/.netlify/functions/news
      intro: '<span>CRYPTO NEWS</span> and updates from around the world'
  - template: section-community-about
    community:
      body:
        '<p>You might have heard of Cryptocurrency. And it could even be that you
        own cryptocurrency. But you also know that not everyone knows what it is and
        certainly not everyone owns some.</p><p>Spacemesh is here to change all that;
        to make crypto friendly and accessible to everyone. So go ahead, download Spacemesh
        and start mining, or read all about it to understand it in full.</p>'
      headline:
        The people’s <a href='#term:cryptocurrency'>cryptocurrency</a>; rewarding
        the many over the few
      id: community
      intro:
        '<span>Our community</span> is evolving. Explore what others are doing
        with Spacemesh'
      links:
        - link: '/start'
          name: Start smeshing
        - link: '/blog'
          name: Food for thought
    hidden:
      main: []
  - template: section-community-start
    subtitle:
      headline: What is<br> spacemesh
      intro: Rewarding the <span>many</span> over the few
      links:
        - link: 'https://testnet.spacemesh.io/'
          name: About the open testnet
          newtab: true
        - link: 'https://spacemesh.io/blog/spacemesh-manifesto/'
          name: The spacemesh vision
          newtab: false
    connect:
      intro: <span>CONNECT</span> with us and other smeshers around the world.
      links:
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/9MpXaSxtF8'
          name: türkçe
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/D2g3v8w6d5'
          name: 中文
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/HN3DxmTs'
          name: 日本語
        - channel: Telegram
          color: '#3affa7'
          link: 'https://t.me/spacemeshthai'
          name: ไทย
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/3wxny488Xb'
          name: polski
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/XAFz5MAsSB'
          name: 한국어
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/FMQkN3fJv9'
          name: français
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/HJHFw6FtNr'
          name: italiano
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/2yeZnuzcUZ'
          name: română
        - channel: Telegram
          color: '#3affa7'
          link: 'https://t.me/Spacemesh_rus'
          name: pусский
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/VcUdKaFba3'
          name: español
        - channel: Discord
          color: '#3affa7'
          link: 'https://discord.gg/C65p9cUzNT'
          name: हिंदी
    repos:
      intro: <span>Spacemesh</span> is an open-source project<br> Visit our GitHub
      links:
        - description: Go Implementation of the Spacemesh protocol full node.
          link: 'https://github.com/spacemeshos/go-spacemesh'
          name: go-spacemesh
        - description: >-
            This repo contains the Spacemesh protocol specifications and related
            documentation.
          link: 'https://github.com/spacemeshos/protocol'
          name: protocol
    creator:
      creator: creators/Spacemesh 3D.md
      intro: 'We are winning <span>together</span> '
  - template: section-hardware-start
    hidden:
      main:
        - enabled: true
          image: /uploads/giphy-20-_2021-06-29.gif
          link: 'https://chat.spacemesh.io'
          position: A
          template: hidden-generic
          text: 'Join the Decentralized Revolution '
          type: generic
    resources:
      body: <br>
      headline: "Get your computer<br> and let's <a href='#term:spacemesh'>Get Started</a>"
      intro: Your ticket to the <span>revolution</span>
      left:
        body:
          Good internet connection. 15 free minutes. Free disk space. A sense of
          being one with humans, nature, and the cosmos.
        title: What you’ll need
      right:
        body:
          Any equipment (other than your desktop computer). Any technological or
          coding background. Any understanding of cryptocurrency.
        title: What you don't need
    video:
      body:
        To join the Testnet you need to run the Spacemesh App on your desktop
        computer. An updated video coming soon :)
      headline: Installing and Running the App
      video: 'https://player.vimeo.com/video/696441548?h=9152d4877d'
      vimeo_id: '696441548'
    requirements:
      disabled: false
      headline: System requirements & recommended hardware
      link: 'https://testnet.spacemesh.io/#/requirements'
    hardware:
      disabled: false
      headline: Make sure to disable computer sleep mode
      link: 'https://testnet.spacemesh.io/#/no_sleep'
    apply:
      disabled: false
      headline: Browse all available guides
      link: 'https://testnet.spacemesh.io/#/../all'
  - template: section-others-resources
    glossary:
      headline: SPACEMESH GLOSSARY
      id: glossary
      intro: >-
        <span>Learn</span> the basics of crypto and Spacemesh. Click on any
        highlighted words to learn more.
    other:
      headline: Technical resources
      id: resources
      intro: >-
        <span>Resources</span> for techies can be found here. Testnet, Github,
        Product plan, and protocol overview
      resources:
        - description: Spacemesh Protocol v1.0
          link: 'https://drive.google.com/file/d/18I9GPebWqgpvusI1kMnAB9nayBbL-1qN/view'
          name: White Paper
        - description: Spacemesh Project Product Plan and Roadmap
          link: 'https://github.com/spacemeshos/product/blob/master/roadmap.md'
          name: Project Plan and Roadmap
        - description: Full guide about participating in the testnet
          link: 'https://testnet.spacemesh.io/'
          name: Testnet Resources
        - description: Open source repos on GitHub
          link: 'https://github.com/spacemeshos/'
          name: GitHub
  - template: section-team-about
    subtitle:
      headline: SPACEMESH<br>TEAM
      intro:
        '<span>OUR TEAM</span> is enthusiastic about cryptocurrency, freedom, justice
        and creativity.'
      links:
        - link: '/careers'
          name: JOIN THE TEAM
          newtab: false
    team:
      headline: SPACEMESH<br>TEAM
      id: team
      intro:
        '<span>OUR TEAM</span> is enthusiastic about cryptocurrency, freedom, justice
        and creativity.'
      people:
        - name: Alexander Bergasov
          title: Core Developer
          twitter: ''
          website: https://www.linkedin.com/in/alejandro-bergasov/
        - name: Alon Askal
          title: CMO
          twitter: https://twitter.com/askal_al
          website: ''
        - name: Aviv Eyal
          title: CPO, Co-founder
          twitter: https://twitter.com/avive
          website: https://avive.github.io/
        - name: Ayala Hatan
          title: HR & Operations Manager
          twitter: ''
          website: https://www.linkedin.com/in/ayala-hatan-188b13225/
        - name: Chaim Glantz
          title: Marketing & Community manager
          twitter: ''
          website: ''
        - name: Danielle Shamir
          title: Operations Coordinator
          twitter: ''
          website: ''
        - name: Daria Shualy
          title: Advisor
          twitter: https://twitter.com/darshu
          website: ''
        - name: Dmitry Shulyak
          title: Principle Developer
          twitter: ''
          website: ''
        - name: Doron Avital
          title: Advisor
          twitter: ''
          website: ''
        - name: Eugene Toropov
          title: Core Developer
          twitter: ''
          website: https://www.linkedin.com/in/eugene-golang-890a1a1a8/
        - name: Iddo Bentov
          title: Chief Scientist
          twitter: ''
          website: https://www.cs.cornell.edu/~iddo/
        - name: Jonathan Dagan
          title: Advisor
          twitter: https://twitter.com/jviewz
          website: https://jviewz.com/
        - name: Jonathan Zlotnik
          title: Core Developer
          twitter: ''
          website: https://www.linkedin.com/in/jonzlotnik/
        - name: Kimmy Lin
          title: Core Developer
          twitter: ''
          website: ''
        - name: Kirill Shumilov
          title: APPLICATION DEVELOPER
          twitter: ''
          website: ''
        - name: Lane Rettig
          title: Core developer, Research<>Dev coordinator
          twitter: https://twitter.com/lrettig
          website: https://www.etherean.org/
        - name: Max Parfenov
          title: App Developer
          twitter: ''
          website: https://www.linkedin.com/in/maksym-p-a38389174/
        - name: Moshe Shababo
          title: R&D Lead
          twitter: ''
          website: https://www.linkedin.com/in/moshababo/
        - name: Narayan Prusty
          title: Automation and Infrastructure Developer
          twitter: ''
          website: ''
        - name: Nikita Kryuchkov
          title: Core Developer
          twitter: ''
          website: ''
        - name: ' Noam Nelke'
          title: Core Developer, Software Architect
          twitter: ''
          website: ''
        - name: Oriya Pollak
          title: Product Manager
          twitter: ''
          website: https://www.linkedin.com/in/oriya/
        - name: Rami Kasterstein
          title: Co-founder
          twitter: ''
          website: ''
        - name: Ran Cohen
          title: Researcher
          twitter: ''
          website: ''
        - name: Tal Moran
          title: Chief Scientist
          twitter: ''
          website: https://talmoran.net/
        - name: Tannr Allard
          title: Lead Developer - Programmability
          twitter: ''
          website: https://github.com/WilfredTA
        - name: Tomer Afek
          title: CEO, Co-founder
          twitter: https://twitter.com/tomerafek
          website: ''
        - name: Vince Drayne
          title: Visual Designer
          twitter: ''
          website: https://vincentdrayne.com/
        - name: Wojciech Klaudiusz Zaborowski
          title: R&D coordination
          twitter: ''
          website: https://www.linkedin.com/in/wojciech-klaudiusz-zaborowski-b887434/
        - name: Yael Hoffman
          title: Marketing & Community manager
          twitter: https://twitter.com/YaelMHoffman
          website: ''
    hidden:
      bottom: []
  - template: section-hero-about
    hidden:
      top:
        - enabled: true
          link: '/soon'
          position: A
          template: hidden-coin
          type: coin
    intro:
      body:
        Through our adventurous community of makers, thinkers and creators, we will
        build a just future for all of us
      headline:
        We're going to make <a href='#term:satoshi-vision'>Satoshi's</a> vision
        a reality
      intro: '<span>SPACEMESH</span> the thing in itself'
      links:
        - link: '#community'
          name: The Story
        - link: '#team'
          name: The Team
  - template: section-hero-start
    hero:
      body: Own a computer?<br> you have everything you need
      button: 'Download '
      headline: >-
        Join <a href="#term:testnet">Testnet</a><br> prepare for the <a
        href="#term:decentralized">decentralized</a> revolution
      intro: 'easy to participate, simple to understand, has the power to change the world'
      downloads:
        - os: Windows
          url: >-
            https://storage.googleapis.com/smapp/v0.2.3/Spacemesh%20Setup%200.2.3.exe
        - os: MacOS
          url: 'https://storage.googleapis.com/smapp/v0.2.3/Spacemesh-0.2.3.dmg'
        - os: Linux
          url: >-
            https://storage.googleapis.com/smapp/v0.2.3/spacemesh_app_0.2.3_amd64.deb
      links:
        - link: 'https://spacemesh.typeform.com/to/IOnyX02b'
          name: 'Let me know when mainnet is released '
          newtab: true
      slides:
        - alt: Smeshing
          body: >-
            This is the Smapp (Spacemesh App) which you can use to smesh from your
            home computer.

            Smeshing is what we call mining. You smesh by committing space on your
            computer to the Spacemesh network, and receiving smeshing rewards in
            return. Once this space is committed, it cannot be used for any other
            purpose.

            In order to commit space to the network, you must generate Proof of
            Space data. This can be done using GPU or CPU, but it will be much
            faster and more efficient with GPU.
          image: /uploads/smeshing_2021-07-28.png
          title: Smapp
        - alt: Wallet
          body: >-
            In the wallet screen, you can send and request tokens, back up your
            wallet, and view recent transactions.
          image: /uploads/wallet-only-one-wallet-2_2021-10-14.png
          title: Your Wallet
        - alt: Network
          body: >-
            In order to smesh, your node needs to be synced to the network. Syncing
            is a resource-intensive process which can take some time.

            In the Network screen, you'll be able to check your sync status and, in
            the event that you run into any problems, look at your log file.
          image: /uploads/network_2021-07-28.png
          title: Checking Your Status
        - alt: Dash
          body: >-
            In the Dashboard screen, you'll be able to check on the status of the
            entire network.
          image: /uploads/dash_2021-07-28.png
          title: Your Dashboard
    hidden:
      top:
        - enabled: true
          image: /uploads/giphy-16-_2021-06-29.gif
          link: 'https://spacemesh.io/blog/all-the-world-s-a-game-are-you-ready-to-play/'
          position: A
          template: hidden-generic
          text: ARE YOU READY TO PLAY?
          type: generic
  - template: section-hero-careers
    hidden:
      top: []
    intro:
      body: >-
        Not looking for a job, but still want to get involved with us? We're <a
        href="https://github.com/spacemeshos" target="_blank">open-source</a> and
        would love your contribution
      headline: JOB<br>OPENINGS
      intro: <br>
      links:
        - link: '#jobs'
          name: JOB OPENINGS
        - link: 'https://github.com/spacemeshos'
          name: SPACEMESH ON GITHUB
          newTab: true
  - template: section-top-nav
    top_btn:
      back_btn: '#'
      label: EVENT INFO
      link: '#'
  - template: section-hero-events
    top_btn:
      label: EVENT INFO
      link: '#'
    hero:
      heading: HUMANS IN CRYPTO **HAPPY HOUR**
      text:
        '<p>brief description Semper malesuada adipiscing rutrum mollis molestie nisl
        facilisis. Fringilla at aliquam blandit ut sagittis eget malesuada. Lacus, nec
        velit hendrerit nibh nulla at convallis cras gravida. Massa est ut proin facilisis.</p>
        <p>04.22.2022 <br>00:00:00</P> <p>Mindspace Dam Nieuwezijds Voorburgwal 162, 1012
        SJ Amsterdam, Netherlands</p>'
      quote: '(quote OR SOMETHING TALKING about the event)'
      image: '/images/events-mask.png'
      video_details:
        name: ''
        url: '/videos/V1.mp4'
        id: 557663944
        subtitle: ''
      first_btn:
        label: RSVP Spacemesh Lisbon
        link: https://www.ethlisbon.org/
      second_btn:
        label: LATEST UPDATES
        link: https://www.ethlisbon.org/
      cardOne:
        left_content:
          sub_heading: EVENT INFO
          heading: HUMANS IN CRYPTO PARTY
          text: '09.09.2022 17:30:00'
        right_content:
          heading: LISBON PORTUGAL
          text: Rämistrasse 101, 8092 Zürich, Switzerland
        bottom_button:
          label: ADD TO CALENDAR
          link: '#'
      cardTwo:
        heading: '**Here** is heading'
        bottom_button:
          label: Join on whatapp
          link: '#'
      cardThree:
        heading: '**JOIN** OUR fanclub'
        bottom_button:
          label: Join on telegram baby
          link: '#'
  - template: section-hero-updates
    hidden:
      top: []
    intro:
      body: We believe in transparency<br>Follow our progress on all fronts
      headline: MONTHLY UPDATES<br> FROM<br> SPACEMESH
      intro: >-
        <span>SPACEMESH</span> The next stage of cryptocurrency is easy to
        understand, safe to use, kind to the planet
      links:
        - link: '#newsletter'
          name: SIGN UP FOR OUR NEWSLETTER
        - link: 'https://twitter.com/teamspacemesh'
          name: FOLLOW US ON TWITTER
          newTab: true
  - template: section-hero-resources
    hidden:
      top:
        - enabled: true
          image: ''
          link: 'https://www.youtube.com/watch?v=v3l5SHXxXD0&ab_channel=TeamSpacemesh'
          position: A
          template: hidden-generic
          text: 'What would George do?  '
          type: generic

    intro:
      body: >-
        Get answers to frequently asked questions, read articles or learn the basics
        with the Spacemesh glossary.
      headline: Delve deeper with Spacemesh
      intro: <span>SPACEMESH</span> Free internet money for forward thinking people
      links:
        - link: '#faq'
          name: FAQ
        - link: '#glossary'
          name: Glossary
        - link: '#resources'
          name: Main Resources
  - template: section-post
    content: '## **Privacy Policy**

**Effective Date: August 2021**

Unruly Technologies Ltd. (the Company) values your privacy. In this Privacy Policy (Policy), we describe how we collect, use, and disclose information that we obtain about visitors to this website (the “Site”). By visiting the Site, you agree that your personal information will be handled as described in this Policy. Your use of our Site, and any dispute over privacy, are subject to this Policy.

1\.**What Information Do We Collect About You?**

You are not required to provide us with any information in order to access and use our Site.

We collect information that you enter on our Site or provide to us in any other way, including information directly from users, such as your name, email address and location of your IP address and any other information that you choose to provide. We may also (automatically) collect information about your use of the Site, such as search terms, viewing history, communications and traffic data**.**

Specifically, we will collect and use your contact information when you request information or otherwise contact us with questions or complaints. We do not use cookies or other analytics and tracking tools on our Site.

If you contact us for questions or request information from us (including on various social media platforms), we will collect the information related to your inquiry.

2\.**What about Children on our Sites?**

Our Site is not designed for persons under the age of 18. We do not knowingly collect personal information from children under the age of 13. If we become aware that we have inadvertently received personal information from a child under the age of 13, we will delete such information from our records.'
---
