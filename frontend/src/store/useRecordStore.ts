import { create } from 'zustand';
import { Record } from '../types/record';

interface RecordState {
  records: Record[];
  setRecords: (records: Record[]) => void;
  addRecord: (record: Record) => void;
  updateRecord: (updatedRecord: Record) => void;
  removeRecord: (recordId: number) => void;
  clearRecords: () => void;
}

export const useRecordStore = create<RecordState>((set) => ({
  records: [],
  setRecords: (records) => set({ records }),
  addRecord: (record) =>
    set((state) => ({ records: [...state.records, record] })),
  updateRecord: (updatedRecord) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.id === updatedRecord.id ? updatedRecord : r
      ),
    })),
  removeRecord: (recordId) =>
    set((state) => ({
      records: state.records.filter((r) => r.id !== recordId),
    })),
  clearRecords: () => set({ records: [] }),
}));
