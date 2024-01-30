export const getShopItems = (state: ShopItemsState) => state.items

export const getItemById = (shopItems: ShopItemsState, id: number) =>
  shopItems.items.find(e => e.id == id)