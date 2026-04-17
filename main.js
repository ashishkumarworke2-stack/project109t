const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=70da5c4d-b87b-4842-bfd5-a9977e4aed1c";
const TOKEN_MINT = "B7aNmmvPANVuqKgnEMAJzY6sUB6pcebZCxWUqzvApump";

async function testConnection() {
  try {
    const connection = new solanaWeb3.Connection(RPC_URL, 'confirmed');
    console.log("Connection established.");

    // Test block height
    const blockHeight = await connection.getBlockHeight();
    console.log("Block height:", blockHeight);

    // Test token mint
    const mintPubkey = new solanaWeb3.PublicKey(TOKEN_MINT);
    const mintInfo = await splToken.getMint(connection, mintPubkey);
    console.log("Mint info:", mintInfo);

    // Test getProgramAccounts for token accounts
    const TOKEN_PROGRAM_ID = new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    const filters = [
      { dataSize: 165 },
      { memcmp: { offset: 0, bytes: TOKEN_MINT } }
    ];
    console.log("Attempting to get token accounts (this may take a while)...");
    const accounts = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, { filters });
    console.log("Number of token accounts:", accounts.length);

  } catch (error) {
    console.error("Error:", error);
  }
}

testConnection();
