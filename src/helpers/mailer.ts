import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // 1️⃣ generate RANDOM token
    const token = crypto.randomBytes(32).toString("hex");

    // 2️⃣ hash token using sha256 (DETERMINISTIC)
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 3️⃣ save token + expiry in DB
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    // 4️⃣ email transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // 5️⃣ email link (PLAIN token in URL)
    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${token}`
        : `${process.env.DOMAIN}/resetpassword?token=${token}`;

    // 6️⃣ mail options
    const mailOptions = {
      from: "prajyot1818@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `
        <p>
          Click <a href="${link}">here</a> to ${
            emailType === "VERIFY"
              ? "verify your email"
              : "reset your password"
          }.
          This link will expire in 1 hour.
        </p>
      `,
    };

    return await transport.sendMail(mailOptions);

  } catch (error: any) {
    throw new Error(error.message);
  }
};
