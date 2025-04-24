// app/import/page.tsx
import React from "react"

import ImportCollectionsForm from "@/components/views/ImportCollectionForm"

export default function ImportPage() {
  return (
    <div className="flex w-full flex-col p-6">
      <div className="flex flex-col gap-4 rounded-lg p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Import Collections</h2>
        <ImportCollectionsForm />
      </div>
    </div>
  )
}
