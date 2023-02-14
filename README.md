### Supply chain system using blockchain

### Setting up the frontend
1. `cd frontend`
2. Run `npm install`

### Setting up the backend
1. Open another terminal in root of the project
2. `cd backend`
3. Run `npm install` - Install all the dependencies used
4. Run `npx hardhat compile` - Compile the smart contracts
5. Run `npx hardhat run scripts/deploy.js --network goerli` - Deploy the contract to the goerli testnet
6. After succesfull deployment you will find the `deployed address`, `role contract address` and `product contract address` in terminal
7. Copy those address and paste them in `frontend/constant.js` file

### Running the project
1. `cd frontend`
2. Run `npm run dev`
3. Connect with the address that you use to deploy the contract. Then only you will get access to the `Admin Dashboard`
