import { permanentRedirect } from "next/navigation";

export default function ContactMeRedirectPage() {
  permanentRedirect("/contact");
}
