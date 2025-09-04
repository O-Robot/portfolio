import { Console } from "./constants";

export const GA_MEASUREMENT_ID = "G-1JV5XE6QBL";

export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    Console.log("GA pageview", url);
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== "undefined") {
    Console.log("GA event", { action, category, label, value });
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
