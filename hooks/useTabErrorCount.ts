import type { FieldErrors, FieldValues } from "react-hook-form";

/**
 * Counts validation errors that belong to a given form tab, based on a
 * tabId -> field-name map. Used by multi-tab admin resource forms
 * (university, scholarship) to badge tabs that contain invalid fields.
 */
export function useTabErrorCount<TTabId extends string>(
  errors: FieldErrors<FieldValues>,
  tabFieldMap: Record<TTabId, string[]>
) {
  return (tabId: TTabId): number => {
    if (Object.keys(errors).length === 0) return 0;
    const fields = tabFieldMap[tabId] || [];
    return Object.keys(errors).filter((errKey) =>
      fields.some((f) => errKey === f || errKey.startsWith(`${f}.`))
    ).length;
  };
}
