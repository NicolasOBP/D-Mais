import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cartSchema, CartSchema } from "./cartSchema";

type Props = {
  defaultVolume: string;
};

export function useProductForm({ defaultVolume }: Props) {
  const { control, handleSubmit, formState, reset } = useForm<CartSchema>({
    resolver: zodResolver(cartSchema),
    defaultValues: {
      volume: defaultVolume,
    },
    mode: "onChange",
  });

  return {
    control,
    handleSubmit,
    formState,
    reset,
  };
}
