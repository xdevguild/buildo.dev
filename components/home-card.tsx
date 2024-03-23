import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Fragment } from 'react';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

type HomeCardProps = {
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    onClick?: () => void;
    disabled?: boolean;
    path?: string;
  }[];
};

export const HomeCard = ({ title, description, items }: HomeCardProps) => {
  return (
    <Card className="min-w-[250px] flex-1">
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          {items.map(({ title, description, onClick, disabled, path }) => (
            <Fragment key={title}>
              <span className="my-2 flex h-2 w-2 rounded-full bg-blue-700 dark:bg-blue-200" />
              <div className="flex flex-row items-center justify-between space-y-1">
                <div
                  className={`flex items-center text-sm font-medium leading-none ${
                    disabled
                      ? 'cursor-default pt-1 text-zinc-600'
                      : 'cursor-pointer underline'
                  }`}
                  {...(!disabled && onClick && { onClick })}
                >
                  {disabled && (
                    <span className="mr-2 text-xs font-extrabold">[Soon!]</span>
                  )}{' '}
                  {path ? <Link href={path}>{title}</Link> : title}
                </div>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger title="Help tooltip">
                      <HelpCircle size="18" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs" sideOffset={10}>
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
