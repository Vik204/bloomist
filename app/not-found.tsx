import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Page Not Found | Bloomery",
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">🌼</span>
      <h1 className="mt-6 text-4xl font-bold text-balance">We couldn&apos;t find that blossom</h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">
        The page you&apos;re looking for may have wilted away or been moved. Let&apos;s get you back to something beautiful.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/shop">Browse Flowers</Link>
        </Button>
      </div>
    </div>
  )
}
