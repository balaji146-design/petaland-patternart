import Contact from "../models/Contact.js";
import emailService from "../services/emailService.js";

export async function sendContactMessage(req, res, next) {
  try {
    const { name, mobile, email, message } = req.body;

    if (!name || !mobile || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, email and message are all required",
      });
    }

    const contact = await Contact.create({ name, mobile, email, message });

    try {
      await emailService.sendContactFormEmail({ name, mobile, email, message });
    } catch (emailError) {
      console.error("Contact email notification failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAllMessages(req, res, next) {
  try {
    const messages = await Contact.getAll();

    return res.status(200).json({
      success: true,
      message: "Contact messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  sendContactMessage,
  getAllMessages,
};