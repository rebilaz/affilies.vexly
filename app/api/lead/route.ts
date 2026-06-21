import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { project, fullName, email, phone } = body;

        if (!project || !fullName || !email || !phone) {
            return NextResponse.json(
                { error: "Champs manquants" },
                { status: 400 }
            );
        }

        const { error } = await resend.emails.send({
            from: "Site <onboarding@vexly.fr>", // remplace par ton domaine vérifié
            to: [process.env.LEAD_TO_EMAIL || "toi@email.com"],
            subject: "Nouveau formulaire rempli",
            replyTo: email,
            html: `
        <h2>Nouveau lead reçu</h2>
        <p><strong>Nom :</strong> ${fullName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Projet :</strong></p>
        <p>${project.replace(/\n/g, "<br />")}</p>
      `,
        });

        if (error) {
            console.error("Erreur Resend:", error);
            return NextResponse.json(
                { error: "Erreur lors de l'envoi de l'email" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}