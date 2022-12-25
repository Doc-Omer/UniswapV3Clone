async function main(){
    const [owner, signer2] = await ethers.getSigners();

    Hulk = await ethers.getContractFactory("Hulk", owner);
    hulk = await Hulk.deploy();

    Batman = await ethers.getContractFactory("Batman", owner);
    batman = await Batman.deploy();

    Strange = await ethers.getContractFactory("Strange", owner);
    strange = await Strange.deploy();

    // await Hulk.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));
    // await batman.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"));
    // await strange.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"))

    console.log("Hulk address: ", hulk.address);
    console.log("Batman address", batman.address);
    console.log("Strange address", strange.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })


    // Hulk address:  0x12456Fa31e57F91B70629c1196337074c966492a
    // Batman address 0xce830DA8667097BB491A70da268b76a081211814
    // Strange address 0xD5bFeBDce5c91413E41cc7B24C8402c59A344f7c