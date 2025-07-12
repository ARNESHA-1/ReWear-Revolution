import AddItemForm from '@/components/add-item-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt } from 'lucide-react';

export default function AddItemPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
             <Shirt className="h-8 w-8 text-primary" />
             <div>
                <CardTitle className="text-2xl font-headline">List a New Item</CardTitle>
                <CardDescription>Fill out the details below to add your clothing to the exchange.</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent>
            <AddItemForm />
        </CardContent>
      </Card>
    </div>
  );
}
