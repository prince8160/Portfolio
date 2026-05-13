import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Run once on mount to set initial state correctly without firing state synchronously
    // in normal case this is safe but linter complains. We can just use mql.matches
    if (isMobile === undefined) {
       setIsMobile(mql.matches)
    }
    return () => mql.removeEventListener("change", onChange)
  }, [isMobile])

  return !!isMobile
}
