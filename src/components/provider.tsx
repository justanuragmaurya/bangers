import { ThemeProvider } from "@/components/theme-provider"

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}