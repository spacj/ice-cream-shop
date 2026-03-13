// Email notification service using Nodemailer or SendGrid
// This utility helps send notifications when forms are submitted

import nodemailer from 'nodemailer';

/**
 * Send email notification for new inquiry
 * Requires email service configuration (SendGrid, Gmail, etc.)
 */
export const sendInquiryNotification = async (inquiryData) => {
  try {
    // Configure your email service here
    // Example using Gmail (requires App Password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry: ${inquiryData.subject}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>From:</strong> ${inquiryData.name}</p>
        <p><strong>Email:</strong> ${inquiryData.email}</p>
        <p><strong>Subject:</strong> ${inquiryData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${inquiryData.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Inquiry notification sent');
    return true;
  } catch (error) {
    console.error('Error sending inquiry notification:', error);
    return false;
  }
};

/**
 * Send email notification for new job application
 */
export const sendApplicationNotification = async (applicationData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Job Application: ${applicationData.position}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${applicationData.position}</p>
        <p><strong>Name:</strong> ${applicationData.fullName}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> ${applicationData.phone}</p>
        <p><strong>Experience:</strong> ${applicationData.experience} years</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${applicationData.coverLetter.replace(/\n/g, '<br>')}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Application notification sent');
    return true;
  } catch (error) {
    console.error('Error sending application notification:', error);
    return false;
  }
};

/**
 * Send confirmation email to user
 */
export const sendConfirmationEmail = async (userEmail, type = 'inquiry') => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const messages = {
      inquiry: {
        subject: 'We received your inquiry - Gelato Luxe',
        text: 'Thank you for reaching out! We\'ll get back to you soon.',
      },
      application: {
        subject: 'Application received - Gelato Luxe',
        text: 'Thank you for applying! We\'ll review your application and be in touch.',
      },
    };

    const msg = messages[type] || messages.inquiry;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: msg.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Gelato Luxe</h1>
          <p>Dear Customer,</p>
          <p>${msg.text}</p>
          <p>We appreciate your interest in Gelato Luxe and look forward to serving you soon.</p>
          <p>Best regards,<br>The Gelato Luxe Team</p>
          <hr>
          <p style="color: #999; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent');
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

/**
 * SendGrid alternative (if using SendGrid instead of Nodemailer)
 * Uncomment to use SendGrid instead
 */
/*
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendInquiryNotification = async (inquiryData) => {
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `New Inquiry: ${inquiryData.subject}`,
    html: `...html content...`,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};
*/
