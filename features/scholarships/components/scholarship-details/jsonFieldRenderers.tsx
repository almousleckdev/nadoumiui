// Scholarship "complex" fields (benefits, requirements, stipend, feeStructure,
// applicationDocuments, ...) are stored as loosely-typed JSON on the backend —
// sometimes a plain string, sometimes an array of strings/objects, sometimes a
// free-form object. These renderers handle all of those shapes gracefully
// rather than assuming one.

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

export type JsonFieldArrayItem =
  | string
  | {
      name?: string;
      documentName?: string;
      notes?: string;
      instructions?: string;
      description?: string;
      required?: boolean;
      [key: string]: unknown;
    };

export function renderJsonField(field: unknown) {
  if (!field) return null;
  if (typeof field === "string") return <p className="whitespace-pre-wrap">{field}</p>;

  if (Array.isArray(field)) {
    return (
      <ul className="list-disc pl-5 space-y-2">
        {(field as JsonFieldArrayItem[]).map((item, idx) => {
          if (typeof item === "string") return <li key={idx}>{item}</li>;
          if (typeof item === "object" && item !== null) {
            return (
              <li key={idx}>
                {item.name ? (
                  <div className="flex flex-col">
                    <span>
                      <strong className="text-gray-900">{item.name}</strong>
                      {item.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                    {item.notes && <span className="text-sm text-gray-500">{item.notes}</span>}
                  </div>
                ) : (
                  <pre className="text-sm text-gray-500 bg-gray-50 p-2 rounded whitespace-pre-wrap">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                )}
              </li>
            );
          }
          return <li key={idx}>{String(item)}</li>;
        })}
      </ul>
    );
  }

  if (typeof field === "object" && field !== null) {
    return (
      <pre className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl whitespace-pre-wrap border border-gray-100 overflow-x-auto">
        {JSON.stringify(field, null, 2)}
      </pre>
    );
  }

  return <p>{String(field)}</p>;
}

export function renderDocumentsTable(documents: unknown) {
  if (!Array.isArray(documents) || documents.length === 0) {
    if (typeof documents === "string") {
      const lines = documents.split("\n").filter((line) => line.trim() !== "");
      return (
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {lines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      );
    }
    return renderJsonField(documents);
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mt-4 border border-gray-200">
      <Table className="divide-y divide-gray-300">
        <TableHeader className="bg-gray-50 text-left text-sm font-semibold text-gray-900 normal-case tracking-normal border-none">
          <TableRow>
            <TableHead className="py-3.5 pl-4 pr-3 sm:pl-6 w-1/3 font-semibold">Document Name</TableHead>
            <TableHead className="px-3 py-3.5 w-1/4 font-semibold">Status</TableHead>
            <TableHead className="px-3 py-3.5 font-semibold">Notes / Instructions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {(documents as JsonFieldArrayItem[]).map((doc, idx) => {
            const isString = typeof doc === "string";
            const name = isString ? doc : doc.name || doc.documentName || "Unnamed Document";
            const isRequired = isString ? true : doc.required !== false;
            const notes = isString ? "" : doc.notes || doc.instructions || doc.description || "";

            return (
              <TableRow key={idx}>
                <TableCell className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {name}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {isRequired ? (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Required
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      Optional
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-3 py-4 text-sm text-gray-500">
                  {notes || <span className="text-gray-400 italic">No additional notes</span>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
