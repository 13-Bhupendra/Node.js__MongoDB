import OTP from "../model/OTP_Model.js";
import { generateOtp } from "../utils/OTP_generate.js";
import { transporter } from "../services/mail_service.js";
import dotenv from "dotenv"

dotenv.config()

export const sentOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 2);

  try {
    await transporter.sendMail({
      from: `OTP Verification ! <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP Sent !",
      text: `Your otp for verification is ${otp}, valid upto 2 minutes`,
    });

    const result = await OTP.create({ email, otp, expiresAt });
    res.status(200).json({ message: "OTP sent successfully !", result });
  } catch (error) {
    res.status(500).json({ message: "OTP Not sent !", error });
  }
};

export const varifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await OTP.findOne({ email, otp });

  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (record.expiresAt < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  await OTP.deleteMany({ email });
  res.status(200).json({ message: "OTP verified successfully" });
};
