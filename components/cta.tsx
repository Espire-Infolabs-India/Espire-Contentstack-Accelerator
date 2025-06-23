import React from "react";
import Link from "next/link";
import type { CTA } from "../model/page.model";
import { useReferenceEntry } from "../helper/getReferenceEntry";
import Skeleton from "react-loading-skeleton";

interface CTAProps {
  cta: CTA;
}

export default function CTA({ cta }: CTAProps) {
  const reference = cta?.cta_url?.[0];
  const { entry: linkedEntry } = useReferenceEntry(
    reference?._content_type_uid,
    reference?.uid
  );
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      {linkedEntry ? (
        <div className="mt-2">
          {linkedEntry.url && (
            <Link href={linkedEntry?.url}>
              <span className="text-blue-600 underline">{cta?.cta_title}</span>
            </Link>
          )}
        </div>
      ) : (
        <Skeleton width={300} />
      )}
    </div>
  );
}
