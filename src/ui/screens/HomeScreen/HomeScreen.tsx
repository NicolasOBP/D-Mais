import { useState } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native";

import { Product, useProductsList } from "@domain";
import { useDebounce } from "@utils";

import { SearchBar } from "@components";
import { Screen, useModal } from "@containers";
import { useAppTheme } from "@theme";

import { ProductCard } from "./components/ProductCard/ProductCard";
export function HomeScreen() {
  const { spacing } = useAppTheme();
  const [searchText, setSearchText] = useState("");
  const searchDebounced = useDebounce(searchText);
  const { products, isLoading, refetch } = useProductsList(searchDebounced);
  const { showModal } = useModal();

  function onAddCart() {
    showModal();
  }

  function renderItem({ item }: ListRenderItemInfo<Product>) {
    return (
      <ProductCard
        onAddCart={onAddCart}
        id={item.id}
        price={item.price}
        title={item.title}
      />
    );
  }

  return (
    <Screen>
      <SearchBar
        placeholder="Buscar combustível"
        onChangeText={setSearchText}
        searchText={searchText}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: spacing.s20,
          paddingTop: spacing.s24,
          paddingBottom: spacing.s14,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </Screen>
  );
}
