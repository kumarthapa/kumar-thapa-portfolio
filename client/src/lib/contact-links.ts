export type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
};

export function isValidOptionalPhoneNumber(
  phone: string,
): boolean {
  const value = phone.trim();
  if (!value || value === "+91") return true;
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;

  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

export function buildContactMessage(details: ContactDetails): string {
  return [
    "Project inquiry from KUMARTHAPA portfolio",
    "",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone || "Not provided"}`,
    `Company: ${details.company || "Not provided"}`,
    `Service/category: ${details.services.length ? details.services.join(", ") : "Not selected"}`,
    `Budget: ${details.budget || "Not provided"}`,
    `Ideal start date: ${details.timeline || "Not provided"}`,
    "",
    "Project description:",
    details.message,
  ].join("\n");
}

export function buildWhatsAppUrl(
  recipientNumber: string,
  message: string,
): string | null {
  const number = recipientNumber.replace(/^\+/, "");
  if (!/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(
  recipientEmail: string,
  subject: string,
  message: string,
): string {
  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
