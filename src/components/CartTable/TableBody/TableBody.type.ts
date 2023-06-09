type CustomTableCellProps = {
    text: string | number
}

type CombinedShopCartItems = {
    id: number
    title: string
    price: number
    quantityAvailable: number
    preview: string
    quantity: number
}

type TableBodyProps = {
    rows: Array<CombinedShopCartItems>
    handleOnClick: (id: number) => void
}
