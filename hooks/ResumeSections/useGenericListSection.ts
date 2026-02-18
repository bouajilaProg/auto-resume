import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useResumeSectionData from "@hooks/useResumeSectionData";
import { SectionTypeValue, SECTION_DEFAULTS } from "@/types/resumeTypes";
import { z } from "zod";

export function useGenericListSection<T extends { id: number }>(
  sectionType: SectionTypeValue,
  schema: z.ZodSchema<T[]>,
  cleanFilter: (item: T) => boolean
) {
  const { resumeSectionData, updateSection, loading } = useResumeSectionData();
  const [items, setItems] = useState<T[]>([]);
  const [initialItems, setInitialItems] = useState<T[]>([]);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});
  const router = useRouter();

  // Handle initialization from resumeSectionData
  useEffect(() => {
    if (!loading && resumeSectionData) {
      const section = resumeSectionData.sections?.find((s) => s.type === sectionType);
      const data = (section?.body as unknown as T[]) ?? [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(data);
      setInitialItems(JSON.parse(JSON.stringify(data)));
    }
  }, [resumeSectionData, sectionType, loading]);

  const hasChanges = JSON.stringify(items) !== JSON.stringify(initialItems);

  const addItem = () => {
    const defaultItem = SECTION_DEFAULTS[sectionType];
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const cleaned = items.filter(cleanFilter);
    setItems([...cleaned, { ...defaultItem, id: newId } as T]);
  };

  const removeItem = (id: number) => {
    if (typeof window !== "undefined" && !confirm("Delete this entry?")) return;

    const nextItems = items.filter((i) => i.id !== id);
    setItems(nextItems);
    
    // Clear errors for this item
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);

    // Persist immediately as per user request
    updateSection(sectionType, nextItems);
    
    // Update initial items so we don't show "unsaved changes" for this deletion
    setInitialItems(JSON.parse(JSON.stringify(nextItems)));
  };

  const updateItem = <K extends keyof T>(id: number, field: K, value: T[K]) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    // Clear error for this field when user starts typing
    if (errors[id]?.[field as string]) {
      setErrors({
        ...errors,
        [id]: {
          ...errors[id],
          [field as string]: "",
        },
      });
    }
  };

  const handleSave = () => {
    const cleanedAndTrimmed = items.filter(cleanFilter).map((item) => {
      const newItem = { ...item };
      (Object.keys(newItem) as Array<keyof T>).forEach((key) => {
        const val = newItem[key];
        if (typeof val === "string") {
          (newItem as Record<keyof T, unknown>)[key] = val.trim();
        }
      });
      return newItem;
    });

    // Schema validation
    const result = schema.safeParse(cleanedAndTrimmed);
    if (!result.success) {
      const formattedErrors: Record<number, Record<string, string>> = {};
      result.error.issues.forEach((issue) => {
        const [index, field] = issue.path;
        const item = cleanedAndTrimmed[index as number];
        if (item) {
          if (!formattedErrors[item.id]) formattedErrors[item.id] = {};
          formattedErrors[item.id][field as string] = issue.message;
        }
      });
      setErrors(formattedErrors);
      console.error(`Validation failed for section ${sectionType}:`, result.error);
      return; // Stop if validation fails
    }

    setItems(cleanedAndTrimmed);
    updateSection(sectionType, cleanedAndTrimmed);
    router.push("/sections");
  };

  return { items, addItem, removeItem, updateItem, handleSave, hasChanges, loading, errors };
}
