import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';

import { FaqType } from '@/shared/types/faq.type';
import { Flex, Heading } from '@/shared/ui';
import styles from './product-faq.module.scss';

type ProductFaqProps = {
  items: FaqType[];
  title?: string;
};

export const ProductFaq = ({ items, title }: ProductFaqProps) => {
  if (!items.length) return null;

  return (
    <Flex direction="column" gap="md">
      {title && (
        <Heading as="h2" size="2">
          {title}
        </Heading>
      )}
      <Accordion type="single" collapsible>
        {items.map((item) => (
          <AccordionItem key={item.item_id} value={`item-${item.item_id}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <div
                className={styles.content_inner}
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};
