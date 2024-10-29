import { FaucetDescription } from "@/tizz-trade-components/FaucetWidgets/FaucetDescription";
import { FaucetRequest } from "@/tizz-trade-components/FaucetWidgets/FaucetRequest";

export default function Page() {
  return (
    <div className="flex gap-10">
      <FaucetDescription />
      <FaucetRequest />
    </div>
  );
}
