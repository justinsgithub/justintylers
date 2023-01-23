/* eslint-disable */
import { createContext, useContext } from "react"


interface IColorModeContext {
  toggle_color_mode: () => void
  mode: 'light' | 'dark' | undefined
}

export const ColorModeContext = createContext<IColorModeContext>({ toggle_color_mode: () => {}, mode: 'light' })

export const useColorMode = () => useContext(ColorModeContext)
