'use client';

import Link from 'next/link';
import { Recycle, Menu, X, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useState } from 'react';
import { Separator } from './ui/separator';

const NavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => (
  <nav className={className}>
    <Link href="/#featured" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" onClick={onLinkClick}>
      Browse
    </Link>
    <Link href="/add-item" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" onClick={onLinkClick}>
      List an Item
    </Link>
    <Link href="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" onClick={onLinkClick}>
      Dashboard
    </Link>
    <Link href="/admin" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors" onClick={onLinkClick}>
      Admin
    </Link>
  </nav>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Recycle className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-headline text-primary">ReWear</span>
            </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks className="flex items-center gap-6" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-accent/20 text-accent-foreground font-bold py-1.5 px-3 rounded-full">
                <Star className="w-5 h-5 fill-accent" />
                <span className="text-sm">0 pts</span>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <Recycle className="h-7 w-7 text-primary" />
                    <span className="font-bold text-xl font-headline text-primary">ReWear</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                      </Button>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-6 py-6">
                  <NavLinks className="flex flex-col gap-4" onLinkClick={closeMenu} />
                </div>
                <div className="mt-auto border-t pt-6 flex flex-col gap-2">
                   <div className="flex items-center justify-center gap-2 bg-accent/20 text-accent-foreground font-bold py-1.5 px-3 rounded-full mb-2">
                      <Star className="w-5 h-5 fill-accent" />
                      <span className="text-sm">0 pts</span>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/login" onClick={closeMenu}>Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup" onClick={closeMenu}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
