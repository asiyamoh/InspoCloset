import { mockBrideDetails } from "../data/mockBrideDetails";
import { BrideDetail } from "../data/mockBrideDetails";

export function useBrideDetail(brideId: string): BrideDetail | null {
  return mockBrideDetails[brideId] || null;
}
