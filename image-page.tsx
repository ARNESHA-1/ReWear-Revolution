import Image from 'next/image';
import { notFound } from 'next/navigation';
import { allItems } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ShieldCheck } from 'lucide-react';

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = allItems.find(i => i.id === parseInt(params.id, 10));

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <Image
            src={item.images[0]}
            alt={item.title}
            width={800}
            height={1000}
            data-ai-hint="clothing item"
            className="w-full rounded-lg shadow-lg mb-4 object-cover"
          />
          <div className="grid grid-cols-4 gap-2">
            {item.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${item.title} thumbnail ${index + 1}`}
                width={200}
                height={250}
                data-ai-hint="clothing item"
                className="w-full rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div>
          <Badge variant="secondary" className="mb-2">{item.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{item.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={item.uploader.avatar} alt={item.uploader.name} />
                <AvatarFallback>{item.uploader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{item.uploader.name}</span>
            </div>
            <Badge variant={item.status === 'Available' ? 'default' : 'outline'} className="bg-green-100 text-green-800 border-green-300">
                <ShieldCheck className="w-4 h-4 mr-1" />
                {item.status}
            </Badge>
          </div>

          <p className="text-foreground/80 mb-6">{item.description}</p>

          <Card className="bg-primary/5 mb-6">
            <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Size:</span> {item.size}</div>
              <div><span className="font-semibold">Condition:</span> {item.condition}</div>
              <div><span className="font-semibold">Type:</span> {item.type}</div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Value:</span> 
                <Star className="w-4 h-4 text-accent fill-current" />
                <span>{item.points} pts</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(tag => (
              <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">Request Swap</Button>
            <Button size="lg" variant="outline" className="flex-1">
              Redeem with {item.points} Points
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
