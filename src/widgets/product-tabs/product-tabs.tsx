import { ProductType } from '@/entities/product/model/product.type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

type ProductTabsProps = {
  product: ProductType;
};

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const { content } = product;

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Описание</TabsTrigger>
        <TabsTrigger value="reviews">Отзывы (0)</TabsTrigger>
        <TabsTrigger value="video">Видео</TabsTrigger>
        <TabsTrigger value="documents">Документы</TabsTrigger>
        <TabsTrigger value="payment">Оплата</TabsTrigger>
        <TabsTrigger value="delivery">Доставка</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <div
          dangerouslySetInnerHTML={{
            __html: content || 'Описание отсутствует.',
          }}
        />
      </TabsContent>
      <TabsContent value="reviews">
        <p>Здесь будут отзывы. Этот блок можно будет заменить на фичу</p>
      </TabsContent>
      <TabsContent value="video">
        <p>Здесь будет видео о товаре.</p>
      </TabsContent>
      <TabsContent value="documents">
        <p>Здесь будут документы и сертификаты.</p>
      </TabsContent>
      <TabsContent value="payment">
        <p>Здесь будет информация об оплате.</p>
      </TabsContent>
      <TabsContent value="delivery">
        <p>Здесь будет информация о доставке.</p>
      </TabsContent>
    </Tabs>
  );
};
