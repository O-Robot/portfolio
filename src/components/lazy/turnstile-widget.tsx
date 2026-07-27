"use client";

import type { TurnstileInstance } from "@marsidev/react-turnstile";
import type { Ref } from "react";
import dynamic from "next/dynamic";

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((mod) => mod.Turnstile),
  {
    ssr: false,
  },
);

type TurnstileWidgetProps = {
  onError: () => void;
  onExpire: () => void;
  onSuccess: (token: string) => void;
  siteKey: string;
  turnstileRef: Ref<TurnstileInstance | null>;
};

export default function TurnstileWidget({
  onError,
  onExpire,
  onSuccess,
  siteKey,
  turnstileRef,
}: TurnstileWidgetProps) {
  return (
    <Turnstile
      ref={turnstileRef}
      siteKey={siteKey}
      options={{
        size: "invisible",
      }}
      onSuccess={onSuccess}
      onExpire={onExpire}
      onError={onError}
    />
  );
}
