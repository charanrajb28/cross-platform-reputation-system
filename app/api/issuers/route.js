import { getContract } from "@/utils/web3";

export async function POST(req) {
  try {
    const { issuerAddress } = await req.json();
    const contract = await getContract();
    const tx = await contract.addIssuer(issuerAddress);
    await tx.wait();
    return Response.json({ message: "Issuer Approved!" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
