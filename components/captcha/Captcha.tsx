import React, { ForwardedRef, forwardRef } from "react";
import Reaptcha from "reaptcha";

type CaptchaSize = "compact" | "normal" | "invisible";

const recaptchaPublicSiteKey = "6LeAiFopAAAAAJNq1nUcrtnueqSPvT-H8eiCn_X3";

type CaptchaProps = {
  onValidate: (captchaCode: string) => void;
  size?: CaptchaSize;
};

export const Captcha = forwardRef(function Captcha(
  props: CaptchaProps,
  ref: ForwardedRef<Reaptcha>,
) {
  const onCaptchaVerify = async (captchaCode: string) => {
    props.onValidate(captchaCode);
  };

  return (
    <Reaptcha
      ref={ref}
      size={props.size ?? "normal"}
      sitekey={recaptchaPublicSiteKey}
      onVerify={onCaptchaVerify}
    />
  );
});
