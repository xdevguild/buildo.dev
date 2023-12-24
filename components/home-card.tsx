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
    <Card className="flex-1 min-w-[250px]">
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          {items.map(({ title, description, onClick, disabled, path }) => (
            <Fragment key={title}>
              <span className="flex h-2 w-2 my-2 rounded-full bg-blue-700 dark:bg-blue-200" />
              <div className="flex flex-row items-center justify-between space-y-1">
                <div
                  className={`flex items-center text-sm font-medium leading-none ${
                    disabled
                      ? 'cursor-default text-zinc-600 pt-1'
                      : 'cursor-pointer underline'
                  }`}
                  {...(!disabled && onClick && { onClick })}
                >
                  {disabled && (
                    <span className="mr-2 font-extrabold text-xs">[Soon!]</span>
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
