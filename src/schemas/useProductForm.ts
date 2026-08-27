import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productSchema, ProductSchema } from "./productSchema";

type Props = {
  defaultVolume: string;
};

export function useProductForm({ defaultVolume }: Props) {
  const { control, handleSubmit, formState, reset } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      volume: defaultVolume,
      inventory: "",
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
