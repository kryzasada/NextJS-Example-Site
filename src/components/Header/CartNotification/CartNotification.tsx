import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { useStoreSelector } from '@/hooks/useStore'
import { getItemById } from '@/selectors/shopItemsSelector'
import { normalizePrice } from '@/functions/price'
import style from './CartNotification.module.sass'


export default function CartNotification(props: CartNotificationProps) {

  useEffect(() => {
    const interval = setInterval(() => {
      props.closeHandle()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [props.open === true])

  return <>
    {props.open && <Notification {...props} />}
  </>
}

const Notification = (props: CartNotificationProps) => {
  const { quantity, id } = props.itemData
  const { title, preview, price } = useStoreSelector(e => getItemById(e.shopItems, id)) as ShopItem
  const height = document.body.scrollHeight - 20

  return <Box
    className={style.box}
    sx={{ height: height }}
  >
    <Link href="/cart">
      <Box className={style.small} />
    </Link>

    <Box className={style.space} />

    <Box className={style.big}>
      <Link href="/cart">
        <Typography
          gutterBottom
          color="text.primary"
          className={style.title}
        >
          Added to your cart
        </Typography>

        <Box className={style.description}>
          <Box className={style.product_image}>
            <Image
              fill
              src={preview}
              alt={title} />
          </Box>

          <Box className={style.product_description}>
            {title}
            <span>
              {quantity} kg
            </span>
          </Box>

          <Box className={style.product_price}>
            ${normalizePrice(quantity * price)}
          </Box>
        </Box>
      </Link>
    </Box>

  </Box >
}