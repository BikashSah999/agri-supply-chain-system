async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Role = await ethers.getContractFactory("Role");
  const role = await Role.deploy();

  console.log("Role deployed address:", role.address);

  const Product = await ethers.getContractFactory("Product");
  const product = await Product.deploy();

  console.log("Product deployed address:", product.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
