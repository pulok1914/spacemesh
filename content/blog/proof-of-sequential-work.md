+++
aliases = ["/posw/"]
author = "Yuval Zalmenson"
categories = ["Technology"]
cover = "/uploads/night-mode03_2021-06-25.png"
date = 2018-09-04T13:56:00Z
tags = ["spacemesh tech"]
title = "Proof of Sequential Work"
description = ""
+++
Say you’re a researcher and you have just made a groundbreaking discovery that solves a massive problem in your field of research. Excited with the discovery, you want to share it with the world at an important conference to be held in six months. What if you don’t trust any third party to escrow your work until then? Will you simply wait and risk someone else beating you to it? You need a way to prove that you reached this solution today, in case someone else publishes the same discovery sometime between today and the day of the conference.

Proofs of sequential work (PoSW) were first introduced in [\[MMV13\]](https://spacemesh.io/posw/#MMV13). PoSW are a type of protocol that, given a time parameter T (delay), outputs a proof that allows one to prove that s/he performed a sequential work that took about T time units. This proof can be used to prove that a specific event occurred some duration of time ago. Let’s break down this term and see what it is consists of:

### Proof

Given the output of the protocol (i.e., the proof) and a time parameter T, there should be an easy way to validate the output - meaning, to validate that the event indeed occurred about T time ago. The validation process should satisfy few requirements:

_Efficiently verifiable_ - validating the proof should be faster than generating the proof.  
_Publicly verifiable_ - anyone should be able to validate the proof; it shouldn’t be based on some ‘secret’ that is only known to the validator.  
_Non-interactive_ - validating the proof shouldn’t require communication with any node.

### of

Sometimes a preposition is just a preposition.

### Sequential

When it comes to the time it takes to generate the proof, there should be no advantage in using parallel computing. This means basically that there are no shortcuts; generating a proof that something occurred T time units ago should roughly take... drumroll... T time units!

### Work

The way to create the required delay when generating the proof, with T as the time parameter, is by doing a CPU-intensive calculation that is composed of T-repeated iterations. By setting the number of iterations, one can schedule the time overall calculation will take.

A common application for PoSW is a timestamping scheme, which allows one to prove that a document was created at a certain point in the past. It can be used by inventors who want to protect their inventions, like in the example above, or by financial analysts who want to be able to prove that they successfully predicted a particular trend.  
In Spacemesh, we use PoSW as part of our protocol to validate that a node has allocated disk space for a certain time duration. This property allows the node to participate in "a lottery" to become eligible to add a block to the mesh. We call it **PoET - Proof of Elapsed Time**. The way it will be achieved is by having special purpose nodes, within the Spacemesh network, that will function as PoET service providers and will be incentivised to do the heavy lifting on behalf of the nodes. The PoET nodes will be implemented in a way that will allow it to utilise a single sequential work execution to serve multiple nodes at the same time. Each node in the network will be able to ask any of the PoET nodes for a proof of sequential work and to use it, along with a proof of its own unique storage commitment, to prove that he has allocated storage for a certain duration of time. 

The original construction of PoSW, as described in [\[MMV13\]](https://spacemesh.io/posw/#MMV13), uses a special type of graph called depth-robust graph - a directed acyclic graph with N vertices with low in-degree with the property that it maintains a depth of Ω(N)Ω(N) even if a constant number of vertices were removed from the graph. To prove that it has done required computational work, the prover constructs labelling of the vertices of a depth-robust graph GG, where each vertex vv should be labeled with uv=hash(uv1,...,uvd)uv=hash(uv1,...,uvd), where v1,...,vdv1,...,vd are all vertices that have edges pointing to vv. It then sends the verifier a short commitment to this labelling through a Merkle tree computed using a collision-resistant hash function. During the verification, the prover is then asked to reveal the labels of few randomly chosen vertices v along with their in-neighbors, and the verifier checks that uv=hash(uv1,...,uvd)uv=hash(uv1,...,uvd) holds for each such vertex vv. Intuitively, if the prover can pass this check for a large fraction of vertices vv, due to depth-robustness of GG, the labelling constructed by the prover must have a hash chain of length Ω(N)Ω(N), and the prover must have used time proportional to Ω(N)Ω(N) sequential evaluations of the hash function. This construction doesn’t follow the “Non-interactive” rule; the paper describes how to evolve this construction to a non-interactive protocol, which has been left outside the scope of this post. One issue with [\[MMV13\]](https://spacemesh.io/posw/#MMV13)’s construction is that it has rather high space complexity of O(T)O(T), where TT is the time period parameter, and it doesn’t scale for large TT. [\[CP18\]](https://spacemesh.io/posw/#CP18) proposes an improved PoSW, based on [\[MMV13\]](https://spacemesh.io/posw/#MMV13)‘s construction, that replaces the depth-robust graph with a graph based on a Merkle tree. In this construction the prover requires only O(log(N))O(log(N)) space.

For the purpose of our PoET service, we can also use a verifiable delay function (VDF), which is a relaxation of unique PoSW. In a VDF, the proof of challenge (x,T)(x,T) has two parts (y,π)(y,π), where yy is a deterministic function of xx that needs TT sequential time to compute, and ππ is a proof that yy was correctly computed. [\[Pie18\]](https://spacemesh.io/posw/#Pie18) introduces a VDF that when given (N,x,T)(N,x,T) where NN is a large number for which its factorisation is unknown, xx is a randomly chosen challenge and TT is the time parameter, the prover calculates y=x2T(modN)y=x2T(modN) and ππ, which a group of hints that allows the verifier to validate yy much faster than it takes to generate yy. Calculating y=x2T(modN)y=x2T(modN) is basically running TT iterations of squaring the result of the previous iteration, starting with xx. ππ is generated according to the following principle - in order to convince the verifier that y=x2T(modN)y=x2T(modN) the prover first sends μ=x2T2μ=x2T2 to the verifier. Now μ=x2T2μ=x2T2 together with y=μ2T2y=μ2T2 imply y=x2Ty=x2T. The only thing we have achieved at this point is to reduce the time parameter from TT to T2T2 at the cost of having two statements instead just one to verify. It can be shown that the verifier can merge those two statements in a randomized way into a single statement (x′,y′)=(xrμ,μry)(x′,y′)=(xrμ,μry) that satisfies y′=x′2T2y′=x′2T2 if the original statement y=x2Ty=x2T was true, but is almost certainly wrong (over the choice of the random exponent rr) if the original statement was wrong, no matter what μμ the malicious prover did send. This subprotocol is repeated log(T)log(T) times – each time halving the time parameter – until the verifier can trivially verify correctness of the claim.

Stay tuned for more posts regarding our PoET service as we move forward with implementing it. If you’re eager to learn more about our PoET implementation, or even better, if you’re eager to help us build it, please drop by [https://github.com/spacemeshos/go-spacemesh](https://github.com/spacemeshos/go-spacemesh "https://github.com/spacemeshos/go-spacemesh") and say hello.

References:  
\[MMV13\] Mohammad Mahmoody, Tal Moran, and Salil P. Vadhan. Publicly verifiable proofs of sequential work.  
\[CP18\] Bram Cohen and Krzysztof Pietrzak. Simple proofs of sequential work.  
\[Pie18\] Krzysztof Pietrzak. Simple Verifiable Delay Functions.