import Link from "next/link";
import { Footprints, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Footprints className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">SneakerVerse</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium mb-4 md:mb-0">
            <Link href="#" className="hover:text-foreground transition-colors">About</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            <Link href="#" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-foreground transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-foreground transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SneakerVerse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
