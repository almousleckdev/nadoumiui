"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { Loading } from "@/components/ui/Loading";

interface HomeShowcaseSectionProps<T> {
  title: string;
  description: string;
  browseHref: string;
  browseLabel?: string;
  queryKey: unknown[];
  queryFn: () => Promise<T[]>;
  itemKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  emptyIcon?: ReactNode;
  emptyTitle: string;
  emptyDescription: string;
  errorTitle: string;
  itemCount?: number;
  className?: string;
}

export function HomeShowcaseSection<T>({
  title,
  description,
  browseHref,
  browseLabel = "Browse All",
  queryKey,
  queryFn,
  itemKey,
  renderItem,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  errorTitle,
  itemCount = 3,
  className = "py-24 bg-white",
}: HomeShowcaseSectionProps<T>) {
  const { data: items, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey,
    queryFn,
  });

  const displayItems = items?.slice(0, itemCount);

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="w-12 h-1 bg-orange-600 mb-4 rounded-full" />
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl">{description}</p>
          </div>
          <Link href={browseHref}>
            <Button variant="outline" className="w-full md:w-auto font-semibold">
              {browseLabel}
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: itemCount }).map((_, i) => (
              <Loading key={i} variant="skeleton" className="rounded-2xl border border-gray-100 h-[400px]" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && <ErrorState title={errorTitle} onRetry={() => refetch()} isRetrying={isRefetching} />}

        {/* Empty State */}
        {!isLoading && !error && displayItems?.length === 0 && (
          <EmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
            action={
              <Link href={browseHref}>
                <Button variant="outline" className="font-semibold">
                  {browseLabel}
                </Button>
              </Link>
            }
          />
        )}

        {/* Content */}
        {!isLoading && !error && displayItems && displayItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayItems.map((item) => (
              <div key={itemKey(item)}>{renderItem(item)}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeShowcaseSection;
