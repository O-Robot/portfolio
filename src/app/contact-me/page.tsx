"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent! 🚀",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-black ">
      {" "}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s discuss how we can
              create something amazing together.
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
                  <CardTitle className="text-white flex items-center gap-2">
                    💬 Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="glass-morphism border-white/20 text-white placeholder:text-white/50 min-h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 hover:animate-glow"
                      size="lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
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
                  <CardTitle className="text-white flex items-center gap-2">
                    📞 Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-cyan-400" />
                    <span className="text-white/80">
                      hey@ogooluwaniadewale.com
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">+1 </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-400" />
                    <span className="text-white/80">San Francisco, CA</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    🤖 AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-sm">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-white/80 text-sm">
                          Hi! I&apos;m Robot. I can help answer questions about
                          Ogooluwa&apos;s experience, schedule meetings, or
                          provide project details. What would you like to know?
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white cursor-pointer hover:bg-white/20"
                      >
                        Tell me about John&apos;s experience
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white cursor-pointer hover:bg-white/20"
                      >
                        What technologies does he use?
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white cursor-pointer hover:bg-white/20"
                      >
                        Schedule a meeting
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    🌐 Connect Online
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "GitHub",
                        icon: "🐙",
                        color: "hover:text-gray-400",
                      },
                      {
                        name: "LinkedIn",
                        icon: "💼",
                        color: "hover:text-blue-400",
                      },
                      {
                        name: "Twitter",
                        icon: "🐦",
                        color: "hover:text-cyan-400",
                      },
                      {
                        name: "Discord",
                        icon: "🎮",
                        color: "hover:text-purple-400",
                      },
                    ].map((social) => (
                      <motion.a
                        key={social.name}
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 p-3 rounded-lg glass-morphism border border-white/10 text-white/80 transition-colors ${social.color}`}
                      >
                        <span className="text-lg">{social.icon}</span>
                        <span>{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
