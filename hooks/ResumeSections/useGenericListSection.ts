import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import useResumeSectionData from "@hooks/useResumeSectionData";
import { SectionTypeValue, SECTION_DEFAULTS } from "@/types/resumeTypes";
import { z } from "zod";

export function useGenericListSection<T extends { id: number }>(
  sectionType: SectionTypeValue,
  schema: z.ZodSchema<T[]>,
  cleanFilter: (item: T) => boolean,
  onConfirmRemove?: (id: number) => void | Promise<void>
) {
  const { resumeSectionData, updateSection, loading } = useResumeSectionData();
  const [items, setItems] = useState<T[]>([]);
  const [initialItems, setInitialItems] = useState<T[]>([]);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});
  const router = useRouter();

  // Fix #4: Guard with isInitialized ref to prevent overwriting local edits
  const isInitialized = useRef(false);

  // Handle initialization from resumeSectionData
  useEffect(() => {
    if (!loading && resumeSectionData && !isInitialized.current) {
      const section = resumeSectionData.sections?.find((s) => s.type === sectionType);
      const data = (section?.body as unknown as T[]) ?? [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(data);
      setInitialItems(JSON.parse(JSON.stringify(data)));
      isInitialized.current = true;
    }
  }, [resumeSectionData, sectionType, loading]);

  // Fix #3: Wrap hasChanges in useMemo instead of computing on every render
  const hasChanges = useMemo(
    () => JSON.stringify(items) !== JSON.stringify(initialItems),
    [items, initialItems]
  );

  const addItem = () => {
    const defaultItem = SECTION_DEFAULTS[sectionType];
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const cleaned = items.filter(cleanFilter);
    setItems([...cleaned, { ...defaultItem, id: newId } as T]);
  };

  const removeItem = async (id: number) => {
    const doRemove = () => {
      const nextItems = items.filter((i) => i.id !== id);
      setItems(nextItems);
      
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);

      updateSection(sectionType, nextItems);
      setInitialItems(JSON.parse(JSON.stringify(nextItems)));
    };

    if (onConfirmRemove) {
      onConfirmRemove(id);
      return;
    }

    if (typeof window !== "undefined" && !confirm("Delete this entry?")) return;

    doRemove();
  };

  // Fix #15: Early return if value hasn't changed
  const updateItem = <K extends keyof T>(id: number, field: K, value: T[K]) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item[field] === value) return prev; // no change
      return prev.map(i => (i.id === id ? { ...i, [field]: value } : i));
    });
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
    router.push("/main");
  };

  return { items, addItem, removeItem, updateItem, handleSave, hasChanges, loading, errors };
}
