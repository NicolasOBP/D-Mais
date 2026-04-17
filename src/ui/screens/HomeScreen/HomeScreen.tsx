import { useRef, useState } from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { LinearTransition } from "react-native-reanimated";

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
  const flatListRef = useRef(null);

  useScrollToTop(flatListRef);

  function onAddCart() {
    showModal({ title: "Litros" });
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

      <Animated.FlatList
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
        itemLayoutAnimation={LinearTransition.duration(500)}
        ref={flatListRef}
      />
    </Screen>
  );
}
