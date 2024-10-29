import { Captcha } from "@/components/captcha/Captcha";

type CaptchaStepProps = {
  onNext: (captchaCode: string) => void;
};

export function CaptchaStep({ onNext }: CaptchaStepProps) {
  const onVerify = (recaptchaResponse: string) => {
    if (recaptchaResponse && recaptchaResponse.trim().length > 0) {
      onNext(recaptchaResponse);
    }
  };

  return (
    <div className="w-full">
      <Captcha onValidate={onVerify} size="normal" />
    </div>
  );
}
