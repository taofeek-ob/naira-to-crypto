import Flutterwave from "flutterwave-node-v3";

if (!process.env.FLW_PUBLIC_KEY || !process.env.FLW_SECRET_KEY) {
  throw new Error("Flutterwave API keys are not set in the environment variables");
}

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export const createVirtualAccount = async ({ email, bvn, name }) => {
  const nameParts = name.trim().split(/\s+/); // Split by one or more spaces
  const [firstName, lastName] = [nameParts[0], nameParts[nameParts.length - 1]];
  const details = {
    email,
    is_permanent: "true",
    bvn,
    firstname: firstName,
    lastname: lastName,
  };

  try {
    const response = await flw.VirtualAcct.create(details);
    console.log("Virtual Account Created: ", response);
    return response;
  } catch (error) {
    console.error("Error creating virtual account: ", error);
  }
};
