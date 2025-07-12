import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Recycle, Shirt, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import ItemCard from '@/components/ItemCard';
import { featuredItems } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
           <Image
            src="https://thumbs.dreamstime.com/b/recycling-concept-problem-ecology-environmental-pollution-background-plastic-bottles-transparent-blue-net-cen-83208480.jpg"
            alt="Clothing on a rack"
            data-ai-hint="clothing rack"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            ReWear Revolution
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Join the movement. Exchange pre-loved clothes, reduce waste, and
            refresh your style sustainably.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/add-item">
                List an Item <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link href="/#featured">Browse Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <Shirt className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. List Your Clothes</h3>
              <p className="text-foreground/70">
                Upload photos and details of items you no longer wear.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Swap or Earn</h3>
              <p className="text-foreground/70">
                Exchange directly with others or earn points for your items.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <Recycle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get New Styles</h3>
              <p className="text-foreground/70">
                Use your points or swap items to find new-to-you treasures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section id="featured" className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Featured Items</h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredItems.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ItemCard item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
