"use client";
import TurnstileWidget from "@/components/lazy/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPhone } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import contact from "@/data/contact.json";
import { useToast } from "@/hooks/use-toast";
import { event } from "@/utils/gtag";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { motion } from "framer-motion";
import {
  Loader,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Send,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

const CalendlyWidget = dynamic(
  () => import("@/components/lazy/calendly-widget"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-175 rounded-2xl glass-morphism border border-white/20" />
    ),
  },
);

export default function ContactPage() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    subject: "",
    email: "",
    message: "",
    subscribe: false,
  });
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const connect = ["Github", "LinkedIn"];

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "Please enter your first name.";
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Please enter your last name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = "Please include a subject.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please type your message.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm();

    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("Please correct the highlighted fields and try again.");
      toast({
        title: "Almost there",
        description: Object.values(nextErrors)[0],
        variant: "destructive",
      });
      return;
    }

    if (!captchaToken) {
      setStatusMessage(
        "Completing security check before sending your message.",
      );
      turnstileRef.current?.execute();
      return;
    }

    setLoading(true);
    setStatusMessage("Sending your message.");

    event({
      action: "submit",
      category: "Contact Form",
      label: "Message Form",
    });

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      if (!res.ok) {
        toast({
          title: "Oops! ❌",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }

      if (formData.subscribe) {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        });
      }

      toast({
        title: "Message sent! 🚀",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      setStatusMessage("Your message has been sent successfully.");
      setFormErrors({});

      setCaptchaToken("");
      turnstileRef.current?.reset();

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        subject: "",
        subscribe: false,
      });
    } catch (err) {
      console.error(err);
      setCaptchaToken("");
      turnstileRef.current?.reset();
      toast({
        title: "Error ⚡",
        description: "Network issue, please try again.",
        variant: "destructive",
      });
      setStatusMessage("There was a network issue. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-background">
      {" "}
      <section
        id="contact"
        className="py-20 relative"
        aria-labelledby="contact-page-title"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              id="contact-page-title"
              className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text"
            >
              Contact
            </h1>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s discuss how we can
              build something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-primary-text flex items-center gap-2">
                    💬 Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6 ">
                    <p className="sr-only" aria-live="polite">
                      {statusMessage}
                    </p>
                    <div className="flex gap-4">
                      <label htmlFor="firstName" className="sr-only">
                        First name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        name={"firstName"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="glass-morphism border-white/20 text-primary-text/80 placeholder:text-primary-text/50"
                        autoComplete="given-name"
                        aria-invalid={Boolean(formErrors.firstName)}
                        aria-describedby={
                          formErrors.firstName ? "firstName-error" : undefined
                        }
                      />
                      <label htmlFor="lastName" className="sr-only">
                        Last name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        name={"lastName"}
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-primary-text/80 placeholder:text-primary-text/50"
                        autoComplete="family-name"
                        aria-invalid={Boolean(formErrors.lastName)}
                        aria-describedby={
                          formErrors.lastName ? "lastName-error" : undefined
                        }
                      />
                    </div>
                    <p id="firstName-error" className="sr-only">
                      {formErrors.firstName}
                    </p>
                    <p id="lastName-error" className="sr-only">
                      {formErrors.lastName}
                    </p>

                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-primary-text/80 placeholder:text-primary-text/50"
                        autoComplete="email"
                        inputMode="email"
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={
                          formErrors.email ? "email-error" : undefined
                        }
                      />
                      <p id="email-error" className="sr-only">
                        {formErrors.email}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="phone" className="sr-only">
                        Phone number
                      </label>
                      <InputPhone
                        id="phone"
                        placeholder="Your Phone Number"
                        defaultCountry="NG"
                        value={formData.phone}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            phone: value ?? "",
                          })
                        }
                        className="glass-morphism border-white/20 text-primary-text/80 placeholder:text-primary-text/50"
                        autoComplete="tel"
                        aria-invalid={Boolean(formErrors.phone)}
                        aria-describedby={
                          formErrors.phone ? "phone-error" : undefined
                        }
                      />
                      <p id="phone-error" className="sr-only">
                        {formErrors.phone}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="subject" className="sr-only">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-primary-text/80 placeholder:text-primary-text/50"
                        autoComplete="off"
                        aria-invalid={Boolean(formErrors.subject)}
                        aria-describedby={
                          formErrors.subject ? "subject-error" : undefined
                        }
                      />
                      <p id="subject-error" className="sr-only">
                        {formErrors.subject}
                      </p>
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="sr-only">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-primary-text/80 placeholder:text-primary-text/50 min-h-32"
                        autoComplete="off"
                        aria-invalid={Boolean(formErrors.message)}
                        aria-describedby={
                          formErrors.message ? "message-error" : undefined
                        }
                      />
                      <p id="message-error" className="sr-only">
                        {formErrors.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.subscribe}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subscribe: e.target.checked,
                          })
                        }
                        id="subscribe"
                        className="cursor-pointer accent-accent"
                      />
                      <label
                        htmlFor="subscribe"
                        className="text-primary-text/80 cursor-pointer"
                      >
                        Subscribe
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <TurnstileWidget
                        turnstileRef={turnstileRef}
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={(token) => setCaptchaToken(token)}
                        onExpire={() => {
                          setCaptchaToken("");
                          setStatusMessage(
                            "Security check expired. Please try again.",
                          );
                        }}
                        onError={() => {
                          setStatusMessage(
                            "Captcha failed. Please refresh and try again.",
                          );
                          toast({
                            title: "Captcha failed",
                            description: "Please refresh and try again.",
                            variant: "destructive",
                          });
                        }}
                      />
                    </div>

                    <Button
                      type="submit"
                      aria-busy={loading}
                      className="w-full glass-morphism  text-primary-text/80 hover:text-primary hover:animate-glow"
                      size="lg"
                    >
                      {loading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <>
                          {" "}
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Contact Information */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className=" flex items-center gap-2 text-primary-text">
                    📞 Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-cyan-400" />
                    <a
                      href={`mailto:${contact.mail}`}
                      className="text-primary-text/80  hover:text-link-active transition-colors"
                    >
                      {contact.mail}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                    <a
                      href={`https://wa.me/${contact.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-text/80  hover:text-link-active transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-400" />
                    <span className="text-primary-text/80">
                      {contact.location}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              {/* <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary-text">
                    🤖 AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/40 to-primary flex items-center justify-center text-sm">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-primary-text/80 text-sm">
                          Hi! I&apos;m Robot. I can help answer questions about
                          Ogooluwa&apos;s experience, schedule meetings, or
                          provide project details. What would you like to know?
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-link-active/10 text-primary-text/80  cursor-pointer hover:bg-white/20"
                      >
                        Tell me about John&apos;s experience
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-link-active/10 text-primary-text/80  cursor-pointer hover:bg-white/20"
                      >
                        What technologies does he use?
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-link-active/10 text-primary-text/80  cursor-pointer hover:bg-white/20"
                      >
                        Schedule a meeting
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              {/* Contact Information */}
              <Card className="glass-morphism border-white/20 flex justify-center items-center p-0 py-3 px-5">
                <CardContent className="w-full">
                  <Button
                    type="submit"
                    className="w-full glass-morphism  hover:animate-glow"
                    size="lg"
                    onClick={() =>
                      window.open(
                        "https://forms.visme.co/fv/q74g8wwe-179ngw",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <Pencil className="mr-2 h-5 w-5" />
                    Write a Review
                  </Button>
                </CardContent>
              </Card>
              {/* Social Links */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-primary-text flex items-center gap-2">
                    🌐 Connect Online
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {contact.socialMediaLinks
                      .filter((link) => connect.includes(link.name))
                      .map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.link}
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 p-3 rounded-lg glass-morphism border text-primary-text/80  cursor-pointer hover:bg-white/20 transition-colors ${social.color}`}
                        >
                          <Icon
                            icon={social.icon}
                            aria-hidden="true"
                            className="transition-transform hover:scale-110"
                          />
                          <span>{social.name}</span>
                        </motion.a>
                      ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-morphism border-white/20">
                <CardContent className="pt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className="glass-morphism hover:animate-glow"
                    asChild
                  >
                    <Link href="/resume">Review Résumé</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          {/* Schedule a Meeting */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold iquid-gradient text-primary-text">
              Schedule a Call
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto py-10 w-full lg:w-1/2 ">
            <CalendlyWidget url="https://calendly.com/ogooluwaniadewale/" />
          </div>
        </div>
      </section>
    </div>
  );
}
