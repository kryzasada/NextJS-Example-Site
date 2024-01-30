import Link from 'next/link'
import { Box, Grid } from "@mui/material"
import Image from 'next/image'
import useRouterHref from "@/hooks/useRouterHref"
import CartWithNumber from "./CartWithNumber/CartWithNumber"
import style from './Header.module.sass'

export default function Header(props: HeaderProps) {
    const isHomePage = useRouterHref("/")
    const isCartPage = useRouterHref("/cart")

    const LogoImage = () => (
        <Box className={style.img}>
            <Image
                fill
                alt={props.logoAlt}
                src={props.logoSrc}
                priority={true}
            />
        </Box>
    )

    return (
        <Grid
            component="header"
            container
            className={style.grid}
        >
            {
                isHomePage
                    ?
                    <LogoImage />
                    :
                    <Link
                        href="/"
                        className={style.link}
                    >
                        <LogoImage />
                    </Link>
            }

            <CartWithNumber disabledNotification={!isCartPage} />
        </Grid>
    )
}