import nodemailer from "nodemailer";
import { mailService } from "../config/config";

interface IMailInformation{
to:string,
subject:string,
text:string
}
const sendMail = async (mailInformation:IMailInformation) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailService.email,
      pass: mailService.pass,
    },
  });

  const mailFormatObject = {
    from: "ShikshaSass<thapabiplav02@gmail.com>",
    to:mailInformation.to,
    subject: mailInformation.subject,
    text: mailInformation.text,
  };
  
  try {
    await transporter.sendMail(mailFormatObject);
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
