import BigArrowLeftIcon from "@/components/icons/arrow/BigArrowLeftIcon";
import BigArrowRightIcon from "@/components/icons/arrow/BigArrowRightIcon";
import { Button } from "@nextui-org/react";

export type ArrowButtonGroupProps = {
  onClickPrev(): void;
  onClickNext(): void;
};

export function ArrowButtonGroup({
  onClickPrev,
  onClickNext,
}: ArrowButtonGroupProps) {
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button isIconOnly onClick={onClickPrev} variant="light">
        <BigArrowLeftIcon width={24} height={24} size={32} />
      </Button>
      <Button isIconOnly onClick={onClickNext} variant="light">
        <BigArrowRightIcon width={24} height={24} size={32} />
      </Button>
    </div>
  );
}
