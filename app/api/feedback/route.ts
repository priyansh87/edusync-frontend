import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
    try {
        const { subject, message, email, name } = await req.json()

        // Create a transporter
        // NOTE: In a real application, use environment variables for credentials
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "ethereal.user@ethereal.email", // Replace with real credentials or env vars
                pass: "ethereal_password",
            },
        })

        // Send email
        const info = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: "support@edusync.com",
            subject: `Feedback: ${subject}`,
            text: message,
            html: `
        <h3>New Feedback Received</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        })

        console.log("Message sent: %s", info.messageId)

        return NextResponse.json({ success: true, message: "Feedback sent successfully" })
    } catch (error) {
        console.error("Error sending feedback:", error)
        return NextResponse.json({ success: false, message: "Failed to send feedback" }, { status: 500 })
    }
}
