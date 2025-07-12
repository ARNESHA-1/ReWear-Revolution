import Link from 'next/link';
import { Recycle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Recycle className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl font-headline text-primary">ReWear</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-0">
            <Link href="/#featured" className="text-sm text-foreground/80 hover:text-primary">
              Browse
            </Link>
            <Link href="/add-item" className="text-sm text-foreground/80 hover:text-primary">
              List Item
            </Link>
            <Link href="/dashboard" className="text-sm text-foreground/80 hover:text-primary">
              Dashboard
            </Link>
            <Link href="#" className="text-sm text-foreground/80 hover:text-primary">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} ReWear Revolution. All rights reserved.</p>
          <p>Promoting sustainable fashion, one swap at a time.</p>
        </div>
      </div>
    </footer>
  );
}
