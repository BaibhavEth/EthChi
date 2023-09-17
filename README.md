# Vito Chain L-3 chain with Orbit Integration

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting Up the Orbit Chain](#setting-up-the-orbit-chain)
- [Frontend Setup: `index.html`](#frontend-setup-indexhtml)
- [Interacting with the Orbit Chain](#interacting-with-the-orbit-chain)
- [Logging and Monitoring](#logging-and-monitoring)

## Introduction

This documentation covers a supply chain app that utilizes the Orbit chain for backend logic. The main frontend is handled through an `index.html` file.

---

## Prerequisites

- Node.js and Yarn
- Docker
- Configured wallet with Ethereum-based tokens
- Cloned repository of `https://github.com/OffchainLabs/orbit-setup-script`

---

## Setting Up the Orbit Chain

### Step 1: Clone and Install Dependencies

```bash
git clone https://github.com/OffchainLabs/orbit-setup-script.git
cd orbit-setup-script
yarn install
docker-compose up -d
PRIVATE_KEY="0xYourPrivateKey" L2_RPC_URL="https://goerli-rollup.arbitrum.io/rpc" L3_RPC_URL="http://localhost:8449" yarn run setup
```
### Step 2: Frontend Setup
```bash
const web3 = new Web3('http://localhost:8449');
web3.eth.getBlockNumber().then(console.log);
```
