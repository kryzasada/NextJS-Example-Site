import { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Box } from "@mui/material"
import { useStoreSelector } from '@/hooks/useStore'
import CartNotification from '@/components/Header/CartNotification/CartNotification'
import { CartWithNumberProps } from './CartWithNumber.types'
import style from './CartWithNumber.module.sass'
import Link from 'next/link'

export default function CartWithNumber({ disabledNotification = true }: CartWithNumberProps) {
    const [openCartNotification, setOpenCartNotification] = useState<boolean>(false)
    const countQuantity = useStoreSelector((state) => state.cartItems.selected.length)
    const selectedItems = useStoreSelector((state) => state.cartItems.selected)
    const [defaultSelectedItems, setDefaultSelectedItems] = useState(selectedItems)
    const [notificationSelectData, setNotificationSelectData] = useState<ShopCartItem>()

    useEffect(() => {
        if (selectedItems !== defaultSelectedItems && disabledNotification) {
            if (openCartNotification) {
                setOpenCartNotification(false)
                setTimeout(() => setOpenCartNotification(true), 100);
            } else {
                setOpenCartNotification(true)
            }
            setDefaultSelectedItems(selectedItems)
            const notificationData = getNotificationData(selectedItems, defaultSelectedItems)
            setNotificationSelectData(notificationData[0])
        }
    }, [selectedItems])

    const closeCartNotificationHandle = () => setOpenCartNotification(false)

    return (
        <Box className={style.box}>
            <Link href="/cart">
                <ShoppingCartIcon
                    fontSize="large"
                    className={style.icon}
                />
            </Link>

            <Box className={style.counter}>
                {countQuantity}
            </Box>

            {
                notificationSelectData &&
                <CartNotification
                    open={openCartNotification}
                    itemData={notificationSelectData}
                    closeHandle={closeCartNotificationHandle}
                />

            }
        </Box>
    )
}

const getNotificationData = (selectedItems: ShopCartItem[], defaultSelectedItems: ShopCartItem[]) =>
    selectedItems.filter(x => !defaultSelectedItems.includes(x))




