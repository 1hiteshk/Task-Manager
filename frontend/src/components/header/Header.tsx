'use client'

import { Flex } from "@chakra-ui/react"
import Image from "next/image"
import UserDropdown from "./UserDropdown"
import Link from "next/link"

type Props = {}

const Header = (props: Props) => {
  return (
    <Flex p={'20px 40px'} height={'80px'} alignItems={'center'} justifyContent={'space-between'} bgColor={'#e5eafc'}>
        <Link href={`/projects`}><Image src={'/images/projects.png'} alt="project" width={150} height={80} /></Link>
        <UserDropdown/>
        {/*  */}
    </Flex>
  )
}

export default Header