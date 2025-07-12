
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Star, Edit } from 'lucide-react';
import { userItems, swaps } from '@/lib/mock-data';
import ItemCard from '@/components/ItemCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column: Profile */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold font-headline">Arnesha Shailesh</h2>
              <p className="text-muted-foreground">Joined July 2025</p>
              <div className="mt-4 flex justify-center items-center gap-2 bg-primary/10 text-primary font-bold py-2 px-4 rounded-full">
                <Star className="w-5 h-5 fill-current" />
                <span>0 Points</span>
              </div>
              <Button variant="outline" className="w-full mt-6">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="my-items">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="my-items">My Items</TabsTrigger>
                <TabsTrigger value="swaps">My Swaps</TabsTrigger>
              </TabsList>
              <Button asChild>
                <Link href="/add-item">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Link>
              </Button>
            </div>
            
            <TabsContent value="my-items">
              <Card>
                <CardHeader>
                  <CardTitle>My Listed Items</CardTitle>
                  <CardDescription>
                    Items you've listed for swapping.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userItems.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userItems.map(item => <ItemCard key={item.id} item={item} />)}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">You haven't listed any items yet.</p>
                        <Button variant="link" asChild><Link href="/add-item">List your first item</Link></Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="swaps">
              <Card>
                <CardHeader>
                  <CardTitle>Swap History</CardTitle>
                  <CardDescription>
                    Your ongoing and completed swaps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Offered</TableHead>
                        <TableHead>Item Requested</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {swaps.map(swap => (
                        <TableRow key={swap.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                             <Image src={swap.itemOffered.image} alt={swap.itemOffered.title} width={40} height={40} className="rounded-md" data-ai-hint="clothing item" />
                             {swap.itemOffered.title}
                          </TableCell>
                          <TableCell className="font-medium flex items-center gap-2">
                             <Image src={swap.itemRequested.image} alt={swap.itemRequested.title} width={40} height={40} className="rounded-md" data-ai-hint="clothing item" />
                             {swap.itemRequested.title}
                          </TableCell>
                          <TableCell>{swap.date}</TableCell>
                          <TableCell>
                            <Badge variant={swap.status === 'Completed' ? 'default' : swap.status === 'Pending' ? 'secondary' : 'destructive'}>{swap.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
