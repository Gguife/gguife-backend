import transporter from '../../application/config/smtp.config';

export default class SendMail {

  async run(email: string, token: string): Promise<void> {
    const verificationLink = `http://localhost:8080/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Verifique seu email',
      html:`<p>Clique no link abaixo para verificar seu email:</p>
            </br>
            <a href="${verificationLink}">${verificationLink}</a>`,
    };
    
    await transporter.sendMail(mailOptions);
  } 
}