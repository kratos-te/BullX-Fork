import { SlotsToClasses } from "@nextui-org/theme";
import { ClassValue } from "tailwind-variants";

import { twMerge } from "tailwind-merge";

export function mergeClassNames<T extends string>(
  classNamesA?: SlotsToClasses<T>,
  classNamesB?: SlotsToClasses<T>,
): SlotsToClasses<T> {
  const mergedClassNames: SlotsToClasses<T> = {};

  if (classNamesA) {
    Object.keys(classNamesA).forEach((key) => {
      mergedClassNames[key as keyof SlotsToClasses<T>] = classNamesA[
        key as keyof typeof classNamesA
      ] as ClassValue;
    });
  }

  if (classNamesB) {
    Object.keys(classNamesB).forEach((key) => {
      mergedClassNames[key as keyof SlotsToClasses<T>] = twMerge(
        mergedClassNames[key as keyof SlotsToClasses<T>],
        classNamesB[key as keyof typeof classNamesA],
      ) as ClassValue;
    });
  }

  return mergedClassNames;
}
