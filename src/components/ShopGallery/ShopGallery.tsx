import React, { useEffect } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import { useStoreSelector, useStoreDispatch } from '@/hooks/useStore'
import { add } from '@/reducers/shopItemsReducer'
import ShopItemCard from './ShopItemCard/ShopItemCard'
import style from './ShopGallery.module.sass'


export default function ShopGallery() {
    const shopItems = useStoreSelector(state => state.shopItems.items)
    const dispatch = useStoreDispatch()

    useEffect(() => {
        if (shopItems.length == 0)
            fetch('/api/shop')
                .then((res) => res.json())
                .then((data) => {
                    dispatch(add(data))
                })
    }, [])

    return (
        <Grid className={style.grid}>
            {
                shopItems.length == 0
                    ? <CircularProgress
                        color="warning"
                        className={style.progress}
                    />
                    : shopItems.map((item) => (
                        <ShopItemCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={Number(item.price)}
                            quantityAvailable={Number(item.quantityAvailable)}
                            preview={item.preview}
                        ></ShopItemCard>
                    ))
            }
        </Grid>
    )
}